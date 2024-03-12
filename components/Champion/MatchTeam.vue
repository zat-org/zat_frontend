<template>
    <div class="flex items-center text-sm mb-1 " :class="{ 'text-gray-500 dark:text-gray-300': !isWinner }">
        <template v-if="teamData">
            <UAvatar :src="`${url}${teamData.logoUrl}`" imgClass="bg-cover bg-white " icon="i-heroicons-users" />
            <p class="grow truncate text-start ms-2">{{ teamData.name }} </p>
            <p class="me-2" v-if="matchState === MatchState.Done">{{ teamScore }} </p>
            <UIcon v-else class="me-2" name="i-heroicons-clock" />
            <span v-if="isWinner" class="absolute w-2 h-2 bg-white rotate-45 -left-1"></span>
        </template>
        <template v-else>
            <UAvatar icon="i-heroicons-clock" />
            <p class="grow truncate text-start ms-2">يحدد لاحقا </p>
        </template>


    </div>
</template>

<script setup lang="ts">
import MatchState from "@/Models/MatchState"
import type { ITeamData } from "@/Models/ICupSummary"
const url = useRuntimeConfig().public.apiBaseUrl;

defineProps<{
    matchState: MatchState,
    teamData: ITeamData,
    teamScore: number,
    isWinner: boolean
}>();
</script>

<style scoped></style>