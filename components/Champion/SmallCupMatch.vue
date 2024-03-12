<template>
    <UCard class="w-44" :ui="smallCardUi">
        <div class="flex justify-between items-center text-xs text-gray-500 dark:text-gray-300 ">

            <UAvatar v-if="match.team1" :src="`${url}${match.team1.logoUrl}`" imgClass="bg-cover bg-white "
                icon="i-heroicons-users" />
            <UAvatar v-else icon="i-heroicons-clock" />

            <p class="me-2" v-if="match.matchState === MatchState.Done">{{ match.team1Score }} </p>
            <!-- <UIcon v-else class="me-2" name="i-heroicons-clock" /> -->

            <p class="truncate">{{ match.matchState }}</p>

            <p class="me-2" v-if="match.matchState === MatchState.Done">{{ match.team2Score }} </p>
            <!-- <UIcon v-else class="me-2" name="i-heroicons-clock" /> -->

            <UAvatar v-if="match.team2" :src="`${url}${match.team2.logoUrl}`" imgClass="bg-cover bg-white "
                icon="i-heroicons-users" />
            <UAvatar v-else icon="i-heroicons-clock" />

        </div>
    </UCard>
</template>

<script setup lang="ts">
import MatchState from "@/Models/MatchState"
import type { ICupMatchData } from "@/Models/ICupSummary"
defineProps<{ match: ICupMatchData }>();
const url = useRuntimeConfig().public.apiBaseUrl;

const smallCardUi = {
    base: " overflow-hidden small-match-card",
    body: { base: "relative w-full", padding: 'px-2 py-1 sm:p-2' }
}

</script>

<style scoped></style>