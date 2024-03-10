<template>
    <UFormGroup name="selectedWinnerId" size="xl">
        <URadioGroup :ui="uiRadioGroup" :uiRadio="uiRadio" v-model="selectedWinnerId" required
            :options="winnerTeamOptions">
            <template #legend>
                <p class="flex items-center justify-center">
                    <UIcon name="i-heroicons-user-group me-1 text-2xl text-amber-500" />
                    توقع الفريق الفائز <span class="text-gray-400 ms-2"> نقطتان </span>
                </p>
            </template>

            <template #label="{ option }">
                <div class="py-2 px-4 rounded-md flex flex-col justify-center items-center"
                    :class="{ 'outline outline-amber-500': selectedWinnerId === option.value }">
                    <Image class="bg-white mb-1" :src="`${url}${option.logo}`" :alt="option.label"
                        icon="i-heroicons-users" />
                    <p class="text-center">{{ option.label }}</p>
                </div>
            </template>
        </URadioGroup>

        <template #error="{ error }">
            <p :class="[error ? 'form-control-error  text-center' : '']">
                {{ error ? error : '' }}
            </p>
        </template>
    </UFormGroup>



    <div v-if="isSelectedTeam1 !== null" class="w-full my-3 text-center">
        <p class="mb-2"> توقع نتيجة الفريق الخاسر </p>
        <div class="text-4xl font-mono flex justify-evenly items-center">

            <template v-if="isSelectedTeam1">
                <span class="w-1/5"> </span>
                <span class="w-1/5 text-center"> 2 </span>
                <span class="w-1/5"> - </span>
            </template>

            <span class="w-2/5" :class="{ 'text-left': !isSelectedTeam1, 'text-right': isSelectedTeam1 }">
                <URadioGroup name="loserScore" :ui="uiLoserScoreRadioGroup" :uiRadio="uiRadio" v-model="loserScore"
                    required :options="loserTeamScore">

                    <template #label="{ option }">
                        <div class="py-2 px-4 rounded-md flex flex-col justify-center items-center"
                            :class="{ 'outline outline-amber-500': loserScore === option.value }">
                            <span class="text-lg">{{ option.label }}</span>
                        </div>
                    </template>
                </URadioGroup>
            </span>

            <template v-if="!isSelectedTeam1">
                <span class="w-1/5"> - </span>
                <span class="w-1/5 text-center"> 2 </span>
                <span class="w-1/5"> </span>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    isSelectedTeam1: boolean | null,
    winnerTeamOptions: {
        value: number;
        logo: string;
        label: string;
    }[]
}>();
const selectedWinnerId = defineModel("selectedWinnerId", { required: true, type: Number as PropType<null | number> });
const loserScore = defineModel("loserScore", { required: true, type: Number as PropType<0 | 1> });



const loserTeamScore = [
    { value: 0, label: '0' }, { value: 1, label: '1' }
]
const url = useRuntimeConfig().public.apiBaseUrl;

const uiRadioGroup = {
    fieldset: 'flex w-full flex-wrap flex-row justify-evenly',
    legend: 'w-full mb-3 text-center text-md'
}


const uiLoserScoreRadioGroup = computed(() => {
    return {
        fieldset: 'flex flex-wrap flex-row justify-center',
        wrapper: `items-center ${props.isSelectedTeam1 ? 'justify-start' : 'justify-end'}`
    }
})


const uiRadio = {
    container: "hidden"
}
</script>

<style scoped></style>