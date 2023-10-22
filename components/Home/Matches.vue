<template>
    <FetchDataWraper :error="error" :pending="pending">
        <template #main>
            <section class="mb-20" v-if="matches && matches.length > 0">
                <div class="flex flex-wrap w-full mb-3 md:mb-6">
                    <div class="lg:w-1/2 w-full ">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 ">
                            {{ champName === null ? " احدث المباريات " : `مباريات ${champName}` }}
                        </h1>
                        <div class="h-1 w-20 bg-yellow-500 rounded"></div>
                    </div>
                </div>
                <MatchList :matches="matches" />
            </section>
        </template>
    </FetchDataWraper>
</template>

<script setup lang="ts">
import IMatchLessDetails from '@/Models/IMatchLessDetails';
const client = useStrapiClient()
const matches = ref<IMatchLessDetails[]>([]);
const error = ref<string | null>(null)
const pending = ref(false)
const champName = ref<string | null>(null)

const fetchData = () => {
    pending.value = true
    return client(`/match/upcoming/`, { method: 'GET' })
        .then((data: any) => {
            matches.value = data.matches
            champName.value = data.name || ""
            pending.value = false
        }).catch((err) => {
            console.error(err)
            error.value = "تعذر تحميل البيانات."
            pending.value = false
        })
}
onServerPrefetch(fetchData)
onBeforeMount(fetchData)


</script>

<style scoped></style>