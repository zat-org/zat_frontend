<template>
    <FetchDataWraper :error="error" :pending="pending" class="w-full ">
        <template #main>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 mb-3" v-if="teams && teams.length > 0">
                <div v-for="team in teams" :key="team.id"
                    class=" bg-zinc-100 dark:bg-slate-600 rounded-xl shadow-lg p-4 flex flex-col justify-center items-center space-y-2 relative overflow-hidden">
                    <NuxtLink :to="`/teams/${team.id}`"
                        class="absolute  h-12 w-12 rounded-full bg-blue-400 border-0 hover:text-slate-700 text-white -top-3 -left-3 btn">
                        <Icon name="fluent:arrow-circle-up-left-24-filled" class=" text-xl absolute bottom-2 right-2" />
                    </NuxtLink>
                    <h4 class="font-bold text-lg">
                        فريق {{ team.name }}
                    </h4>
                    <div class="avatar avatar-contain ">
                        <div class=" w-16 sm:w-20 md:w-24 rounded-xl bg-white p-1  shadow-lg ">
                            <nuxt-img loading="lazy" :src="url + team.team_logo" :alt="team.name" />
                        </div>
                    </div>
                    <TeamPlayers v-bind:players="team.players" />
                </div>
            </div>
            <div v-else class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center py-10">
                <Icon name="line-md:alert-circle" class="block text-9xl" />
                <h3>لا توجد فرق حاليا</h3>
            </div>

        </template>
    </FetchDataWraper>
</template>

<script setup lang="ts" >
import ITeam from "@/Models/ITeam"
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 
const client = useStrapiClient()
const teams = ref<ITeam[] | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)
const props = defineProps(["leagueData"]);
const route = useRoute()
const fetchData = () => {
    pending.value = true
    return client(`/leagues/${route.params.id}/teams`, { method: 'GET' })
        .then((data: any) => {
            teams.value = data.teams
            pending.value = false
            useHead({
                title: `الفرق المشاركة - ${props.leagueData.name} `,
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