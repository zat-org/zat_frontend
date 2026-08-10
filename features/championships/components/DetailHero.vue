<template>
    <section
        class="relative w-full bg-poker-pattern"
        aria-label="ملخص البطولة"
        dir="rtl"
    >
        <div class="page-container py-6 sm:py-8">
            <!-- Winner summary (finished tournament) -->
            <div
                v-if="hasWinner"
                class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch"
            >
                <article
                    class="flex flex-col items-center overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-raised p-6"
                >
                    <div
                        class="flex w-full items-center justify-between"
                        dir="ltr"
                    >
                        <NuxtLink
                            v-if="winnerTeamId"
                            :to="`/teams/${winnerTeamId}`"
                            class="flex size-10 items-center justify-center rounded-zat-full text-text-body transition-opacity hover:opacity-70"
                            :aria-label="`فتح صفحة فريق ${displayTextValue(winnerName)}`"
                        >
                            <UIcon
                                name="zat:external-website"
                                class="size-8"
                            />
                        </NuxtLink>
                        <span
                            v-else
                            class="size-10"
                            aria-hidden="true"
                        />

                        <p class="w-9.5 text-center text-text-subtitle">
                            <span class="text-xl font-bold leading-9">1</span>
                            <span class="text-[12.9px] font-bold leading-9">st</span>
                        </p>
                    </div>

                    <div class="mt-0 flex w-full flex-col items-center gap-4">
                        <div class="flex size-34 items-center justify-center rounded-zat-full bg-surface-off-base p-4">
                            <Image
                                v-if="winnerLogoSrc"
                                :src="winnerLogoSrc"
                                :alt="displayTextValue(winnerName)"
                                icon="i-heroicons-user-group"
                                class="size-26 object-contain"
                            />
                            <UIcon
                                v-else
                                name="i-heroicons-user-group"
                                class="size-16 text-text-caption"
                            />
                        </div>

                        <div class="flex w-full flex-col items-center text-center">
                            <p class="text-base leading-7 text-text-subtitle">
                                الفريق الفائز
                            </p>
                            <h1 class="text-[32px] font-bold leading-14 text-text-subtitle">
                                {{ displayTextValue(winnerName || champ.name) }}
                            </h1>

                            <div
                                v-if="pointsDisplay !== null"
                                class="flex flex-col items-center font-bold text-text-action"
                            >
                                <p class="font-numbers text-[40px] leading-16">
                                    {{ pointsDisplay }}
                                </p>
                                <p class="text-base leading-7">
                                    نقطة
                                </p>
                            </div>
                        </div>
                    </div>
                </article>

                <div class="flex min-h-0 flex-col gap-6">
                    <ChampionshipsYoutubeVideoCard
                        :href="videoHref"
                        :title="videoTitle"
                        :meta="videoMeta"
                        :logo-src="champLogoSrc"
                        :logo-alt="champ.name"
                    />

                    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div class="flex h-33.75 flex-col items-center justify-between overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-raised py-4">
                            <p class="px-4 text-xs leading-6 text-text-caption">
                                الابناط
                            </p>
                            <p class="font-numbers text-[32px] font-bold leading-14 text-text-body">
                                {{ displayAbnatValue(stats?.abnat) }}
                            </p>
                            <p class="w-full truncate px-4 text-center text-xs leading-6 text-text-caption">
                                {{ displayTextValue(winnerName) }}
                            </p>
                        </div>

                        <div class="flex h-33.75 flex-col items-center justify-between overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-raised py-4">
                            <p
                                class="flex items-center justify-center gap-1 px-4 text-xs leading-6 text-text-caption"
                                dir="rtl"
                            >
                                <span>فوز</span>
                                <span>/</span>
                                <span>تعادل</span>
                                <span>/</span>
                                <span>خسارة</span>
                            </p>
                            <p
                                class="flex items-center justify-center gap-2 px-4 font-numbers text-[32px] font-bold leading-14 text-text-body"
                                dir="rtl"
                            >
                                <span>{{ displayStatValue(stats?.win) }}</span>
                                <span class="font-sans text-base font-normal leading-7 text-text-caption">/</span>
                                <span>{{ displayStatValue(stats?.draw) }}</span>
                                <span class="font-sans text-base font-normal leading-7 text-text-caption">/</span>
                                <span>{{ displayStatValue(stats?.lost) }}</span>
                            </p>
                            <p class="w-full truncate px-4 text-center text-xs leading-6 text-text-caption">
                                {{ displayTextValue(winnerName) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Live / upcoming tournament: next match + previous matches -->
            <div
                v-else
                class="flex flex-col items-center gap-4"
            >
                <article
                    v-if="upcomingMatch"
                    class="relative flex w-full flex-col items-center gap-2 overflow-hidden rounded-zat-md border-2 border-surface-tone2 bg-surface-raised p-4 sm:p-6"
                >
                    <MatchVsWatermark
                        tone="strong"
                        class="pointer-events-none absolute inset-0 opacity-40"
                    />

                    <div class="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                        <span class="rounded-zat-sm bg-surface-warning px-4 py-1 text-xl font-semibold leading-9 text-amber-600">
                            المباراة القادمة
                        </span>
                        <p class="text-xl font-semibold leading-9 text-text-subtitle">
                            {{ displayTextValue(upcomingMatch.name) }}
                        </p>
                    </div>

                    <div class="relative z-10 flex w-full items-center justify-center gap-4 sm:gap-6">
                        <div class="flex w-20 flex-col items-center sm:w-26">
                            <Image
                                :src="mediaBaseUrl + upcomingMatch.team_1_logo"
                                class="h-20 w-full object-contain sm:h-26"
                                :alt="upcomingMatch.team_1_name"
                                icon="i-heroicons-user-group"
                            />
                            <p class="w-full truncate text-center text-xl font-bold leading-10 text-text-heading sm:text-2xl sm:leading-12">
                                {{ displayTextValue(upcomingMatch.team_1_name) }}
                            </p>
                        </div>

                        <MatchCountdownBlocks
                            :days="countdown.days"
                            :hours="countdown.hours"
                            :minutes="countdown.minutes"
                        />

                        <div class="flex w-20 flex-col items-center sm:w-26">
                            <Image
                                :src="mediaBaseUrl + upcomingMatch.team_2_logo"
                                class="h-20 w-full object-contain sm:h-26"
                                :alt="upcomingMatch.team_2_name"
                                icon="i-heroicons-user-group"
                            />
                            <p class="w-full truncate text-center text-xl font-bold leading-10 text-text-heading sm:text-2xl sm:leading-12">
                                {{ displayTextValue(upcomingMatch.team_2_name) }}
                            </p>
                        </div>
                    </div>

                    <div
                        v-if="hasUpcomingEstimation"
                        class="relative z-10 flex w-full items-center justify-center  pt-2"
                        @click.stop
                    >
                        <MatchCardEstimation
                            :match="upcomingMatch"
                            :champ-id="champ.leagueid"
                            tone="light"
                        />
                    </div>
                </article>

                <article
                    v-else
                    class="flex w-full flex-col items-center justify-center gap-3 rounded-zat-md border-2 border-surface-tone2 bg-surface-raised px-6 py-10 text-center"
                >
                    <Image
                        v-if="champLogoSrc"
                        :src="champLogoSrc"
                        :alt="champ.name"
                        icon="i-heroicons-trophy"
                        class="size-24 object-contain"
                    />
                    <h1 class="text-2xl font-bold text-text-subtitle">
                        {{ champ.name }}
                    </h1>
                    <p class="text-base font-medium text-text-caption">
                        {{ stateMessage }}
                    </p>
                </article>

                <template v-if="previousMatches.length">
                    <ChampionshipsSectionDivider title="المباريات السابقة" />

                    <div class="flex w-full flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between sm:gap-6">
                        <ChampionshipsOverviewMatchCard
                            v-for="match in previousMatches"
                            :key="match.id"
                            :match="match"
                            :champ-id="champ.leagueid"
                            compact
                            class="min-w-0 flex-1"
                        />
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import LeagueState from '~/features/championships/types/ChampState'
import MatchState from '~/features/matches/types/MatchState'
import type { IChamp, IChampWinnerStats, IGetChampSummaryWinnerResponse } from '~/features/championships/types/IChamp'
import type { IMatchLessDetails } from '~/features/matches/types/IMatchLessDetails'
import {
    displayAbnatValue,
    displayStatValue,
    displayTextValue,
    mapSummaryWinnerToStats,
} from '~/features/championships/utils/championWinnerStats'

const props = defineProps<{
    champ: IChamp
    summary: IGetChampSummaryWinnerResponse | null
}>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl
const { $api } = useNuxtApp()

const { data: matchesData } = await $api.champions.getChampMatchesByChampId(
    props.champ.leagueid.toString(),
)

const matches = computed(() => matchesData.value?.matches ?? [])

const winner = computed(() => props.summary?.winner ?? null)

const hasWinner = computed(() => Boolean(winner.value?.name || props.champ.winner_name))

const winnerName = computed(
    () => winner.value?.name ?? props.champ.winner_name ?? null,
)

const winnerTeamId = computed(() => winner.value?.teamId ?? null)

const stats = computed<IChampWinnerStats | null>(() => {
    if (winner.value) return mapSummaryWinnerToStats(winner.value)
    return null
})

const pointsDisplay = computed(() => {
    const points = stats.value?.points
    if (points === null || points === undefined || Number.isNaN(points)) return null
    return displayStatValue(points)
})

const winnerLogoSrc = computed(() => {
    const logo = winner.value?.logo ?? props.champ.winner_logo
    return logo ? mediaBaseUrl + logo : ''
})

const champLogoSrc = computed(() => {
    const logo = props.summary?.url ?? props.champ.url ?? props.champ.league_logo
    return logo ? mediaBaseUrl + logo : ''
})

const stateMessage = computed(() => {
    if (props.champ.state === LeagueState.upcoming) return 'تبدأ قريباً كن متيقظاً'
    if (props.champ.state === LeagueState.live) return 'تجري الآن وفي انتظار حسم اللقب'
    return 'لم يُحدد الفائز بعد'
})

const upcomingMatch = computed<IMatchLessDetails | null>(() =>
    matches.value
        .filter(match => match.state === MatchState.Upcoming || match.state === MatchState.Live)
        .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())
        .at(0) ?? null,
)

const previousMatches = computed(() =>
    matches.value
        .filter(match => match.state === MatchState.Done)
        .sort((a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime())
        .slice(0, 3),
)

const hasUpcomingEstimation = computed(() =>
    Boolean(upcomingMatch.value?.start_estimations && upcomingMatch.value?.end_estimations),
)

const countdown = ref({
    days: '--',
    hours: '--',
    minutes: '--',
})

function updateCountdown() {
    if (!upcomingMatch.value?.start_at) {
        countdown.value = { days: '--', hours: '--', minutes: '--' }
        return
    }
    const diff = new Date(upcomingMatch.value.start_at).getTime() - Date.now()
    if (diff <= 0) {
        countdown.value = { days: '00', hours: '00', minutes: '00' }
        return
    }
    const days = Math.floor(diff / 86_400_000)
    const hours = Math.floor((diff % 86_400_000) / 3_600_000)
    const minutes = Math.floor((diff % 3_600_000) / 60_000)
    countdown.value = {
        days: String(days),
        hours: String(hours),
        minutes: String(minutes),
    }
}

let timer: ReturnType<typeof setInterval> | null = null
onMounted(() => {
    updateCountdown()
    timer = setInterval(updateCountdown, 1000)
})
onUnmounted(() => {
    if (timer) clearInterval(timer)
})
watch(upcomingMatch, () => updateCountdown())

const featuredMatch = computed(() => {
    const withUrl = matches.value.filter(match => Boolean(match.url))
    if (withUrl.length === 0) return null
    const doneWithUrl = withUrl.filter(match => match.state === MatchState.Done)
    const pool = doneWithUrl.length > 0 ? doneWithUrl : withUrl
    return [...pool].sort(
        (a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime(),
    )[0] ?? null
})

const videoHref = computed(() => featuredMatch.value?.url || null)

const videoTitle = computed(() => {
    if (featuredMatch.value?.name) {
        return `${featuredMatch.value.name}${featuredMatch.value.tournament_name ? ` | ${featuredMatch.value.tournament_name}` : ''}`
    }
    return props.champ.name
})

const videoMeta = computed(() => {
    const startAt = featuredMatch.value?.start_at
    if (!startAt) return ''
    const date = new Date(startAt)
    if (Number.isNaN(date.getTime())) return ''
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
})
</script>
