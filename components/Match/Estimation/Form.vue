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
                <MatchEstimationWinner :winnerTeamOptions="winnerTeamOptions" :isSelectedTeam1="isSelectedTeam1"
                    v-model:loserScore="state.loserScore" v-model:selectedWinnerId="state.selectedWinnerId" />
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

const winnerTeamOptions = computed(() => {
    return [
        { value: props.match.team1.id, logo: props.match.team1.logo, label: props.match.team1.name },
        { value: props.match.team2.id, logo: props.match.team2.logo, label: props.match.team2.name },
    ]
})

const bestPlayerOptions = computed(() => {
    return [...props.match.team1.players, ...props.match.team2.players]
})

const isSelectedTeam1 = computed(() => {
    if (state.selectedWinnerId !== -1) {
        return props.match.team1.id === state.selectedWinnerId
    }
    return null
})

type IState = {
    selectedWinnerId: number,
    countOf400: number,
    countOfKaboots: number,
    countOfRedCards: number,
    bestPlayerId: number,
    loserScore: 0 | 1
}

const state = reactive<IState>({
    selectedWinnerId: -1,
    countOf400: 0,
    countOfKaboots: 0,
    countOfRedCards: 0,
    bestPlayerId: -1,
    loserScore: 0
})

const schema = object({
    selectedWinnerId: number().required().positive("اختر احد الفريقين").integer().oneOf([props.match.team1.id, props.match.team2.id], "اختر احد الفريقين"),
    loserScore: number().required().integer().min(0).max(1),
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

const onSubmit = async () => {
    await sendEstimation({ ...state, matchId: props.match.id })
    if (!error.value) {
        // console.log(state)
        toast.add({ title: "تم تسجيل توقعك بنجاح" });
        handleClose();
        emit("estimationSubmitted")
    }
}
const resetState = () => {
    state.selectedWinnerId = -1
    state.countOf400 = 0
    state.countOfKaboots = 0
    state.countOfRedCards = 0
    state.bestPlayerId = -1
    state.loserScore = 0
}
</script>

<style scoped></style>