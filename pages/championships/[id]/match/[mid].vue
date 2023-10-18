<template>
    <div class="w-full">
        <FetchDataWraper :error="error" :pending="pending">
            <template #main>
                <MatchDetails :match="match" />
            </template>
        </FetchDataWraper>
    </div>
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