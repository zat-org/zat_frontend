<template>
    <FetchDataWraper :error="error" :pending="pending">
        <template #main>
            <div class="divider text-2xl font-semibold py-5 px-10">
                <Icon name="fluent:people-team-20-regular" class="text-9xl text-amber-500 " /> فرق زات
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3  mb-3" v-if="teams && teams.length > 0">
                <TeamLessDetails v-for="team in teams" :key="team.id" v-bind:team="team" />
            </div>
            <div v-else
                class="text-zinc-700 dark:text-slate-50 text-lg h-50 flex flex-col justify-center items-center py-10">
                <Icon name="line-md:alert-circle" class="block text-9xl" />
                <h3>لا يوجد فرق حاليا</h3>
            </div>
        </template>
    </FetchDataWraper>
</template>

<script setup lang="ts">
import { ITeamLessDetails } from '@/Models/ITeam';
const client = useStrapiClient()
const teams = ref<ITeamLessDetails[] | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)

const fetchData = () => {
    pending.value = true
    return client(`/teams/getall`, { method: 'GET' })
        .then((data: any) => {
            teams.value = data.teams
            pending.value = false
            useHead({
                title: `فرق زات`,
            })
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