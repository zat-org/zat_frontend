<template>
    <FetchDataWrapper :error="error ? 'تعذر تحميل البيانات' : null" :pending="pending">
        <section
            v-if="displayMatch || upcomingMatch"
            class="relative z-20 -mt-5 bg-poker-pattern lg:-mt-10 py-8"
            aria-label="إحصائيات المباريات"
        >
            <div class="page-container relative">
            <div class="zat-card overflow-visible">
                <div v-if="displayMatch" class="relative flex flex-row gap-2">
                    <HomeMatchStatsSidePanel
                        v-model:open="sidePanelOpen"
                        class="md:shrink-0"
                        :matches="tournamentMatches"
                        :selected-id="displayMatch.id"
                        :league-id="displayMatch.league_id"
                        @select="selectMatch"
                    />
                    <div class="relative min-w-0 w-full flex-1">
                        <Transition
                            enter-active-class="transition-opacity duration-300 ease-out"
                            enter-from-class="opacity-0"
                            enter-to-class="opacity-100"
                            leave-active-class="transition-opacity duration-200 ease-in"
                            leave-from-class="opacity-100"
                            leave-to-class="opacity-0">
                            <div
                                v-if="sidePanelOpen && previousAccordionOpen"
                                class="pointer-events-none absolute inset-0 z-10 bg-black/20 dark:bg-black/45 max-md:rounded-zat-md"
                                aria-hidden="true"
                            />
                        </Transition>

                        <HomeMatchStatsPreviousAccordion
                            v-model:open="previousAccordionOpen"
                            class="relative z-0"
                            :match="displayMatch"
                            :tournament-name="champName"
                            :league-id="displayMatch.league_id"
                            :match-stats="matchStats"
                            :logo-base-url="url"
                        />
                    </div>
                </div>

                <HomeMatchStatsUpcomingAccordion
                    v-if="upcomingMatch"
                    v-model:open="upcomingAccordionOpen"
                    :match="upcomingMatch"
                    :tournament-name="champName"
                    :countdown="countdownParts"
                    :logo-base-url="url"
                />
            </div>
            </div>
        </section>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import MatchState from '@/Models/MatchState'
import type { IMatchLessDetails } from '@/Models/IMatchLessDetails'
import { sortByTime } from '@/utils/CollectionsWithTimeUtils'
import { EMPTY_MATCH_STATS, mapMatchFullDetailsToStats, type MatchDisplayStats } from '~/utils/matchStatsMapper'

const url = useRuntimeConfig().public.apiBaseUrl
const { $api } = useNuxtApp()
const ENDED_MATCHES_LIMIT = 10
const { data: endedData, error: endedError, pending: endedPending } = await $api.matches.getEnded({
    limit: ENDED_MATCHES_LIMIT,
})
const { data: upcomingData, error: upcomingError, pending: upcomingPending } = await $api.matches.getUpcoming()

const pending = computed(() => endedPending.value || upcomingPending.value)
const error = computed(() => endedError.value || upcomingError.value)
const endedMatches = computed(() => (endedData.value?.matches ?? []).slice().sort(sortByTime))
const upcomingMatches = computed(() => (upcomingData.value?.matches ?? []).slice().sort(sortByTime))

function isDoneMatch(match: IMatchLessDetails) {
    return String(match.state) === MatchState.Done
}

const latestMatch = computed<IMatchLessDetails | null>(() => {
    const done = endedMatches.value.filter(isDoneMatch)
    return done.at(-1) ?? null
})

const selectedMatchId = ref<number | null>(null)
const sidePanelOpen = ref(false)
/** Exactly one accordion open at a time; closing the active one is ignored */
const activeAccordion = ref<'previous' | 'upcoming'>('previous')
const matchStats = ref<MatchDisplayStats>({ ...EMPTY_MATCH_STATS })

const previousAccordionOpen = computed({
    get: () => activeAccordion.value === 'previous',
    set: (value: boolean) => {
        if (value) activeAccordion.value = 'previous'
    },
})

const upcomingAccordionOpen = computed({
    get: () => activeAccordion.value === 'upcoming',
    set: (value: boolean) => {
        if (value) activeAccordion.value = 'upcoming'
    },
})

watch(latestMatch, (match) => {
    if (match && selectedMatchId.value === null) {
        selectedMatchId.value = match.id
    }
}, { immediate: true })

watch(activeAccordion, (section) => {
    if (section === 'upcoming') {
        sidePanelOpen.value = false
    }
})

watch(sidePanelOpen, (open) => {
    if (open) {
        activeAccordion.value = 'previous'
    }
})

watch(endedMatches, () => {
    const latest = latestMatch.value
    if (!latest) {
        selectedMatchId.value = null
        return
    }
    const stillExists = endedMatches.value.some(m => m.id === selectedMatchId.value)
    if (!stillExists) {
        selectedMatchId.value = latest.id
    }
})

const displayMatch = computed<IMatchLessDetails | null>(() => {
    const latest = latestMatch.value
    if (!latest) {
        return null
    }
    return endedMatches.value.find(m => m.id === selectedMatchId.value) ?? latest
})

watch(
    () => displayMatch.value?.id,
    async (matchId) => {
        const match = displayMatch.value
        if (!matchId || !match || !isDoneMatch(match)) {
            matchStats.value = { ...EMPTY_MATCH_STATS }
            return
        }

        try {
            const fullMatch = await $api.matches.fetchById(String(matchId))
            matchStats.value = mapMatchFullDetailsToStats(fullMatch)
        }
        catch {
            matchStats.value = { ...EMPTY_MATCH_STATS }
        }
    },
    { immediate: true },
)

const tournamentMatches = computed(() => {
    return endedMatches.value
        .filter(isDoneMatch)
        .sort((a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime())
})

function selectMatch(id: number) {
    selectedMatchId.value = id
}

const upcomingMatch = computed<IMatchLessDetails | null>(() =>
    upcomingMatches.value
        .filter(m => m.state === MatchState.Upcoming || m.state === MatchState.Live)
        .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())
        .at(0) ?? null,
)

const champName = computed(() =>
    displayMatch.value?.tournament_name
    ?? upcomingMatch.value?.tournament_name
    ?? '',
)

const countdownParts = ref({
    days: '--',
    blockHours: '--',
    hours: '--',
    minutes: '--',
    seconds: '--',
})

function updateCountdown() {
    if (!upcomingMatch.value?.start_at) {
        countdownParts.value = { days: '--', blockHours: '--', hours: '--', minutes: '--', seconds: '--' }
        return
    }
    const diff = new Date(upcomingMatch.value.start_at).getTime() - Date.now()
    if (diff <= 0) {
        countdownParts.value = { days: '00', blockHours: '00', hours: '00', minutes: '00', seconds: '00' }
        return
    }
    const days = Math.floor(diff / 86_400_000)
    const blockHours = Math.floor((diff % 86_400_000) / 3_600_000)
    const minutes = Math.floor((diff % 3_600_000) / 60_000)
    const seconds = Math.floor((diff % 60_000) / 1_000)
    const totalHours = Math.floor(diff / 3_600_000)
    countdownParts.value = {
        days: String(days),
        blockHours: String(blockHours),
        hours: String(totalHours),
        minutes: String(minutes),
        seconds: String(seconds),
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
</script>
