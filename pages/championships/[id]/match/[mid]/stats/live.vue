<template>
    <div class="flex h-full w-full items-center justify-center overflow-hidden bg-transparent">
        <FetchDataWrapper
            :error="pageError"
            :pending="pagePending"
            class="flex h-full w-full items-center justify-center overflow-hidden bg-transparent"
        >
            <div class="relative flex h-full w-full items-center justify-center overflow-hidden">
                <p
                    v-if="isReconnecting && match"
                    class="pointer-events-none absolute inset-x-0 top-2 z-10 text-center text-sm text-white/80"
                    role="status"
                >
                    جاري إعادة الاتصال…
                </p>

                <LiveMatchStatsBoard
                    v-if="match"
                    :match="match"
                    :tournament-logo="tournamentLogo"
                    :tournament-name="tournamentName"
                />
            </div>
        </FetchDataWrapper>
    </div>
</template>

<script setup lang="ts">
import LiveMatchStatsBoard from '~/features/matches/live-stats/LiveMatchStatsBoard.vue'

const route = useRoute()
const { $api } = useNuxtApp()

const champRouteId = computed(() => String(route.params.id || ''))
const matchRouteId = computed(() => String(route.params.mid || ''))

const {
    data: champ,
    error: champError,
    pending: champPending,
} = await $api.champions.getById(champRouteId.value)

const {
    match,
    pending: livePending,
    error: liveError,
    isReconnecting,
} = useMatchLive(matchRouteId)

/** Championship / tournament image from champ id in the URL (resolved by the board). */
const tournamentLogo = computed(() =>
    champ.value?.url ?? champ.value?.league_logo ?? null,
)

const tournamentName = computed(() =>
    champ.value?.name
    || match.value?.tournament
    || match.value?.leagueName
    || null,
)

const pagePending = computed(() =>
    champPending.value || (livePending.value && !match.value),
)

const pageError = computed(() => {
    if (champError.value) return 'تعذر تحميل البطولة برجاء المحاولة لاحقا.'
    return liveError.value
})

useHead({
    title: computed(() => {
        if (!match.value) return 'إحصائيات مباشرة'
        return `إحصائيات مباشرة - ${match.value.team1.name} ضد ${match.value.team2.name}`
    }),
    meta: computed(() => [
        {
            name: 'description',
            content: match.value
                ? `إحصائيات مباراة ${match.value.team1.name} ضد ${match.value.team2.name} مباشرة.`
                : 'إحصائيات المباراة مباشرة.',
        },
    ]),
})

definePageMeta({
    layout: 'obs',
    name: 'matchStatsLive',
})
</script>
