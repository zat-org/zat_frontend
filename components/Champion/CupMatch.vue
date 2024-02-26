<template>
    <div class="z-10 relative" :class="{ 'mb-2': !isEven, 'mb-1': isEven }">
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

        <UCard class="w-44" :ui="smallCardUi">
            <div v-if="match.team1 && match.team2"
                class="flex justify-between items-center text-xs text-gray-500 dark:text-gray-300 ">
                <UAvatar :src="match.team1.logoUrl" icon="i-heroicons-user" />
                <p class="me-2" v-if="match.matchState === MatchState.Done">{{ match.team1Score }} </p>
                <UIcon v-else class="me-2" name="i-heroicons-clock" />
                <p class="truncate">{{ match.matchState }}</p>
                <p class="me-2" v-if="match.matchState === MatchState.Done">{{ match.team2Score }} </p>
                <UIcon v-else class="me-2" name="i-heroicons-clock" />
                <UAvatar :src="match.team2.logoUrl" icon="i-heroicons-user" />
            </div>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import MatchState from "@/Models/MatchState"
import type { ICupMatchData } from "@/Models/ICupSummary"
const props = defineProps({
    match: {
        required: true,
        type: Object as PropType<ICupMatchData>
    },
    isEven: {
        required: true,
        type: Boolean
    }
});
const largeCardUi = {
    base: " overflow-hidden large-match-card",
    body: { base: "relative w-full", padding: 'px-2 py-1 sm:p-2' }
}
const smallCardUi = {
    base: " overflow-hidden small-match-card",
    body: { base: "relative w-full", padding: 'px-2 py-1 sm:p-2' }
}
const formatted = useDateFormat(props.match.matchDate, 'MM/DD')

</script>

<style scoped>
.carousel__slide.carousel__slide--visible .large-match-card {
    display: flex;
}

.carousel__slide.carousel__slide--visible .small-match-card {
    display: none;
}

.carousel__slide:not(.carousel__slide--visible) .large-match-card {
    display: none;
}

.carousel__slide:not(.carousel__slide--visible) .small-match-card {
    display: flex;
}
</style>