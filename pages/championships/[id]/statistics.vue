<template>
    <FetchDataWrapper :error="error ? 'تعذر تحميل الاحصائيات برجاء المحاولة لاحقا.' : null" :pending="pending"
        class="flex flex-col">
        <div v-if="statistics && statistics.length > 0"
            class="grow text-center lg:space-y-5 flex flex-col items-center">
            <FormSelectField v-model="selectedStatistic" :options="StatisticOptions" name="statisticOption"
                icon="i-heroicons-chart-bar-square-16-solid" label="وجه المقارنة" />

            <div class="w-full grow bg-white dark:bg-zinc-800 px-5 py-3 rounded-lg shadow-lg flex justify-center items-center">
                <ApexChart type="bar" :options="chartOptions" :series="chartSeries"   height="300"  class="w-full" />
                <!-- <Bar id="statistics" :options="{
                    responsive: true,
                    maintainAspectRatio: false,
                }" :data="chartData" /> -->
            </div>
        </div>
        <div v-else class="text-zinc-700 dark:text-white text-lg h-50 flex flex-col justify-center items-center py-10">
            <Icon name="line-md:alert-circle" class="block text-9xl" />
            <h3>لا توجد احصائيات حاليا</h3>
        </div>
    </FetchDataWrapper>
</template>


<script setup lang="ts">
import StatisticOptions from "@/Models/StatisticOption"
import { Bar } from 'vue-chartjs'
import type { IChamp } from "@/Models/IChamp"

const props = defineProps<{ champ: IChamp }>()
const { $api } = useNuxtApp();

useHead({
    title: `اجماليات الاحصائيات - ${props.champ.name}`,
    meta: [
        {
            name: 'description',
            content: `احصائيات وتحليلات بطولة ${props.champ.name}. تابع أداء الفرق واللاعبين من خلال الرسوم البيانية والإحصائيات التفصيلية.`
        },
        {
            property: 'og:title',
            content: `اجماليات الاحصائيات - ${props.champ.name}`
        },
        {
            property: 'og:description',
            content: `احصائيات وتحليلات بطولة ${props.champ.name}. تابع أداء الفرق واللاعبين من خلال الرسوم البيانية والإحصائيات التفصيلية.`
        }
    ]
})
const { data, error, pending } = await $api.champions.getChampStatisticsByChampId(props.champ.leagueid.toString());

const statistics = computed(() => {
    if (data.value !== null && data.value.data.length > 0)
        StatisticOptions.forEach(StatisticOption => {
            StatisticOption.data = data.value!.data.map((teamData) => teamData[StatisticOption.id])
        });
    return StatisticOptions;
});
const selectedStatistic = ref(statistics.value[0])
const teamsNames = computed(() => data.value?.data.map((elm) => elm.name))
const chartSeries = computed(() => {
    const data = selectedStatistic.value.data.map((elm) => (
        elm
    ))
    return [{
        name: selectedStatistic.value.label,
        data: data
    }]
})
const colormode = useColorMode()
const chartOptions = computed(() => ({
    theme: {
        mode: colormode.value,
        palette:"palette2",
    },
    colors: colormode.value === "dark"
    ? ["#60A5FA", "#34D399", "#FBBF24", "#F87171", "#A78BFA"]
    : ["#2563EB", "#059669", "#D97706", "#DC2626", "#7C3AED"],

    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "70%",
            borderRadius: 6
        }
    },

    xaxis: {
        categories: teamsNames.value, // أسماء الفرق
        labels: {
            style: { fontSize: "14px" }
        }
    },
    yaxis: {
        title: {
            text: selectedStatistic.value.label // يظهر على المحور Y
        }
    },


}))



</script>

<style scoped></style>