<template>
    <div class="container mx-auto">
        <h2 class="text-3xl font-bold my-8 text-center ">زات فى أرقام</h2>
        <div class="flex flex-col lg:flex-row justify-around items-center pt-5">

            <div class=" shadow rounded-xl relative overflow-visible my-5 p-3 w-2/3 lg:w-1/4  border-2 dark:border-white border-slate-900 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100"
                v-for="statistic in statistics">
                <div class="absolute right-0 -top-0 translate-x-1/2 -translate-y-1/2  dark:bg-slate-900 bg-slate-200 text-slate-900 dark:text-slate-100 shadow-lg  h-16 w-16 border-2
                    dark:border-white border-slate-900 rounded-full flex justify-center items-center">
                    <Icon :name="statistic.icon" class="text-3xl" />
                </div>

                <div class="stat-title text-slate-700 dark:text-slate-300 mb-3">{{ statistic.title }}</div>
                <div class="stat-value ">{{ statistic.value.toLocaleString("ar") }}</div>
                <div class="stat-desc text-xl mt-3">
                    <div v-for="detail in statistic.statisticDetails" class="flex justify-center items-center">
                        <Icon :name="detail.icon" :class="[detail.color, 'me-3']" />
                        <span class="text-slate-600 dark:text-slate-300">{{ detail.value.toLocaleString("ar") }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
type StatisticDetail = {
    color: string, value: number, icon: string
}
type Statistic = {
    title: string, value: number, icon: string, statisticDetails: StatisticDetail[]

}
const client = useStrapiClient()

interface IStatistics {
    subscriberCount: Statistic
    websiteVisitsCount: Statistic
    viewCount: Statistic
}
const statistics = ref<IStatistics>({

    viewCount: {
        title: "عدد المشاهدات ", value: 0, icon: "ant-design:fund-view-outlined",
        statisticDetails: [
            { icon: "bi:youtube", value: 0, color: "text-red-500" }
        ]
    },
    websiteVisitsCount: {
        title: "عدد زيارات موقع زات ", value: 0, icon: "streamline:programming-web-server-world-internet-earth-www-globe-worldwide-web-network",
        statisticDetails: [

        ]
    },
    subscriberCount: {
        title: "عدد المشتركين ", value: 0, icon: "formkit:people",
        statisticDetails: [
            { icon: "bi:youtube", value: 0, color: "text-red-500" }
        ]
    },


})

const fetchData = async () => {
    $fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${runtimeConfig.public.zatYoutubeId}&key=${runtimeConfig.public.youtubeApi}`)
        .then((data: any) => {
            let states = data.items[0].statistics;
            statistics.value.subscriberCount.value += parseInt(states.subscriberCount);
            statistics.value.viewCount.value += parseInt(states.viewCount);
            statistics.value.subscriberCount.statisticDetails[0].value += parseInt(states.subscriberCount);
            statistics.value.viewCount.statisticDetails[0].value += parseInt(states.viewCount);
        }
        ).catch((err) => {
            console.error(err);
        })
    client(`/website-visits-counter`, { method: 'GET' })
        .then((data: any) => {
            statistics.value.websiteVisitsCount.value = parseInt(data.data.attributes.counter)
        }).catch(err => console.error(err))
}
onBeforeMount(fetchData);


</script>

<style scoped></style>