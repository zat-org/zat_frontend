<template>
    <template v-if="!pending && !error">
        <MatchDetails :match="match" />
    </template>
    <template v-else-if="pending">
        <div class="pt-10">
            <Icon name="svg-spinners:blocks-shuffle-3" class="text-6xl block" />
            <h2 class="font-semibold text-lg py-5">تحميل</h2>
        </div>
    </template>
    <template v-else-if="error">
        <Icon name="line-md:close-circle" class="block text-9xl text-red-500" />
        <h3 class="font-semibold text-lg pb-5">تعذر تحميل بيانات المباراة</h3>
        <NuxtLink :to="`/championships/${leagueData.leagueid}/matches`" class="btn btn-info ">
            العودة الي المباريات
        </NuxtLink>
    </template>
</template>

<script setup lang="ts">
import IMatchFullDetails from "@/Models/IMatchFullDetails"

defineProps(["leagueData"])
const route = useRoute()
const client = useStrapiClient()

const match = ref<IMatchFullDetails | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)

const fetchData = () => {
    pending.value = true
    return client(`/match/getById/${route.params.mid}`, { method: 'GET' })
        .then((data: any) => {
            match.value = data
            pending.value = false
            // console.log(data);
            useHead({
                title: `(${match.value?.team1.name} ضد ${match.value?.team2.name}) - ${match.value?.leagueName}`,
            })
        }).catch((err) => {
            console.error(err)
            error.value = "هذه المباراة غير موجودة"
            pending.value = false
        })
}

onServerPrefetch(fetchData)
onBeforeMount(fetchData)

</script>

<style scoped></style>