<template>
    <FetchDataWrapper :error="error ? 'تعذر البيانات برجاء المحاولة لاحقا.' : null" :pending="pending"
    class="page-container"
    >
        <ChampionLeagueTable
                    v-if="champType === ChampType.LEAGUE"
            :table="(table as LeagueTeamSummary[])"
            :logos-by-id="logosById"
        />
        <ChampionHezamTable
            v-else-if="champType === ChampType.HEZAM"
            :table="(table as HezamTeamSummary[])"
            :logos-by-id="logosById"
        />
        <ChampionCupMap
            v-else-if="champType === ChampType.CUP"
            :table="(table as ICupMatchData[][])"
        />
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import ChampType from '~/features/championships/types/ChampType'
import type { IChamp, LeagueTeamSummary, HezamTeamSummary } from '~/features/championships/types/IChamp'
import type { ICupMatchData } from '~/features/championships/types/ICupSummary'

const props = defineProps({
    champ: {
        required: true,
        type: Object as PropType<IChamp>,
    },
})

const { $api } = useNuxtApp()

const [
    { data, error, pending },
    { data: teamsData },
] = await Promise.all([
    $api.champions.getChampSummaryByChampId(props.champ.leagueid.toString()),
    $api.champions.getChampTeamsByChampId(props.champ.leagueid.toString()),
])

const table = computed(() => data.value?.table)
const champType = computed(() => data.value?.type as ChampType)

const logosById = computed(() => {
    const map: Record<number, string> = {}
    for (const team of teamsData.value?.teams ?? []) {
        if (team.team_logo) map[team.id] = team.team_logo
    }
    return map
})

useHead({
    title: `جدول بطولة - ${props.champ.name}`,
    meta: [
        {
            name: 'description',
            content: `جدول ترتيب بطولة ${props.champ.name}. تابع ترتيب الفرق، النقاط، والإحصائيات في البطولة.`,
        },
        {
            property: 'og:title',
            content: `جدول بطولة - ${props.champ.name}`,
        },
        {
            property: 'og:description',
            content: `جدول ترتيب بطولة ${props.champ.name}. تابع ترتيب الفرق، النقاط، والإحصائيات في البطولة.`,
        },
    ],
})

definePageMeta({
    name: 'leagueTable',
})
</script>

<style scoped></style>
