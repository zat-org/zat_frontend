<template>
    <div class="w-full ">
        <table v-if="!pending && !error"
            class="table table-zebra table-pin-rows shadow-lg text-center w-full table-auto border-separate border-spacing-0">
            <thead>
                <tr class="bg-blue-300 text-zinc-700 ">
                    <th class="hd-cell w-3/12 md:w-6/12 text-start ">
                        الفريق
                    </th>
                    <th class="hd-cell w-1/12 md:w-1/12">
                        لعب
                    </th>
                    <th class="hd-cell w-1/12 md:w-1/12">
                        فاز
                    </th>
                    <th class="hd-cell w-1/12 md:w-1/12">
                        خسر
                    </th>
                    <th class="hd-cell w-1/12 md:w-1/12">
                        أبناط
                    </th>
                    <th class="hd-cell w-1/12 md:w-1/12">
                        نقاط
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="team, index in table" :key="team.id">
                    <td class="data text-start relative">
                        <div
                            class="h-[100%] w-5 bg-transparent absolute top-0 right-0 flex justify-center items-center text-amber-500">
                            <span class="">{{ index + 1 }}</span>
                        </div>
                        <span class="font-semibold text-blue-900 pl-6 pr-0">{{ team.name }}</span>
                    </td>
                    <td class="data text-gray-700">{{ team.play }}</td>
                    <td class="data text-gray-700">{{ team.win }}</td>
                    <td class="data text-gray-700">{{ team.lost }}</td>
                    <td class="data text-gray-700">{{ team.abnat }}</td>
                    <td class="data font-bold text-blue-900">{{ team.totalScore }}</td>
                </tr>
            </tbody>
        </table>
        <div v-else-if="pending" class="text-zinc-700 flex flex-col space-y-4 justify-center items-center p-10">
            <Icon name="svg-spinners:blocks-shuffle-3" class="text-4xl block" />
            <h2 class="font-semibold">تحميل</h2>
        </div>
        <div v-else-if="error" class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center p-4">
            <Icon name="line-md:close-circle" class="block text-9xl text-red-500" />
            <h3>{{ error }}</h3>
        </div>
    </div>
</template>

<script setup lang="ts">
const client = useStrapiClient()
const route = useRoute();
const table = ref<any>(null)
const error = ref<string | null>(null)
const pending = ref(false);
const props = defineProps(["leagueData"]);

const fetchData = () => {
    pending.value = true;
    return client(`/leagues/${route.params.id}/summary`, { method: 'GET' })
        .then((data: any) => {
            table.value = data.table
            pending.value = false;
            useHead({
                title: `جدول ترتيب الدوري - ${props.leagueData.name} `,
            })
        }).catch((err) => {
            console.error(err)
            error.value = "تعذر تحميل جدول الترتيب "
            pending.value = false;
        })
}
onServerPrefetch(fetchData)
onBeforeMount(fetchData)

useHead({
    title: "جدول الترتيب"
})
definePageMeta({
    name: "leagueTable"
})

</script>

<style scoped>
tr:first-child th:first-child {
    border-top-right-radius: 10px;
}

tr:first-child th:last-child {
    border-top-left-radius: 10px;
}

tr:last-child td:first-child {
    border-bottom-right-radius: 10px;
}

tr:last-child td:last-child {
    border-bottom-left-radius: 10px;
}

tr:last-child td:first-child * {
    border-bottom-right-radius: 10px;
}

tr:nth-child(even) {
    @apply bg-blue-100 !important
}

.hd-cell {
    @apply px-1
}

.data {
    @apply px-1
}
</style>