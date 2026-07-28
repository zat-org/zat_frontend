<template>
    <section
        class="w-full bg-surface-off-base "
        aria-label="لوحة المتصدرين"
        dir="rtl"
    >
        <FetchDataWrapper
            class="page-container"
            :error="sectionError"
            :pending="pending"
        >
            <div
                v-if="!pending"
                class="flex flex-col gap-6 lg:flex-row lg:items-stretch"
            >
                <ChampionshipsOverviewScoresTable
                    v-if="showScoresTable"
                    class="min-w-0 flex-2"
                    :table="scoreRows"
                    :logos-by-id="logosById"
                />

                <div
                    v-else
                    class="flex min-h-48 min-w-0 flex-2 flex-col items-center justify-center gap-3 rounded-zat-md border border-surface-tone2 bg-surface-raised px-4 py-8 text-center"
                >
                    <p class="text-base text-text-caption">
                        يمكنك متابعة جدول البطولة من الصفحة المخصصة
                    </p>
                    <NuxtLink
                        :to="`/championships/${champ.leagueid}/table`"
                        class="text-base font-bold text-text-action underline"
                    >
                        جدول البطولة
                    </NuxtLink>
                </div>

                <ChampionshipsOverviewEstimationsCard
                    class="w-full shrink-0 lg:max-w-102 lg:flex-1"
                    :records="estimationRecords"
                    :champ-id="champ.leagueid"
                />
            </div>
        </FetchDataWrapper>
    </section>
</template>

<script setup lang="ts">
import ChampType from '@/Models/ChampType'
import type {
    HezamTeamSummary,
    IChamp,
    LeagueTeamSummary,
} from '@/Models/IChamp'

const props = defineProps({
    champ: {
        required: true,
        type: Object as PropType<IChamp>,
    },
})

const { $api } = useNuxtApp()
const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl

const [
    { data: summaryData, error: summaryError, pending: summaryPending },
    { data: teamsData, error: teamsError, pending: teamsPending },
    { data: estimationData, error: estimationError, pending: estimationPending },
] = await Promise.all([
    $api.champions.getChampSummaryByChampId(props.champ.leagueid.toString()),
    $api.champions.getChampTeamsByChampId(props.champ.leagueid.toString()),
    $api.estimation.getEstimationTableByChampId(props.champ.leagueid),
])

const pending = computed(
    () => summaryPending.value || teamsPending.value || estimationPending.value,
)

const sectionError = computed(() => {
    if (summaryError.value || teamsError.value || estimationError.value) {
        return 'تعذر تحميل لوحة المتصدرين برجاء المحاولة لاحقاً.'
    }
    return null
})

const champType = computed(
    () => (summaryData.value?.type ?? props.champ.type) as ChampType,
)

const showScoresTable = computed(
    () => champType.value === ChampType.LEAGUE || champType.value === ChampType.HEZAM,
)

const scoreRows = computed(() => {
    const table = summaryData.value?.table
    if (!table || !Array.isArray(table) || table.length === 0) return []
    if (Array.isArray(table[0])) return [] as Array<LeagueTeamSummary | HezamTeamSummary>
    return table as Array<LeagueTeamSummary | HezamTeamSummary>
})

const logosById = computed(() => {
    const map: Record<number, string> = {}
    for (const team of teamsData.value?.teams ?? []) {
        if (team.team_logo) map[team.id] = team.team_logo
    }
    return map
})

const estimationRecords = computed(() => estimationData.value?.data ?? [])

useHead({
    title: props.champ.name,
    meta: [
        {
            name: 'description',
            content: props.champ.description
                || `تفاصيل بطولة ${props.champ.name}. موعد البداية والنهاية، الفرق المشاركة، والمزيد من المعلومات.`,
        },
        {
            property: 'og:title',
            content: props.champ.name,
        },
        {
            property: 'og:description',
            content: props.champ.description
                || `تفاصيل بطولة ${props.champ.name}. موعد البداية والنهاية، الفرق المشاركة، والمزيد من المعلومات.`,
        },
        {
            property: 'og:image',
            content: mediaBaseUrl + (props.champ.league_logo || props.champ.url || ''),
        },
    ],
})
</script>
