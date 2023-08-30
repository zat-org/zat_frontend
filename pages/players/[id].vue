<template>
    <div class="relative md:w-5/6 lg:w2/3 mx-auto">
        <template v-if="!pending && !error && player">
            <div class="flex flex-col justify-center items-center my-5 space-y-5">
                <h2 class="font-semibold text-2xl">{{ player.player_name }}</h2>
                <div class="avatar team-avatar">
                    <div class=" w-24 sm:w-28 md:w-32 rounded-xl bg-white p-1  shadow-lg ">
                        <nuxt-img loading="lazy" :src="url + player.player_image" />
                    </div>
                </div>


                <section class="grid grid-cols-1 w-full md:w-2/3 lg:w-1/2">
                    <section class="flex justify-around items-center md:col-span-2">
                        <div v-if="player.snap_link || player.twitter_link"
                            class=" flex  justify-center items-center  space-x-3">
                            <a :href="`${player.twitter_link}`" target="_blank" class="mx-2">
                                <Icon name="line-md:twitter-x" size="30" />
                            </a>
                            <a :href="`${player.snap_link}`" target="_blank">
                                <Icon name="uil:snapchat-square" size="35" color="#f7f400" class="mx-2" />
                            </a>
                        </div>
                        <div class=" flex flex-col justify-center items-center space-y-3">
                            <div class="avatar team-avatar">
                                <div class=" w-16 sm:w-20 md:w-24 rounded-xl bg-white p-1  shadow-lg ">
                                    <nuxt-img loading="lazy" :src="url + player.team_logo" />
                                </div>
                            </div>
                            <p>لاعب فريق <span class="font-semibold">{{ player.team_name }}</span> </p>
                        </div>
                    </section>


                    <section>
                        <div class="divider my-5"> انتقالات اللاعب </div>
                        <div v-if="player.transfers.length > 0" class="max-h-96 overflow-auto py-5 px-3">
                            <div class="grid grid-cols-1 gap-3 w-full align-start  ">
                                <div v-for="trans, index in player.transfers" :key="index"
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
                                            <Icon name="gg:arrow-long-right" :rotate="0" size="50" class="text-green-400" />
                                        </div>
                                        <div class="flex flex-col justify-center items-center py-2 space-y-0.5">
                                            <div class="avatar team-avatar">
                                                <div class=" w-16  mask mask-hexagon bg-white">
                                                    <img :src="url + trans.image" />
                                                </div>
                                            </div>
                                            <p class="text-sm text-center font-semibold  text-amber-900">
                                                {{ trans.name }}
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
                            <h4 class="text-center">لم يجري اللاعب أي انتقالات حتي الان</h4>
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
import { IPlayerFullDetails } from '@/Models/ITeam';
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 
const client = useStrapiClient()
const player = ref<IPlayerFullDetails | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)

const fetchData = () => {
    pending.value = true
    return client(`/players/${route.params.id}`, { method: 'GET' })
        .then((res: any) => {
            player.value = res.data
            pending.value = false
            useHead({
                title: `${player.value?.player_name}`,
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