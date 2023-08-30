<template>
    <div>
        <template v-if="!pending && !error">
            <div class="divider text-2xl font-semibold py-5 px-10">
                <Icon name="fluent:people-team-20-regular" class="text-9xl text-amber-500" /> فرق زات
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3  mb-3" v-if="teams && teams.length > 0">
                <div v-for="team in teams" :key="team.id"
                    class="bg-zinc-100 rounded-xl shadow-lg p-4 text-amber-900 flex justify-evenly relative overflow-hidden">
                    <NuxtLink :to="`/teams/${team.id}`"
                        class="absolute  h-12 w-12 rounded-full bg-blue-400 -top-3 -left-3 btn">
                        <Icon name="fluent:arrow-circle-up-left-24-filled"
                            class="text-white text-xl absolute bottom-2 right-2" />
                    </NuxtLink>
                    <div class="avatar team-avatar">
                        <div class=" w-20 sm:w-24 md:w-32 rounded-xl bg-white p-1  shadow-lg ">
                            <nuxt-img loading="lazy" :src="url + team.team_logo" />
                        </div>
                    </div>

                    <div class="w-full">
                        <p class="text-lg text-center font-semibold  mb-3">
                            فريق {{ team.name }}
                        </p>
                        <div class="flex justify-around">
                            <div class="w-1/2 flex flex-col justify-center items-center space-y-3">
                                <Icon name="fluent-emoji:calendar" size="35" />
                                <p class="text-xs text-center ">
                                    تأسس منذ
                                    <span class="text-amber-700">
                                        {{ getElapsedTime(team.founded_in) }}
                                    </span>
                                </p>
                            </div>
                            <div class=" w-1/2 flex flex-col justify-center items-center space-y-3">
                                <Icon name="fluent-emoji:trophy" size="35" />
                                <p class="text-xs  text-center">

                                    <template v-if="parseInt(team.winning_count) === 0">
                                        لم يفز بأي بطولات حتى الاّن
                                    </template>
                                    <template v-else-if="parseInt(team.winning_count) === 1">
                                        فاز ببطولة واحدة
                                    </template>
                                    <template v-else-if="parseInt(team.winning_count) === 2">
                                        فاز ببطولتان
                                    </template>
                                    <template v-else-if="parseInt(team.winning_count) > 2">
                                        فاز بـ {{ team.winning_count }} بطولات
                                    </template>
                                </p>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div v-else class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center py-10">
                <Icon name="line-md:alert-circle" class="block text-9xl" />
                <h3>لا يوجد فرق حاليا</h3>
            </div>
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
import getElapsedTime from "~/utils/getElapsedTime"
import { ITeamLessDetails } from '~/Models/ITeam';
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 
const client = useStrapiClient()
const teams = ref<ITeamLessDetails[] | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)

const fetchData = () => {
    pending.value = true
    return client(`/teams`, { method: 'GET' })
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

<style scoped>
.team-avatar img {
    object-fit: contain;
}
</style>