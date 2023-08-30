<template>
    <div>
        <template v-if="!pending && !error && matches">
            <section class="mb-20" v-if="matches.length > 0">
                <div class="flex flex-wrap w-full mb-3 md:mb-6">
                    <div class="lg:w-1/2 w-full ">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"> احدث المباريات </h1>
                        <div class="h-1 w-20 bg-yellow-500 rounded"></div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <template v-for="(match, index) in matches" :key="match.id">
                        <MatchCard :match="match" :champId="match.league_id" />
                    </template>
                </div>

            </section>

        </template>
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
import IMatchLessDetails from '~/Models/IMatchLessDetails';
const client = useStrapiClient()
const matches = ref<IMatchLessDetails[] | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)

const fetchData = () => {
    pending.value = true
    return client(`/match/upcoming/`, { method: 'GET' })
        .then((data: any) => {
            matches.value = data.matches
            pending.value = false
            // console.log(data);
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