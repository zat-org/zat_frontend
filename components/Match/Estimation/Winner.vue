<template>

    <p class=" flex items-center justify-center">
        <UIcon name="i-heroicons-users" class=" text-lg text-amber-500 me-2" />
        توقع نتيجة المباراة
        <span class="text-gray-600 dark:text-gray-300 ms-3">نقطتان</span>
    </p>
    <div class="flex justify-evenly">
        <div class="py-2 px-4 rounded-md flex flex-col justify-center items-center"
            :class="{ 'outline outline-amber-500': team1Score == 2 && team2Score != 2 }">
            <p>{{ match.team1.name }}</p>
            <Image class="bg-white my-2" :src="`${url}${match.team1.logo}`" :alt="match.team1.name"
                icon="i-heroicons-users" />
            <FormInputField type="number" name="team1Score" v-model="team1Score" class="w-24" label=""
                placeholder="2" />
        </div>
        <div class="py-2 px-4 rounded-md flex flex-col justify-center items-center"
            :class="{ 'outline outline-amber-500': team2Score == 2 && team1Score != 2 }">
            <p>{{ match.team2.name }}</p>
            <Image class="bg-white my-2" :src="`${url}${match.team2.logo}`" :alt="match.team2.name"
                icon="i-heroicons-users" />
            <FormInputField type="number" name="team2Score" v-model="team2Score" class="w-24" label=""
                placeholder="1" />
        </div>
    </div>
    <p v-if="error" class="text-red-500 flex items-center justify-center">
        <UIcon name="i-heroicons-x-circle" class="me-2" />
        {{ error }}
    </p>


</template>

<script setup lang="ts">
import type { IMatchFullDetails } from "@/Models/IMatchFullDetails"
defineProps<{ match: IMatchFullDetails, error: string | null }>();
const team1Score = defineModel("team1Score", { required: true, type: Number as PropType<0 | 1 | 2> });
const team2Score = defineModel("team2Score", { required: true, type: Number as PropType<0 | 1 | 2> });
const url = useRuntimeConfig().public.apiBaseUrl;
</script>

<style scoped></style>