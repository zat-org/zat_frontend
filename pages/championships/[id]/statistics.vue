<template>
    <FetchDataWrapper
        :error="error ? 'تعذر تحميل الاحصائيات برجاء المحاولة لاحقا.' : null"
        :pending="pending"
        class="w-full bg-surface-off-base "
    >
        <div
            v-if="teams.length > 0"
            class="page-container"
        >
            <ChampionshipsStatisticsPanel
                v-model:selected="selectedStatistic"
                :teams="teams"
                :options="StatisticOptions"
                :logos-by-name="logosByName"
            />
        </div>
        <div
            v-else
            class="flex h-50 flex-col items-center justify-center py-10 text-lg text-text-subtitle"
        >
            <Icon name="line-md:alert-circle" class="mb-2 block text-9xl" />
            <h3>لا توجد احصائيات حاليا</h3>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import StatisticOptions, { type IStatisticViewData } from '~/features/championships/types/StatisticOption'
import type { IChamp } from '~/features/championships/types/IChamp'

const props = defineProps<{ champ: IChamp }>()
const { $api } = useNuxtApp()

useHead({
    title: `اجماليات الاحصائيات - ${props.champ.name}`,
    meta: [
        {
            name: 'description',
            content: `احصائيات وتحليلات بطولة ${props.champ.name}. تابع أداء الفرق واللاعبين من خلال الرسوم البيانية والإحصائيات التفصيلية.`,
        },
        {
            property: 'og:title',
            content: `اجماليات الاحصائيات - ${props.champ.name}`,
        },
        {
            property: 'og:description',
            content: `احصائيات وتحليلات بطولة ${props.champ.name}. تابع أداء الفرق واللاعبين من خلال الرسوم البيانية والإحصائيات التفصيلية.`,
        },
    ],
})

const [
    { data, error, pending },
    { data: teamsData },
] = await Promise.all([
    $api.champions.getChampStatisticsByChampId(props.champ.leagueid.toString()),
    $api.champions.getChampTeamsByChampId(props.champ.leagueid.toString()),
])

const teams = computed(() => data.value?.data ?? [])

const logosByName = computed(() => {
    const map: Record<string, string> = {}
    for (const team of teamsData.value?.teams ?? []) {
        if (team.team_logo) map[team.name] = team.team_logo
    }
    return map
})

const defaultStatistic: IStatisticViewData = {
    id: 'skaat_played',
    label: 'عدد الصكات الملعوبة',
    data: [],
}
const selectedStatistic = ref<IStatisticViewData>(StatisticOptions[0] || defaultStatistic)
</script>
