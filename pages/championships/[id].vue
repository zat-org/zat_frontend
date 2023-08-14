<template>
    <div class="flex flex-col justify-center items-center  text-zinc-700">
        <template v-if="!pending && !error">
            <Menubar />
            <div class="w-full md:w-3/4 lg:w-3/5 xl:1/2 mx-auto flex justify-center ">
                <NuxtPage :leagueData="champ" class="mb-3" />
            </div>
        </template>
        <template v-else-if="pending">
            <div class="pt-10">
                <Icon name="svg-spinners:blocks-shuffle-3" class="text-6xl block" />
                <h2 class="font-semibold text-lg py-5">تحميل</h2>
            </div>
        </template>
        <template v-else-if="error">
            <Icon name="line-md:close-circle" class="block text-9xl text-red-500" />
            <h3 class="font-semibold text-lg pb-5">تعذر تحميل بيانات البطولة</h3>
            <NuxtLink to="/" class="btn btn-info ">العودة الي الصفحة الرئيسة</NuxtLink>
        </template>
    </div>
</template>

<script setup lang="ts">
import IChamp from "~/Models/IChamp"
const route = useRoute()
const client = useStrapiClient()

const champ = ref<null | IChamp>(null)
const error = ref<string | null>(null)
const pending = ref(false)

onBeforeMount(() => {
    pending.value = true
    client(`/leagues/${route.params.id}`, { method: 'GET' })
        .then((data: any) => {
            champ.value = data
            pending.value = false

        }).catch((err) => {
            console.error(err)
            error.value = "تعذر تحميل البيانات."
            pending.value = false
        })
})


const navigation = [
    { name: 'المباريات', href: `/championships/${route.params.id}/matches` },
    { name: 'الاستديو التحليلي', href: `/championships/${route.params.id}/studios` },
    { name: 'الاحصائيات', href: `/championships/${route.params.id}/statistics` },
    { name: 'القوانين', href: `/championships/${route.params.id}/laws` },
    { name: 'الجدول', href: `/championships/${route.params.id}/table` },
    { name: 'الفرق', href: `/championships/${route.params.id}/teams` },
    { name: 'الرئيسة', href: `/championships/${route.params.id}/` },
]

</script>

<style scoped>
.tab-active {
    @apply bg-emerald-300 text-gray-800 !important
}
</style>Models/IChamp