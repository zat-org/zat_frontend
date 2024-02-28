<template>
    <UCard class="w-44 h-28" :ui="largeCardUi">
        <div class="flex justify-between text-xs mb-2 text-gray-500 dark:text-gray-300 ">
            <p>{{ match.matchState }}</p>
            <p v-if="match.matchState !== MatchState.Undefined">
                {{ formatted }}
            </p>
        </div>
        <ChampionMatchTeam :is-winner="match.matchState === MatchState.Done && match.team1Score > match.team2Score"
            :match-state="(match.matchState as MatchState)" :team-data="match.team1" :team-score="match.team1Score" />

        <ChampionMatchTeam :is-winner="match.matchState === MatchState.Done && match.team1Score < match.team2Score"
            :match-state="(match.matchState as MatchState)" :team-data="match.team2" :team-score="match.team2Score" />
    </UCard>
</template>

<script setup lang="ts">
import MatchState from "@/Models/MatchState"
import type { ICupMatchData } from "@/Models/ICupSummary"
const props = defineProps<{ match: ICupMatchData }>();
const largeCardUi = {
    base: " overflow-hidden large-match-card",
    body: { base: "relative w-full", padding: 'px-2 py-1 sm:p-2' }
}
const formatted = useDateFormat(props.match.matchDate, 'MM/DD')

</script>

<style scoped></style>