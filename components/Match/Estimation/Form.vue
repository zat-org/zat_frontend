<template>
    <UModal v-model="isEstimationFormOpened" prevent-close>
        <UCard>
            <template #header>
                <div class="flex justify-between">
                    <h2>توقع نتيجة المباراة</h2>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="handleClose" />
                </div>
            </template>
            <UForm :schema="schema" :state="state" class="space-y-3" @submit="onSubmit">
                <MatchEstimationWinner :match="match" :error="winnerSelectionError"
                    v-model:team1Score="state.team1Score" v-model:team2Score="state.team2Score" />
                <FormInputField min="0" v-model="state.countOf400" type="number" name="countOf400"
                    label="كم 400 فى المباراة" hint="نقطة" icon="i-heroicons-chart-bar-square" />
                <FormInputField min="0" v-model="state.countOfRedCards" type="number" name="countOfRedCards"
                    label="كم كبوت صن و حكم فى المباراة" hint=" 3 نقاط" icon="i-heroicons-chart-bar-square" />
                <FormInputField min="0" v-model="state.countOfKaboots" type="number" name="countOfKaboots"
                    label="كم كارت احمر للاعبين او المدربين" hint="نقطتان" icon="i-heroicons-chart-bar-square" />

                <MatchEstimationBestPlayer v-model:bestPlayerId="state.bestPlayerId"
                    :bestPlayerOptions="bestPlayerOptions" />

                <p v-if="error" class="text-red-500 flex items-center justify-center">
                    <UIcon name="i-heroicons-x-circle" class="me-2" />
                    {{ error }}
                </p>


                <div class="flex justify-center">
                    <UButton type="submit" class="mx-5 " icon="i-heroicons-paper-airplane" :loading="pending">ارسال
                    </UButton>
                    <UButton color="gray" class="mx-5" @click="handleClose" trailing-icon="i-heroicons-x-circle">الغاء
                    </UButton>
                </div>
            </UForm>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import { object, number } from 'yup'
import type { IMatchFullDetails } from "@/Models/IMatchFullDetails"

const props = defineProps<{ match: IMatchFullDetails }>();
const emit = defineEmits(['estimationSubmitted'])
const isEstimationFormOpened = defineModel()

const { $api } = useNuxtApp();
const { error, pending, send: sendEstimation } = $api.estimation.useSendEstimation();
const toast = useToast();

const bestPlayerOptions = computed(() => {
    return [...props.match.team1.players, ...props.match.team2.players]
})


const winnerSelectionError = computed(() => {
    let max = Math.max(state.team1Score, state.team2Score)
    let min = Math.min(state.team1Score, state.team2Score)
    if (max === 2 && (min === 0 || min === 1)) {
        return null
    }
    return "يجب ان تكون النتيجة ( 2-0 ) او ( 2-1 ) للفريق الفائز"
})
type IState = {
    // selectedWinnerId: number,
    // loserScore: 0 | 1,
    countOf400: number,
    countOfKaboots: number,
    countOfRedCards: number,
    bestPlayerId: number,
    team1Score: 0 | 1 | 2,
    team2Score: 0 | 1 | 2,
}

const state = reactive<IState>({
    // selectedWinnerId: -1,
    // loserScore: 0,
    countOf400: 0,
    countOfKaboots: 0,
    countOfRedCards: 0,
    bestPlayerId: -1,
    team1Score: 0,
    team2Score: 0,
})

const schema = object({
    // selectedWinnerId: number().required().positive("اختر احد الفريقين").integer().oneOf([props.match.team1.id, props.match.team2.id], "اختر احد الفريقين"),
    // loserScore: number().required().integer().min(0).max(1),
    team1Score: number().required("هذا الحقل مطلوب").min(0, "الحد الأدنى 0").max(2, "الحد الأقصى 2").integer("يجب ان يكون عددا صحيحا"),
    team2Score: number().required("هذا الحقل مطلوب").min(0, "الحد الأدنى 0").max(2, "الحد الأقصى 2").integer("يجب ان يكون عددا صحيحا"),
    countOf400: number().required("هذا الحقل مطلوب").min(0, "لا يمكن ان يقل عن 0").integer("يجب ان يكون عددا صحيحا"),
    countOfKaboots: number().required("هذا الحقل مطلوب").min(0, "لا يمكن ان يقل عن 0").integer("يجب ان يكون عددا صحيحا"),
    countOfRedCards: number().required("هذا الحقل مطلوب").min(0, "لا يمكن ان يقل عن 0").integer("يجب ان يكون عددا صحيحا"),
    bestPlayerId: number().required().positive("اختر احد اللاعبين").integer().oneOf(
        [...props.match.team1.players.map(p => p.id), ...props.match.team2.players.map(p => p.id)], "اختر احد اللاعبين"
    )
});

const handleClose = () => {
    isEstimationFormOpened.value = false
    resetState()
}
const getWinner = computed(() => {
    if (!winnerSelectionError.value && state.team1Score > state.team2Score) {
        return "team1"
    } else if (!winnerSelectionError.value && state.team1Score < state.team2Score) {
        return "team2"
    } else {
        return null
    }
})
const selectedWinnerId = computed(() => {
    return getWinner.value ? props.match[getWinner.value].id : null
})
const onSubmit = async () => {
    if (winnerSelectionError.value || !selectedWinnerId.value) return;
    const loserScore = Math.min(state.team2Score, state.team1Score);
    await sendEstimation({ ...state, loserScore, selectedWinnerId: selectedWinnerId.value, matchId: props.match.id })
    if (!error.value) {
        toast.add({ title: "تم تسجيل توقعك بنجاح" });
        handleClose();
        emit("estimationSubmitted")
    }
}
const resetState = () => {
    // state.selectedWinnerId = -1
    // state.loserScore = 0
    state.countOf400 = 0
    state.countOfKaboots = 0
    state.countOfRedCards = 0
    state.bestPlayerId = -1
    state.team1Score = 0
    state.team2Score = 0
}
</script>

<style scoped></style>