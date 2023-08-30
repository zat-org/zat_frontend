<template>
    <div class="flex flex-col justify-center items-center  text-zinc-700">
        <template v-if="!pending && !error">
            <Menubar :champ="champ" />
            <div class="w-full md:w-3/4 lg:w-3/5 xl:1/2 mx-auto flex justify-center mb-3">
                <KeepAlive max="4">
                    <NuxtPage :leagueData="champ" />
                </KeepAlive>
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
import IChamp from "@/Models/IChamp"
const route = useRoute()
const client = useStrapiClient()

const champ = ref<null | IChamp>(null)
const error = ref<string | null>(null)
const pending = ref(false)

const fetchData = () => {
    pending.value = true
    return client(`/leagues/getById/${route.params.id}`, { method: 'GET' })
        .then((data: any) => {
            champ.value = data
            pending.value = false
            useHead({
                title: champ.value?.name,
            })
        }).catch((err) => {
            console.error(err)
            pending.value = false
        })
}
onServerPrefetch(fetchData)
onBeforeMount(fetchData)

</script>

<style scoped>
.tab-active {
    @apply bg-emerald-300 text-gray-800 !important
}
</style>Models/IChamp