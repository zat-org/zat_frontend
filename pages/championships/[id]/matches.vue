<template>
    <FetchDataWraper :error="error" :pending="pending" class="w-full text-zinc-700 dark:text-slate-50">
        <template #main>
            <MatchList :matches="matches" />
        </template>
    </FetchDataWraper>
</template>

<script setup lang="ts">
import type {IMatchLessDetails} from "@/Models/IMatchLessDetails"
const props = defineProps(["leagueData"])

const route = useRoute();
const client = useStrapiClient()
const matches = ref<IMatchLessDetails[]>([]);
const error = ref<string | null>(null);
const pending = ref(false);

definePageMeta({
    name: "leagueMatches"
})


const fetchData = () => {
    pending.value = true;
    return client(`/leagues/${route.params.id}/matches`, { method: 'GET' })
        .then((data: any) => {
            matches.value = (data.matches as IMatchLessDetails[])
            // console.log(data.matches);
            pending.value = false;
            useHead({
                title: ` المباريات - ${props.leagueData.name} `,
            })

        }).catch((err) => {
            console.error(err)
            error.value = "تعذر تحميل المباريات";
            pending.value = false;

        })

}
onServerPrefetch(fetchData)
onBeforeMount(fetchData)


</script>

<style scoped></style>