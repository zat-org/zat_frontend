<template>
    <FetchDataWraper class="flex flex-col justify-center items-center text-zinc-700 dark:text-slate-50" :error="error"
        :pending="pending">
        <template #main>
            <Menubar :champ="champ" />
            <div class="w-full md:w-5/6  mx-auto flex justify-center mb-3">
                <KeepAlive max="4">
                    <NuxtPage :leagueData="champ" />
                </KeepAlive>
            </div>
        </template>
    </FetchDataWraper>
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

<style scoped></style>