<template>
    <div class="w-full flex flex-col items-center space-y-5 justify-center" v-if="!pending && !error">
        <select class="select w-full select-bordered max-w-xs bg-select" v-model="selectedStatistic">
            <option v-for="o, i  in StatisticOption" :value="o" selected>{{ o }}</option>
        </select>
        <div class=" w-full flex justify-center mx-auto">
            <Bar id="statistics" class="w-full" :options="chartOptions" :data="chartData" />
        </div>
    </div>
    <div v-else-if="pending" class="text-zinc-700 flex flex-col space-y-4 justify-center items-center p-10">
        <Icon name="svg-spinners:blocks-shuffle-3" class="text-4xl block" />
        <h2 class="font-semibold">تحميل</h2>
    </div>
    <div v-else-if="error" class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center p-4">
        <Icon name="line-md:close-circle" class="block text-9xl text-red-500" />
        <h3>{{ error }}</h3>
    </div>
</template>
    
<script setup lang="ts">
import IStatistics from "~/Models/IStatistics"
import { StatisticOption } from "~/Models/IStatistics"

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Colors, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Colors, Legend, BarElement, CategoryScale, LinearScale)


const chartData = computed(() => {
    if (!error.value && statistics.value) {
        return {
            labels: statistics.value.map((elm) => elm["الاسم"]),
            datasets: [{
                label: selectedStatistic.value,
                data: statistics.value.map((elm) => elm[selectedStatistic.value]),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        }
    }
    return {
        labels: [],
        datasets: [{ data: [] }]
    };
})
const chartOptions = {
    responsive: true
}
const selectedStatistic = ref<StatisticOption>(StatisticOption.playedSka)

const client = useStrapiClient()
const statistics = ref<null | IStatistics[]>(null)
const error = ref<string | null>(null)
const pending = ref(false)
const route = useRoute()
onBeforeMount(() => {
    pending.value = true
    client(`/leagues/${route.params.id}/statistics`, { method: 'GET' })
        .then((data: any) => {
            statistics.value = data.data
            pending.value = false
            console.log(statistics.value);
        }).catch((err) => {
            console.error(err)
            error.value = "تعذر تحميل البيانات."
            pending.value = false

        })
})
</script>
    
<style scoped>
.bg-select {
    background-position: calc(0% + 20px) calc(1px + 50%), calc(0% + 16px) calc(1px + 50%);
}
</style>