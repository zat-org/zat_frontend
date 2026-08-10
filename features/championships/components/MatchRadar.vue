<template>
    <FetchDataWrapper :error="error ? 'تعذر تحميل بيانات المباريات' : null" :pending="pending">
        <div
            v-if="hasContent"
            class="zat-card flex h-[264px] w-full flex-col items-center justify-between px-4 py-4 sm:px-6"
            aria-label="رادار المباريات"
        >
            <!-- Title bar: tabs (start/right in RTL) + match details (end/left) -->
            <div class="flex w-full items-center justify-between gap-4">
                <div class="flex h-10 items-center justify-end gap-2">
                    <button
                        type="button"
                        class="flex h-full w-[120px] items-center justify-center border-b-2 text-base leading-7 transition-colors sm:w-[138px]"
                        :class="tabClass('upcoming')"
                        :disabled="!upcomingMatch"
                        @click="activeTab = 'upcoming'"
                    >
                        المباراة القادمة
                    </button>
                    <button
                        type="button"
                        class="flex h-full w-[120px] items-center justify-center border-b-2 text-base leading-7 transition-colors sm:w-[138px]"
                        :class="tabClass('previous')"
                        :disabled="!previousMatch"
                        @click="activeTab = 'previous'"
                    >
                        المباراة السابقة
                    </button>
                    
                </div>

                <NuxtLink
                    v-if="matchDetailsTo"
                    :to="matchDetailsTo"
                    class="inline-flex shrink-0 items-center gap-0.5 text-xs font-bold leading-6 text-text-action underline decoration-solid hover:opacity-80"
                >
                    <UIcon name="zat:external-website" class="size-4 shrink-0" aria-hidden="true" />
                    <span>تفاصيل المباراة</span>
                </NuxtLink>
            </div>

            <!-- Teams + countdown / score -->
            <div
                v-if="activeMatch"
                class="flex w-full items-center justify-center gap-4 sm:gap-6"
            >
                <div class="flex w-20 shrink-0 flex-col items-center sm:w-[104px]">
                    <div class="aspect-square w-full">
                        <Image
                            :src="logoBaseUrl + activeMatch.team_1_logo"
                            class="size-full object-contain"
                            :alt="activeMatch.team_1_name"
                            icon="i-heroicons-user-group"
                        />
                    </div>
                    <p class="w-full truncate text-center text-xl font-bold leading-[48px] text-text-heading sm:text-2xl">
                        {{ activeMatch.team_1_name }}
                    </p>
                </div>

                <div class="flex flex-col items-center gap-2 self-stretch justify-end">
                    <MatchCountdownBlocks
                        v-if="activeTab === 'upcoming'"
                        :days="countdown.days"
                        :hours="countdown.blockHours"
                        :minutes="countdown.minutes"
                    />
                    <NumbersScore
                        v-else
                        class="gap-6 sm:gap-8"
                        :left="activeMatch.team_1_score ?? 0"
                        :right="activeMatch.team_2_score ?? 0"
                    />
                    <p class="text-base font-semibold leading-7 text-text-subtitle">
                        {{ activeTab === 'upcoming' ? matchDate : 'النتيجة النهائية' }}
                    </p>
                </div>

                <div class="flex w-20 shrink-0 flex-col items-center sm:w-[104px]">
                    <div class="aspect-square w-full">
                        <Image
                            :src="logoBaseUrl + activeMatch.team_2_logo"
                            class="size-full object-contain"
                            :alt="activeMatch.team_2_name"
                            icon="i-heroicons-user-group"
                        />
                    </div>
                    <p class="w-full truncate text-center text-xl font-bold leading-[48px] text-text-heading sm:text-2xl">
                        {{ activeMatch.team_2_name }}
                    </p>
                </div>
            </div>

            <div class="flex w-full items-center justify-center">
                <p
                    v-if="tournamentName"
                    class="truncate text-center text-xl font-bold leading-10 text-text-subtitle"
                >
                    {{ tournamentName }}
                </p>
            </div>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import MatchState from '~/features/matches/types/MatchState'
import type { IMatchLessDetails } from '~/features/matches/types/IMatchLessDetails'
import { sortByTime } from '~/features/matches/utils/CollectionsWithTimeUtils'

const logoBaseUrl = useRuntimeConfig().public.apiBaseUrl
const { $api } = useNuxtApp()

const activeTab = ref<'previous' | 'upcoming'>('upcoming')

const { data: endedData, error: endedError, pending: endedPending } = await $api.matches.getEnded({ limit: 10 })
const { data: upcomingData, error: upcomingError, pending: upcomingPending } = await $api.matches.getUpcoming()

const pending = computed(() => endedPending.value || upcomingPending.value)
const error = computed(() => endedError.value || upcomingError.value)

const endedMatches = computed(() =>
    (endedData.value?.matches ?? []).slice().sort(sortByTime).filter(m => String(m.state) === MatchState.Done),
)
const upcomingMatches = computed(() =>
    (upcomingData.value?.matches ?? [])
        .filter(m => m.state === MatchState.Upcoming || m.state === MatchState.Live)
        .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime()),
)

const previousMatch = computed<IMatchLessDetails | null>(() => endedMatches.value.at(-1) ?? null)
const upcomingMatch = computed<IMatchLessDetails | null>(() => upcomingMatches.value.at(0) ?? null)

const activeMatch = computed(() =>
    activeTab.value === 'upcoming' ? upcomingMatch.value : previousMatch.value,
)

const tournamentName = computed(() =>
    activeMatch.value?.tournament_name ?? '',
)

const matchDetailsTo = computed(() => {
    const match = activeMatch.value
    if (!match?.league_id || !match.id) return undefined
    return `/championships/${match.league_id}/match/${match.id}`
})

const matchDate = computed(() => {
    if (!activeMatch.value?.start_at) return '—'
    const date = new Date(activeMatch.value.start_at)
    if (Number.isNaN(date.getTime())) return '—'
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
})

const hasContent = computed(() => Boolean(previousMatch.value || upcomingMatch.value))

function tabClass(tab: 'previous' | 'upcoming') {
    const isActive = activeTab.value === tab
    return isActive
        ? 'border-surface-primary font-bold text-text-body'
        : 'border-transparent font-normal text-text-body disabled:opacity-40'
}

watch([previousMatch, upcomingMatch], ([previous, upcoming]) => {
    if (upcoming) {
        activeTab.value = 'upcoming'
    }
    else if (previous) {
        activeTab.value = 'previous'
    }
}, { immediate: true })

const countdown = ref({
    days: '--',
    blockHours: '--',
    minutes: '--',
})

function updateCountdown() {
    if (!upcomingMatch.value?.start_at) {
        countdown.value = { days: '--', blockHours: '--', minutes: '--' }
        return
    }
    const diff = new Date(upcomingMatch.value.start_at).getTime() - Date.now()
    if (diff <= 0) {
        countdown.value = { days: '00', blockHours: '00', minutes: '00' }
        return
    }
    countdown.value = {
        days: String(Math.floor(diff / 86_400_000)),
        blockHours: String(Math.floor((diff % 86_400_000) / 3_600_000)),
        minutes: String(Math.floor((diff % 3_600_000) / 60_000)),
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
