<template>
    <div class="flex h-full w-full items-center justify-center overflow-hidden bg-transparent">
        <FetchDataWrapper
            :error="pageError"
            :pending="pagePending"
            class="flex h-full w-full items-center justify-center overflow-hidden bg-transparent"
        >
            <div
                v-if="champ"
                class="relative flex h-full w-full items-center justify-center overflow-hidden"
            >
                <p
                    v-if="isReconnecting && summary"
                    class="pointer-events-none absolute inset-x-0 top-2 z-10 text-center text-sm text-white/80"
                    role="status"
                >
                    جاري إعادة الاتصال…
                </p>

                <ChampionLiveStandingsBoard
                    v-if="champType === ChampType.LEAGUE || champType === ChampType.HEZAM"
                    :table="(table as Array<LeagueTeamSummary | HezamTeamSummary>) ?? []"
                    :champ-type="champType"
                    :logos-by-id="logosById"
                    :tournament-logo="tournamentLogo"
                    :tournament-name="champ.name"
                />
                <ChampionCupMap
                    v-else-if="champType === ChampType.CUP"
                    :table="(table as ICupMatchData[][])"
                />
            </div>
        </FetchDataWrapper>
    </div>
</template>

<script setup lang="ts">
import ChampType from '~/features/championships/types/ChampType'
import type { LeagueTeamSummary, HezamTeamSummary } from '~/features/championships/types/IChamp'
import type { ICupMatchData } from '~/features/championships/types/ICupSummary'

const route = useRoute()
const { $api } = useNuxtApp()

const champRouteId = computed(() => String(route.params.id || ''))

const {
    data: champ,
    error: champError,
    pending: champPending,
} = await $api.champions.getById(champRouteId.value)

const leagueId = computed(() => champ.value?.leagueid ?? null)

const {
    summary,
    table,
    pending: livePending,
    error: liveError,
    isReconnecting,
} = useLeagueSummaryLive(leagueId)

const { data: teamsData } = leagueId.value
    ? await $api.champions.getChampTeamsByChampId(String(leagueId.value))
    : { data: ref(null) }

const champType = computed(() => (summary.value?.type ?? champ.value?.type) as ChampType)

const logosById = computed(() => {
    const map: Record<number, string> = {}
    for (const team of teamsData.value?.teams ?? []) {
        if (team.team_logo) map[team.id] = team.team_logo
    }
    return map
})

const tournamentLogo = computed(() =>
    summary.value?.url
    ?? champ.value?.url
    ?? champ.value?.league_logo
    ?? null,
)

const pagePending = computed(() =>
    champPending.value || (livePending.value && !summary.value),
)

const pageError = computed(() => {
    if (champError.value) return 'تعذر تحميل البطولة برجاء المحاولة لاحقا.'
    return liveError.value
})

useHead({
    title: computed(() =>
        champ.value ? `جدول مباشر - ${champ.value.name}` : 'جدول مباشر',
    ),
    meta: computed(() => [
        {
            name: 'description',
            content: champ.value
                ? `جدول ترتيب بطولة ${champ.value.name} مباشرة. تابع التحديثات اللحظية لترتيب الفرق والنقاط.`
                : 'جدول ترتيب البطولة مباشرة.',
        },
        {
            property: 'og:title',
            content: champ.value ? `جدول مباشر - ${champ.value.name}` : 'جدول مباشر',
        },
        {
            property: 'og:description',
            content: champ.value
                ? `جدول ترتيب بطولة ${champ.value.name} مباشرة. تابع التحديثات اللحظية لترتيب الفرق والنقاط.`
                : 'جدول ترتيب البطولة مباشرة.',
        },
    ]),
})

definePageMeta({
    layout: 'obs',
    name: 'leagueTableLive',
})
</script>

<style scoped></style>
