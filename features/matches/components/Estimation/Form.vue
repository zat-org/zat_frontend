<template>
    <UModal
        v-model:open="isEstimationFormOpened"
        :dismissible="false"
        :close="false"
        :ui="{
            content: 'sm:max-w-[47rem]',
            header: 'bg-surface-off-base p-4 sm:px-4',
            body: 'p-0',
            footer: 'justify-center gap-4 bg-surface-base',
        }"
        @update:open="onOpenChange"
    >
        <template #header>
            <div class="flex w-full items-center justify-between gap-3">
                <p class="text-2xl font-bold leading-12 text-text-subtitle">
                    توقع النتائج
                </p>
                <UButton
                    icon="i-heroicons-x-mark"
                    color="neutral"
                    variant="ghost"
                    square
                    aria-label="اغلاق"
                    @click="handleClose"
                />
            </div>
        </template>

        <template #body>
            <div
                class="h-2 w-full overflow-hidden"
                :class="step === 3 ? 'bg-[#CEFCE5] dark:bg-emerald-950' : 'bg-surface-tone2'"
                aria-hidden="true"
            >
                <div
                    class="h-full transition-[width] duration-300"
                    :class="step === 3 ? 'bg-[#0CEE7D]' : 'bg-surface-secondary'"
                    :style="{ width: progressWidth }"
                />
            </div>

            <UForm
                id="match-estimation-form"
                :schema="schema"
                :state="state"
                class="flex min-h-72 flex-col items-center gap-4 p-4 sm:p-6"
                @submit="onFormSubmit"
            >
                <template v-if="step === 1">
                    <h3 class="text-center text-xl font-bold leading-10 text-text-subtitle">
                        توقع النتيجة النهائية
                    </h3>
                    <p class="text-center text-base font-semibold leading-7 text-text-subtitle">
                        (نقطتان)
                    </p>
                    <MatchEstimationWinner
                        v-model:team1-score="state.team1Score"
                        v-model:team2-score="state.team2Score"
                        :match="match"
                        :error="winnerSelectionError"
                    />
                </template>

                <template v-else-if="step === 2">
                    <h3 class="text-center text-xl font-bold leading-10 text-text-subtitle">
                        توقع ارقام المباراة
                    </h3>
                    <div class="flex w-full max-w-[220px] flex-col gap-6">
                        <UFormField
                            name="countOf400"
                            label="كم 400 في المباراة"
                            hint="نقطة"
                        >
                            <UInput
                                v-model="state.countOf400"
                                min="0"
                                type="number"
                                name="countOf400"
                                class="w-full"
                            />
                        </UFormField>
                        <UFormField
                            name="countOfKaboots"
                            label="كم كبوت من و حكم في المباراة"
                            hint="3 نقاط"
                        >
                            <UInput
                                v-model="state.countOfKaboots"
                                min="0"
                                type="number"
                                name="countOfKaboots"
                                class="w-full"
                            />
                        </UFormField>
                        <UFormField
                            name="countOfRedCards"
                            label="كم كارت أحمر للاعبين أو المدربين"
                            hint="نقطتان"
                        >
                            <UInput
                                v-model="state.countOfRedCards"
                                min="0"
                                type="number"
                                name="countOfRedCards"
                                class="w-full"
                            />
                        </UFormField>
                    </div>
                </template>

                <template v-else>
                    <h3 class="text-center text-xl font-bold leading-10 text-text-subtitle">
                        افضل لاعب
                    </h3>
                    <MatchEstimationBestPlayer
                        v-model:best-player-id="state.bestPlayerId"
                        :best-player-options="bestPlayerOptions"
                    />
                    <p
                        v-if="error"
                        class="flex items-center justify-center text-sm text-red-500"
                    >
                        <UIcon name="i-heroicons-x-circle" class="me-2 size-5" />
                        {{ error }}
                    </p>
                </template>
            </UForm>
        </template>

        <template #footer>
            <div class="flex w-full items-center justify-between gap-3">
            <AppButton
                v-if="step < 3"
                label="التالي"
                icon="i-heroicons-arrow-left"
                variant="secondary"
                :disabled="!canGoNext"
                @click="goNext"
            />
            <AppButton
                v-else
                label="سجل توقعك"
                icon="i-heroicons-check"
                variant="secondary"
                :disabled="!canGoNext || pending"
                @click="onSubmit"
            />

            <AppButton
                v-if="step === 1"
                label="الغاء"
                icon="i-heroicons-x-mark"
                color-class="text-[#FBD2D3] dark:text-zat-500/40"
                label-class="text-zat-500"
                @click="handleClose"
            />
            <AppButton
                v-else
                label="السابق"
                icon="i-heroicons-arrow-right"
                color-class="text-surface-tone2"
                label-class="text-text-body"
                @click="goPrev"
            />
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import { object, number } from 'yup'
import type { IMatchFullDetails } from '~/features/matches/types/IMatchFullDetails'

const props = defineProps<{ match: IMatchFullDetails }>()
const emit = defineEmits(['estimationSubmitted'])
const isEstimationFormOpened = defineModel<boolean>()

const { $api } = useNuxtApp()
const { error, pending, send: sendEstimation } = $api.estimation.useSendEstimation()
const toast = useToast()
const step = ref(1)

const bestPlayerOptions = computed(() => {
    return [...props.match.team1.players, ...props.match.team2.players]
})

const winnerSelectionError = computed(() => {
    const max = Math.max(state.team1Score, state.team2Score)
    const min = Math.min(state.team1Score, state.team2Score)
    if ((max === 2 && (min === 0 || min === 1)) || (max === 1 && min === 1)) {
        return null
    }
    return 'يجب ان تكون النتيجة ( 2-0 ) للفريق الفائز او ( 1-1 ) للتعادل'
})

const progressWidth = computed(() => {
    if (step.value === 1) return '14%'
    if (step.value === 2) return '51%'
    return '95%'
})

const canGoNext = computed(() => {
    if (step.value === 1) return !winnerSelectionError.value
    if (step.value === 2) return true
    return state.bestPlayerId > 0
})

type IState = {
    countOf400: number
    countOfKaboots: number
    countOfRedCards: number
    bestPlayerId: number
    team1Score: 0 | 1 | 2
    team2Score: 0 | 1 | 2
}

const state = reactive<IState>({
    countOf400: 0,
    countOfKaboots: 0,
    countOfRedCards: 0,
    bestPlayerId: -1,
    team1Score: 0,
    team2Score: 0,
})

const countSchema = () => number()
    .transform((value, original) => (original === '' || original === null ? 0 : Number(original)))
    .typeError('يجب ان يكون عددا صحيحا')
    .required('هذا الحقل مطلوب')
    .min(0, 'لا يمكن ان يقل عن 0')
    .integer('يجب ان يكون عددا صحيحا')

const schema = computed(() => {
    if (step.value === 1) {
        return object({
            team1Score: number().required('هذا الحقل مطلوب').min(0).max(2).integer(),
            team2Score: number().required('هذا الحقل مطلوب').min(0).max(2).integer(),
        })
    }
    if (step.value === 2) {
        return object({
            countOf400: countSchema(),
            countOfKaboots: countSchema(),
            countOfRedCards: countSchema(),
        })
    }
    return object({
        bestPlayerId: number().required().positive('اختر احد اللاعبين').integer().oneOf(
            bestPlayerOptions.value.map(player => player.id),
            'اختر احد اللاعبين',
        ),
    })
})

function onFormSubmit() {
    if (step.value < 3) {
        goNext()
        return
    }
    return onSubmit()
}

function goNext() {
    if (!canGoNext.value || step.value >= 3) return
    step.value += 1
}

function goPrev() {
    if (step.value <= 1) return
    step.value -= 1
}

function handleClose() {
    isEstimationFormOpened.value = false
    resetState()
}

function onOpenChange(open: boolean) {
    if (!open) {
        resetState()
    }
}

const getWinner = computed(() => {
    if (!winnerSelectionError.value && state.team1Score > state.team2Score) {
        return 'team1'
    }
    if (!winnerSelectionError.value && state.team1Score < state.team2Score) {
        return 'team2'
    }
    return null
})

const selectedWinnerId = computed(() => {
    return getWinner.value ? props.match[getWinner.value].id : null
})

async function onSubmit() {
    if (step.value !== 3 || winnerSelectionError.value || state.bestPlayerId <= 0) return
    const loserScore = Math.min(state.team2Score, state.team1Score)
    const winnerId = selectedWinnerId.value || -1
    await sendEstimation({
        ...state,
        loserScore,
        selectedWinnerId: winnerId,
        matchId: props.match.id,
    })
    if (!error.value) {
        toast.add({ title: 'تم تسجيل توقعك بنجاح' })
        handleClose()
        emit('estimationSubmitted')
    }
}

function resetState() {
    step.value = 1
    state.countOf400 = 0
    state.countOfKaboots = 0
    state.countOfRedCards = 0
    state.bestPlayerId = -1
    state.team1Score = 0
    state.team2Score = 0
}
</script>
