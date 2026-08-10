<template>
    <section
        v-if="showStats"
        class="w-full bg-surface-off-base bg-repeat py-6"
        :style="{ backgroundImage: `url(${statsPattern})` }"
        aria-label="احصائية المباراة"
        dir="rtl"
    >
        <div class="page-container flex flex-col gap-4">
            <ChampionshipsSectionDivider title="احصائية المباراة" />

            <div class="overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-raised">
                <div class="grid grid-cols-3 bg-nav-bar px-4 py-4 text-center text-text-on-action">
                    <p class="text-lg font-bold leading-9">
                        {{ displayTextValue(match.team1.name) }}
                    </p>
                    <p class="text-lg font-normal leading-9">
                        وجه المقارنة
                    </p>
                    <p class="text-lg font-bold leading-9">
                        {{ displayTextValue(match.team2.name) }}
                    </p>
                </div>

                <div
                    v-for="(row, index) in rows"
                    :key="row.name"
                    class="grid grid-cols-3 px-4 py-2 text-center"
                    :class="index % 2 === 0 ? 'bg-surface-overlay' : 'bg-surface-raised'"
                >
                    <p class="font-numbers text-base font-medium leading-7 text-text-body">
                        {{ displayStatValue(row.team1) }}
                    </p>
                    <p class="text-base font-normal leading-9 text-text-body">
                        {{ displayTextValue(row.name) }}
                    </p>
                    <p class="font-numbers text-base font-medium leading-7 text-text-body">
                        {{ displayStatValue(row.team2) }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import MatchState from '~/features/matches/types/MatchState'
import type { IMatchFullDetails } from '~/features/matches/types/IMatchFullDetails'
import {
    displayStatValue,
    displayTextValue,
} from '~/features/championships/utils/championWinnerStats'
import statsPattern from '~/assets/images/matches/stats-diagonal-pattern.svg'

const props = defineProps<{
    match: IMatchFullDetails
}>()

const showStats = computed(
    () =>
        props.match.state === MatchState.Done
        && (props.match.team1.statistics?.length ?? 0) > 0,
)

const rows = computed(() => {
    const team1Stats = props.match.team1.statistics ?? []
    const team2Stats = props.match.team2.statistics ?? []
    return team1Stats.map((stat, index) => ({
        name: stat.name,
        team1: stat.value,
        team2: team2Stats[index]?.value ?? null,
    }))
})
</script>
