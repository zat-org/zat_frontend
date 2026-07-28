<template>
    <section
        class="relative w-full bg-poker-pattern"
        aria-label="ملخص البطولة"
        dir="rtl"
    >
        <div class="page-container py-6 sm:py-8">
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
                <!-- Winner card (visual start / right in RTL) -->
                <article
                    class="flex flex-col items-center overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-raised p-6"
                >
                    <div class="flex w-full items-center justify-between" dir="ltr">
                        <NuxtLink
                            v-if="winnerTeamId"
                            :to="`/teams/${winnerTeamId}`"
                            class="flex size-10 items-center justify-center rounded-zat-full text-text-body transition-opacity hover:opacity-70"
                            :aria-label="`فتح صفحة فريق ${displayTextValue(winnerName)}`"
                        >
                            <UIcon name="zat:external-website" class="size-8" />
                        </NuxtLink>
                        <span v-else class="size-10" aria-hidden="true" />

                        <p
                            v-if="hasWinner"
                            class="w-9.5xt-center text-text-subtitle"
                        >
                            <span class="text-xl font-bold leading-9">1</span>
                            <span class="text-[12.9px] font-bold leading-9">st</span>
                        </p>
                        <span v-else class="w-9.5" aria-hidden="true" />
                    </div>

                    <div class="mt-0 flex w-full flex-col items-center gap-4">
                        <div
                            class="flex size-34s-center justify-center rounded-zat-full bg-surface-off-base p-4"
                        >
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
                                {{ winnerLabel }}
                            </p>
                            <h1 class="text-[32px] font-bold leading-14 text-text-subtitle">
                                {{ displayTextValue(winnerName || champ.name) }}
                            </h1>

                            <div
                                v-if="hasWinner && pointsDisplay !== null"
                                class="flex flex-col items-center font-bold text-text-action"
                            >
                                <p class="font-numbers text-[40px] leading-16">
                                    {{ pointsDisplay }}
                                </p>
                                <p class="text-base leading-7 ">نقطة</p>
                            </div>

                            <p
                                v-else-if="!hasWinner"
                                class="mt-2 text-base font-medium leading-7 text-text-caption"
                            >
                                {{ stateMessage }}
                            </p>
                        </div>
                    </div>
                </article>

                <!-- Video + stats -->
                <div class="flex min-h-0 flex-col gap-6">
                    <ChampionshipsYoutubeVideoCard
                        :href="videoHref"
                        :title="videoTitle"
                        :meta="videoMeta"
                        :logo-src="champLogoSrc"
                        :logo-alt="champ.name"
                    />

                    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div
                            class="flex h-33.75 flex-col items-center justify-between overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-raised py-4"
                        >
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

                        <div
                            class="flex h-33.75 flex-col items-center justify-between overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-raised py-4"
                        >
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
        </div>
    </section>
</template>

<script setup lang="ts">
import LeagueState from '@/Models/ChampState'
import MatchState from '@/Models/MatchState'
import type { IChamp, IChampWinnerStats, IGetChampSummaryWinnerResponse } from '@/Models/IChamp'
import {
    displayAbnatValue,
    displayStatValue,
    displayTextValue,
    mapSummaryWinnerToStats,
} from '~/utils/championWinnerStats'

const props = defineProps<{
    champ: IChamp
    summary: IGetChampSummaryWinnerResponse | null
}>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl
const { $api } = useNuxtApp()

const { data: matchesData } = await $api.champions.getChampMatchesByChampId(
    props.champ.leagueid.toString(),
)

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

const winnerLabel = computed(() => {
    if (hasWinner.value) return 'الفريق الفائز'
    if (props.champ.state === LeagueState.upcoming) return 'البطولة'
    if (props.champ.state === LeagueState.live) return 'البطولة الجارية'
    return 'البطولة'
})

const stateMessage = computed(() => {
    if (props.champ.state === LeagueState.upcoming) return 'تبدأ قريباً كن متيقظاً'
    if (props.champ.state === LeagueState.live) return 'تجري الآن وفي انتظار حسم اللقب'
    return 'لم يُحدد الفائز بعد'
})

const featuredMatch = computed(() => {
    const matches = matchesData.value?.matches ?? []
    const withUrl = matches.filter(match => Boolean(match.url))
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
