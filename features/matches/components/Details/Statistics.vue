<template>
    <section
        v-if="showStats"
        class="w-full bg-poker-pattern bg-surface-off-base py-6"
        aria-label="احصائية المباراة"
        dir="rtl"
    >
        <div class="page-container flex flex-col gap-4">
            <ChampionshipsSectionDivider title="احصائية المباراة" />

            <div class="overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-raised">
                <UContextMenu
                    :disabled="!liveHref"
                    :items="liveMenuItems"
                >
                    <div
                        class="grid grid-cols-3 bg-nav-bar px-4 py-4 text-center text-text-on-action"
                        :class="liveHref ? 'cursor-context-menu' : undefined"
                    >
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
                </UContextMenu>

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

                <div
                    v-if="!rows.length"
                    class="px-4 py-8 text-center text-base text-text-caption"
                >
                    لا توجد إحصائيات حالياً — انقر بزر الفأرة الأيمن لفتح البث المباشر
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { ContextMenuItem } from '@nuxt/ui'
import MatchState from '~/features/matches/types/MatchState'
import type { IMatchFullDetails } from '~/features/matches/types/IMatchFullDetails'
import {
    displayStatValue,
    displayTextValue,
} from '~/features/championships/utils/championWinnerStats'

const props = defineProps<{
    match: IMatchFullDetails
    liveHref?: string
}>()

const showStats = computed(() => {
    const state = String(props.match.state)
    const hasStats = (props.match.team1.statistics?.length ?? 0) > 0
    if (state === MatchState.Live) return true
    return state === MatchState.Done && hasStats
})

const rows = computed(() => {
    const team1Stats = props.match.team1.statistics ?? []
    const team2Stats = props.match.team2.statistics ?? []
    return team1Stats.map((stat, index) => ({
        name: stat.name,
        team1: stat.value,
        team2: team2Stats[index]?.value ?? null,
    }))
})

const liveMenuItems = computed<ContextMenuItem[]>(() => {
    if (!props.liveHref) return []
    return [
        {
            label: 'مباشر',
            icon: 'i-heroicons-signal',
            to: props.liveHref,
            target: '_blank',
        },
    ]
})
</script>
