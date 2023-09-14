<template>
    <FetchDataWraper class="relative md:w-5/6 lg:w2/3 mx-auto" :error="error" :pending="pending">
        <template #main>
            <template v-if="team">
                <div class="flex flex-col justify-center items-center my-5 space-y-5">
                    <h2 class="font-semibold text-2xl">فريق {{ team.name }}</h2>
                    <div class="avatar avatar-contain">
                        <div class=" w-24 sm:w-28 md:w-32 rounded-xl bg-white p-1  shadow-lg ">
                            <nuxt-img loading="lazy" :src="url + team.team_logo" />
                        </div>
                    </div>
                    <section class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-10">
                        <TeamBasicInfo class="md:col-span-2" v-bind:team="team" />
                        <section>
                            <div class="divider my-5"> لاعبي الفريق </div>
                            <TeamPlayers v-bind:players="team.players" />
                        </section>

                        <section>
                            <div class="divider my-5"> بطولات الفريق </div>
                            <TeamChampList v-bind:champs="team.champs" />
                        </section>

                        <section>
                            <div class="divider my-5"> انتقالات الاعبين </div>
                            <TeamTransferList v-bind:transfers="team.transfers" :currentTeamName="team.name">
                                <template #noTransText>
                                    لم يجري الفريق اي انتقالات حتي الان
                                </template>
                            </TeamTransferList>
                        </section>
                        <section>
                            <div class="divider my-5"> احصائيات الفريق </div>
                            <TeamStatistics v-bind:statistics="team.statistics" />
                        </section>
                    </section>
                </div>
                <BackBtn />
            </template>
            <div v-else class="flex flex-col justify-center items-center mt-10">
                <Icon name="line-md:close-small" size="100" />
                <h4 class="text-center">هذا الفريق غير موجود</h4>
                <NuxtLink to="/teams" class="btn btn-warning mt-5"> فرق زات</NuxtLink>
            </div>
        </template>
    </FetchDataWraper>
</template>

<script setup lang="ts">
const route = useRoute()
import { ITeamFullDetails } from '@/Models/ITeam';
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 
const client = useStrapiClient()
const team = ref<ITeamFullDetails | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)

const fetchData = () => {
    pending.value = true
    return client(`/teams/getbyid/${route.params.id}`, { method: 'GET' })
        .then((res: any) => {
            team.value = res.data
            pending.value = false
            useHead({
                title: `فرق زات - ${team.value?.name}`,
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