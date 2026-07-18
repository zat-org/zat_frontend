<template>
    <NuxtLink
        :to="`/championships/${champId}/match/${match.id}`"
        class="flex w-full items-stretch border-b border-surface-tone2 transition-colors hover:bg-surface-overlay/40"
    >
        <!-- Upcoming: date (peach) + teams side-by-side -->
        <template v-if="isUpcoming">
            <div
                class="flex w-[88px] shrink-0 flex-col items-center justify-center bg-surface-warning px-3 py-2 text-text-body sm:w-[104px] sm:px-4"
            >
                <p class="text-xl font-bold leading-7 sm:text-2xl sm:leading-[48px]">
                    {{ day }}
                </p>
                <p class="text-sm font-semibold leading-7 sm:text-base">
                    {{ month }}
                </p>
                <p class="font-numbers text-sm leading-7 sm:text-base">
                    {{ year }}
                </p>
            </div>

            <div class="flex min-w-0 flex-1 items-stretch border-s border-surface-tone2">
                <div class="flex min-w-0 flex-1 items-center justify-center gap-2 px-3 sm:gap-3.5 sm:px-4">
                    <p class="truncate text-base font-semibold leading-9 text-text-body sm:text-xl">
                        {{ match.team_1.name }}
                    </p>
                    <div class="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded bg-surface-overlay">
                        <Image
                            :src="mediaBaseUrl + match.team_1.logo"
                            :alt="match.team_1.name"
                            icon="i-heroicons-user-group"
                            class="size-full object-contain p-0.5"
                        />
                    </div>
                </div>
                <div class="flex min-w-0 flex-1 items-center justify-center gap-2 px-3 sm:gap-3.5 sm:px-4">
                    <div class="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded bg-surface-overlay">
                        <Image
                            :src="mediaBaseUrl + match.team_2.logo"
                            :alt="match.team_2.name"
                            icon="i-heroicons-user-group"
                            class="size-full object-contain p-0.5"
                        />
                    </div>
                    <p class="truncate text-base font-semibold leading-9 text-text-body sm:text-xl">
                        {{ match.team_2.name }}
                    </p>
                </div>
            </div>
        </template>

        <!-- Finished: date + stacked teams/scores + win/lose arrows -->
        <template v-else>
            <div
                class="flex w-[88px] shrink-0 flex-col items-center justify-center border-e border-surface-tone2 px-3 py-2 text-text-body sm:w-[104px] sm:px-4"
            >
                <p class="text-xl font-bold leading-7 sm:text-2xl sm:leading-[48px]">
                    {{ day }}
                </p>
                <p class="text-sm font-semibold leading-7 sm:text-base">
                    {{ month }}
                </p>
                <p class="font-numbers text-sm leading-7 sm:text-base">
                    {{ year }}
                </p>
            </div>

            <div class="flex min-w-0 flex-1 flex-col border-e border-surface-tone2">
                <div
                    class="flex flex-1 items-center justify-between gap-2 border-b border-surface-tone2 px-3 sm:px-4"
                >
                    <div class="flex min-w-0 items-center gap-2 sm:gap-3.5">
                        <div class="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded bg-surface-overlay">
                            <Image
                                :src="mediaBaseUrl + match.team_1.logo"
                                :alt="match.team_1.name"
                                icon="i-heroicons-user-group"
                                class="size-full object-contain p-0.5"
                            />
                        </div>
                        <p class="truncate text-base font-semibold leading-9 text-text-body sm:text-xl">
                            {{ match.team_1.name }}
                        </p>
                    </div>
                    <UIcon
                        v-if="showScoreHints"
                        :name="team1Wins ? 'zat:arrow-up' : 'zat:arrow-down'"
                        class="size-5 shrink-0 sm:size-6"
                        :class="team1Wins ? 'text-success' : 'text-error'"
                        aria-hidden="true"
                    />
                    <span v-else class="size-5 shrink-0 sm:size-6" aria-hidden="true" />
                </div>
                <div class="flex flex-1 items-center justify-between gap-2 px-3 sm:px-4">
                    <div class="flex min-w-0 items-center gap-2 sm:gap-3.5">
                        <div class="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded bg-surface-overlay">
                            <Image
                                :src="mediaBaseUrl + match.team_2.logo"
                                :alt="match.team_2.name"
                                icon="i-heroicons-user-group"
                                class="size-full object-contain p-0.5"
                            />
                        </div>
                        <p class="truncate text-base font-semibold leading-9 text-text-body sm:text-xl">
                            {{ match.team_2.name }}
                        </p>
                    </div>
                    <UIcon
                        v-if="showScoreHints"
                        :name="team2Wins ? 'zat:arrow-up' : 'zat:arrow-down'"
                        class="size-5 shrink-0 sm:size-6"
                        :class="team2Wins ? 'text-success' : 'text-error'"
                        aria-hidden="true"
                    />
                    <span v-else class="size-5 shrink-0 sm:size-6" aria-hidden="true" />
                </div>
            </div>

            <div class="flex w-[88px] shrink-0 flex-col sm:w-[104px]">
                <div class="flex flex-1 items-center justify-center border-b border-surface-tone2 p-2">
                    <span class="font-numbers text-center text-xl font-bold leading-9 text-text-body">
                        {{ displayPoints(match.team_1) }}
                    </span>
                </div>
                <div class="flex flex-1 items-center justify-center p-2">
                    <span class="font-numbers text-center text-xl font-bold leading-9 text-text-body">
                        {{ displayPoints(match.team_2) }}
                    </span>
                </div>
            </div>
        </template>
    </NuxtLink>
</template>

<script setup lang="ts">
import MatchState from '@/Models/MatchState'
import type { IMatchHistoryMatch, IMatchHistoryTeam } from '@/Models/IMatchHistory'

const props = defineProps<{
    match: IMatchHistoryMatch
    champId: number
    mediaBaseUrl: string
    upcoming?: boolean
}>()

const isUpcoming = computed(() =>
    props.upcoming === true
    || String(props.match.state) === MatchState.Upcoming
    || String(props.match.state) === 'upcoming',
)

const team1Points = computed(() => pointsValue(props.match.team_1))
const team2Points = computed(() => pointsValue(props.match.team_2))

const showScoreHints = computed(() =>
    String(props.match.state) === MatchState.Done
    && team1Points.value != null
    && team2Points.value != null
    && team1Points.value !== team2Points.value,
)

const team1Wins = computed(() =>
    (team1Points.value ?? 0) > (team2Points.value ?? 0),
)

const team2Wins = computed(() =>
    (team2Points.value ?? 0) > (team1Points.value ?? 0),
)

const matchDate = computed(() => {
    if (!props.match.start_at) return null
    const d = new Date(props.match.start_at)
    return Number.isNaN(d.getTime()) ? null : d
})

const day = computed(() => {
    if (!matchDate.value) return '—'
    return String(matchDate.value.getDate())
})

const month = computed(() => {
    if (!matchDate.value) return '—'
    return matchDate.value.toLocaleDateString('ar-EG', { month: 'long' })
})

const year = computed(() => {
    if (!matchDate.value) return '—'
    return String(matchDate.value.getFullYear())
})

function pointsValue(team: IMatchHistoryTeam) {
    if (team.abnat != null) return team.abnat
    if (team.score != null) return team.score
    return null
}

function displayPoints(team: IMatchHistoryTeam) {
    const value = pointsValue(team)
    return value == null ? '—' : String(value)
}
</script>
