<template>
    <FetchDataWraper :error="error" :pending="pending" class="w-full dark:text-slate-50 ">
        <template #main>
            <div v-if="statistics && statistics.length > 0"
                class="w-full flex flex-col items-center space-y-5 justify-center">
                <select class="select w-full dark:bg-slate-700 select-bordered max-w-xs bg-select"
                    v-model="selectedStatistic">
                    <option v-for="o, i in StatisticOption" :value="o" selected>{{ o }}</option>
                </select>
                <div class=" w-full flex justify-center mx-auto bg-white p-5 dark:bg-slate-200  rounded-lg shadow-lg">
                    <Bar id="statistics" class="w-full" :options="chartOptions" :data="chartData" />
                </div>
            </div>
            <div v-else class="text-zinc-700 dark:text-white text-lg h-50 flex flex-col justify-center items-center py-10">
                <Icon name="line-md:alert-circle" class="block text-9xl" />
                <h3>لا توجد احصائيات حاليا</h3>
            </div>
        </template>
    </FetchDataWraper>
</template>
    
<script setup lang="ts">
import type { IStatistics } from "@/Models/IStatistics"
import StatisticOption from "@/Models/StatisticOption"

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
    responsive: true,

}
const selectedStatistic = ref<StatisticOption>(StatisticOption.playedSka)
const props = defineProps(["leagueData"]);

const client = useStrapiClient()
const statistics = ref<null | IStatistics[]>(null)
const error = ref<string | null>(null)
const pending = ref(false)
const route = useRoute()

const fetchData = () => {
    pending.value = true
    return client(`/leagues/${route.params.id}/statistics`, { method: 'GET' })
        .then((data: any) => {
            statistics.value = data.data
            pending.value = false
            // console.log(statistics.value);
            useHead({
                title: ` اجماليات الاحصائيات - ${props.leagueData.name} `,
            })
        }).catch((err) => {
            console.error(err)
            error.value = "تعذر تحميل البيانات."
            pending.value = false
        })
}
onBeforeMount(fetchData)
</script>
    
<style scoped></style>