<template>
    <div class="relative md:w-5/6 lg:w2/3 mx-auto">
        <template v-if="!pending && !error && team">
            <div class="flex flex-col justify-center items-center my-5 space-y-5">
                <h2 class="font-semibold text-2xl">فريق {{ team.name }}</h2>
                <div class="avatar team-avatar">
                    <div class=" w-24 sm:w-28 md:w-32 rounded-xl bg-white p-1  shadow-lg ">
                        <nuxt-img loading="lazy" :src="url + team.team_logo" />
                    </div>
                </div>


                <section class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-10">
                    <section class="flex justify-around items-center md:col-span-2">
                        <div class=" flex flex-col justify-center items-center space-y-3">
                            <Icon name="fluent-emoji:calendar" class="text-4xl md:text-7xl" />
                            <p class="text-sm text-center ">
                                تأسس منذ
                                <span class="text-amber-700">
                                    {{ getElapsedTime(team.founded_in) }}
                                </span>
                            </p>
                        </div>
                        <div class="  flex flex-col justify-center items-center space-y-3">
                            <Icon name="fluent-emoji:trophy" class="text-4xl md:text-7xl" />
                            <p class="text-sm   text-center">

                                <template v-if="parseInt(team.winning_count) === 0">
                                    لم يفز بأي بطولات حتي الاّن
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
                    </section>

                    <section>
                        <div class="divider my-5"> لاعبي الفريق </div>
                        <div class="grid grid-cols-3 w-full mt-2">
                            <div v-for="(player, index) in team.players" :key="player.id"
                                class=" flex flex-col justify-start items-center "
                                :class="player.is_captain || index === 0 ? '' : index % 2 === 0 ? 'order-first' : 'order-last'">
                                <div class="avatar ">
                                    <div class="rounded-xl shadow-lg"
                                        :class="player.is_captain || index === 0 ? 'w-14 sm:w-18 md:w-24 ' : `w-12 sm:w-16 md:w-20 `">
                                        <nuxt-img loading="lazy" class="object-top" :src="url + player.image"
                                            :alt="player.name" />
                                    </div>
                                </div>
                                <p class="text-sm text-center font-semibold mt-2 text-amber-900">
                                    {{ player.name }}
                                    <NuxtLink :to="`/players/${player.id}`">
                                        <Icon name="solar:square-arrow-right-up-broken" class="text-blue-400" size="18" />
                                    </NuxtLink>
                                </p>
                                <p class="text-xs text-amber-500">
                                    {{ player.is_captain || index === 0 ? `كابتن الفريق` : `لاعب بالفريق` }}
                                </p>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div class="divider my-5"> بطولات الفريق </div>
                        <div v-if="team.champs.length > 0" class="grid grid-cols-1 gap-3 w-full">
                            <div v-for="(champ, index) in team.champs" :key="index"
                                class="flex justify-evenly items-center  bg-gray-200 rounded-xl shadow-lg  ">
                                <div class="avatar team-avatar w-1/4 flex justify-start items-center h-full ">
                                    <div class=" w-16 sm:w-20 md:w-32 rounded-r-xl h-full shadow-lg bg-white p-1 ">
                                        <nuxt-img loading="lazy" class="object-center" :src="url + champ.logo"
                                            :alt="champ.name" />
                                    </div>
                                </div>
                                <div class="text-center w-2/4 flex flex-col justify-center items-center py-2 space-y-0.5">
                                    <Icon name="fluent-emoji:trophy" size="35" />
                                    <p class="text-md text-center font-semibold  text-amber-900">
                                        {{ champ.name }}
                                    </p>
                                    <p class="text-sm text-amber-500">
                                        موسم {{ new Date(champ.end_at).getFullYear() }}
                                    </p>

                                </div>
                                <div class="w-1/4  flex justify-end items-center h-full">
                                    <NuxtLink :to="`/championships/${champ.id}`"
                                        class=" btn bg-blue-300 rounded-l-xl h-full rounded-r-none border-0">
                                        <Icon name="fluent:arrow-circle-left-24-filled" class="text-white" size="35" />
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                        <div v-else class="flex flex-col justify-center items-center">
                            <Icon name="line-md:close-small" size="100" />
                            <h4 class="text-center">لم يفز الفريق بأى بطولات حتي الان</h4>
                        </div>
                    </section>

                    <section>
                        <div class="divider my-5"> انتقالات الاعبين </div>
                        <div v-if="team.transfers.length > 0" class="max-h-96 overflow-auto py-5 px-3">
                            <div class="grid grid-cols-1 gap-3 w-full align-start  ">
                                <div v-for="trans, index in team.transfers" :key="index"
                                    class="flex justify-evenly items-center bg-gray-200 rounded-xl shadow-lg h-24">
                                    <div
                                        class="avatar team-avatar w-1/4 flex justify-center rounded-r-xl shadow-lg items-center overflow-hidden h-full bg-white ">
                                        <div v-if="trans.to_team_logo !== null"
                                            class=" w-20 md:w-32  h-full  bg-white p-1 ">
                                            <nuxt-img loading="lazy" class="object-center" :src="url + trans.to_team_logo"
                                                :alt="trans.to_team_name" />
                                        </div>
                                        <p v-else class="font-semibold text-center">لاعب <br /> حر </p>
                                    </div>
                                    <div class="text-center w-2/4 flex flex-nowrap justify-around ">
                                        <div class="flex justify-center items-center">
                                            <Icon name="gg:arrow-long-right" :rotate="0" size="50"
                                                :class="trans.to_team_name === team.name ? 'text-green-400' : 'text-red-400'" />
                                        </div>
                                        <div class="flex flex-col justify-center items-center py-2 space-y-0.5">
                                            <div class="avatar team-avatar">
                                                <div class=" w-16  mask mask-hexagon bg-white">
                                                    <img :src="url + trans.image" />
                                                </div>
                                            </div>
                                            <p class="text-sm text-center font-semibold  text-amber-900">
                                                {{ trans.name }}
                                                <NuxtLink :to="`/players/${trans.player_id}`">
                                                    <Icon name="solar:square-arrow-right-up-broken" class="text-blue-400"
                                                        size="18" />
                                                </NuxtLink>
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        class="avatar team-avatar w-1/4 flex justify-center items-center h-full  shadow-lg overflow-hidden rounded-l-xl  bg-white">
                                        <div v-if="trans.from_team_logo !== null"
                                            class=" w-20 md:w-32  h-full bg-white p-1 ">
                                            <nuxt-img loading="lazy" class="object-center" :src="url + trans.from_team_logo"
                                                :alt="trans.from_team_name" />
                                        </div>
                                        <p v-else class="font-semibold text-center">لاعب <br /> حر </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="flex flex-col justify-center items-center">
                            <Icon name="line-md:close-small" size="100" />
                            <h4 class="text-center">لم يجري الفريق أي انتقالات حتي الان</h4>
                        </div>
                    </section>
                    <section>
                        <div class="divider my-5"> احصائيات الفريق </div>
                        <div class="container mx-auto rounded-lg shadow-lg mb-2 h-96 overflow-auto">
                            <table class="table table-zebra rounded-t-lg text-center  table-pin-rows">
                                <thead>
                                    <tr class="text-lg text-gray-100 bg-blue-400">
                                        <th>
                                            الاحصائية
                                        </th>
                                        <th>
                                            القيمة
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="value, key, index in team.statistics" :key="index">
                                        <td class="px-0 ">{{ key }}</td>
                                        <td class="font-semibold  text-md text-blue-950">{{ value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </section>
            </div>
            <button @click="() => $router.go(-1)"
                class="btn btn-glass bg-blue-400 text-white absolute -top-2 left-0 rounded-full">
                <Icon name="fluent:arrow-circle-left-24-filled" size="20" />
            </button>
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
const route = useRoute()
import getElapsedTime from "@/utils/getElapsedTime"
import { ITeamFullDetails } from '@/Models/ITeam';
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 
const client = useStrapiClient()
const team = ref<ITeamFullDetails | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)

const fetchData = () => {
    pending.value = true
    return client(`/teams/${route.params.id}`, { method: 'GET' })
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

<style scoped>
.team-avatar img {
    object-fit: contain;
}
</style>