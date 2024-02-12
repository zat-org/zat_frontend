<template>
    <FetchDataWrapper :error="error ? 'تعذر تحميل الاحصائيات برجاء المحاولة لاحقا.' : null" :pending="pending">
        <div v-if="statistics && statistics.length > 0"
            class=" w-full flex flex-col  items-center space-y-5 justify-center">
            <FormSelectField v-model="selectedStatistic" :options="StatisticOptions" name="statisticOption"
                icon="i-heroicons-chart-bar-square-16-solid" label="وجه المقارنة" />
            <div class=" w-full grow flex justify-center mx-auto bg-white p-5 dark:bg-slate-200  rounded-lg shadow-lg">
                <Bar id="statistics" :options="chartOptions" :data="chartData" />
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
import { Chart as ChartJS, Title, Colors, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import type { IChamp } from "@/Models/IChamp"

const props = defineProps({
    champ: {
        required: true,
        type: Object as PropType<IChamp>
    }
})


const { $api } = useNuxtApp();
ChartJS.register(Title, Tooltip, Colors, Legend, BarElement, CategoryScale, LinearScale)
ChartJS.defaults.font.size = 16;
ChartJS.defaults.font.weight = "bold";

const chartOptions = {
    responsive: true,
}
const chartStyles = {
    height: `100%`,
    position: 'relative',
    width: "100%"
}
useHead({ title: ` اجماليات الاحصائيات - ${props.champ.name} ` })
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

const chartData = computed(() => {
    if (!error.value && statistics.value) {
        return {
            labels: teamsNames.value,
            datasets: [{
                label: selectedStatistic.value.label,
                data: selectedStatistic.value.data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        }
    }
    return {
        labels: [],
        datasets: [{ data: [] }]
    };
})
const backgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'
]
const borderColors = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
]
</script>
    
<style scoped></style>