<template>
    <article
        class="group relative flex w-full max-w-90 flex-col gap-2 overflow-hidden rounded-lg border border-[#B9B9B9] bg-[#F0F0F0] py-2 transition-colors hover:border-[#D0D0D0] hover:bg-white"
        :class="isUpcoming && 'hover:border-[#FBB535]'"
        dir="rtl"
    >
        <div
            v-if="isUpcoming"
            class="pointer-events-none absolute start-1/2 top-0 size-12.5 -translate-x-1/2 rounded-full bg-[#FBB535] opacity-70 blur-[68px]"
            aria-hidden="true"
        />
        <div
            v-else
            class="pointer-events-none absolute size-8 rounded-full bg-[#D0D0D0] opacity-80 blur-[48px]"
            :class="team2IsWinner ? 'start-1/4 top-18' : 'end-1/4 top-18'"
            aria-hidden="true"
        />

        <header class="relative z-10 flex items-center justify-between gap-2 px-4">
            <div
                class="flex min-w-0 flex-1 items-center gap-0.5 text-xs leading-6"
                :class="isUpcoming ? 'text-[#E2A330]' : 'text-[#5C5A5A]'"
            >
                <span>{{ dateParts.day }}</span>
                <span>/</span>
                <span>{{ dateParts.month }}</span>
            </div>

            <span class="shrink-0 text-center text-xs font-bold leading-6 text-[#231F1F]">
                {{ roundLabel || 'الجولة الأولى' }}
            </span>

            <span
                class="min-w-0 flex-1 text-end text-xs leading-6"
                :class="isUpcoming ? 'text-[#E2A330]' : 'text-[#231F1F]'"
            >
                {{ statusLabel }}
            </span>
        </header>

        <div class="relative z-10 flex w-full items-center justify-center">
            <ChampionCupBracketTeamRow
                side="team2"
                :team="match.team2"
                :score="match.team2Score"
                :match-state="match.matchState"
                :is-winner="team2IsWinner"
                :is-upcoming="isUpcoming"
            />
            <ChampionCupBracketTeamRow
                side="team1"
                :team="match.team1"
                :score="match.team1Score"
                :match-state="match.matchState"
                :is-winner="team1IsWinner"
                :is-upcoming="isUpcoming"
            />
        </div>
    </article>
</template>

<script setup lang="ts">
import MatchState from '@/Models/MatchState'
import type { ICupMatchData } from '@/Models/ICupSummary'

const props = defineProps<{
    match: ICupMatchData
    roundLabel?: string
}>()

const isUpcoming = computed(() =>
    props.match.matchState === MatchState.Upcoming
    || props.match.matchState === MatchState.Undefined,
)

const isDone = computed(() => props.match.matchState === MatchState.Done)

const statusLabel = computed(() => {
    if (props.match.matchState === MatchState.Done) return 'انتهت'
    if (props.match.matchState === MatchState.Live) return 'مباشر'
    return 'قادمة'
})

const team1IsWinner = computed(() =>
    isDone.value && props.match.team1Score > props.match.team2Score,
)
const team2IsWinner = computed(() =>
    isDone.value && props.match.team2Score > props.match.team1Score,
)

const dateParts = computed(() => {
    const date = new Date(props.match.matchDate)
    if (Number.isNaN(date.getTime())) {
        return { day: '--', month: '--' }
    }
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return { day, month }
})
</script>
