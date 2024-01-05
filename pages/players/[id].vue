
<template>
    <FetchDataWraper class="relative md:w-5/6 lg:w2/3 mx-auto" :error="error" :pending="pending">
        <template #main>
            <template v-if="player">
                <div class="flex flex-col justify-center items-center my-5 space-y-5">
                    <h2 class="font-semibold text-2xl">{{ player.player_name }}</h2>
                    <div class="avatar">
                        <div class=" w-24 sm:w-28 md:w-32 rounded-xl bg-white   shadow-lg ">
                            <nuxt-img loading="lazy" :src="url + player.player_image" class="object-top" />
                        </div>
                    </div>


                    <section class="grid grid-cols-1 w-full md:w-2/3 lg:w-1/2">
                        <section class="flex justify-around items-center md:col-span-2">
                            <div v-if="player.snap_link || player.twitter_link || player.tiktok_link"
                                class=" flex  justify-center items-center ">

                                <a v-show="player.twitter_link" :href="`${player.twitter_link}`" target="_blank"
                                    class="mx-2">
                                    <Icon name="line-md:twitter-x" size="30" />
                                </a>
                                <a v-show="player.snap_link" :href="`${player.snap_link}`" target="_blank">
                                    <Icon name="uil:snapchat-square" size="35" color="#f7f400" class="mx-2" />
                                </a>
                                <a v-show="player.tiktok_link" :href="`${player.tiktok_link}`" target="_blank">
                                    <Icon name="logos:tiktok-icon" size="30" class="mx-2" />
                                </a>
                            </div>
                            <div class=" flex flex-col justify-center items-center space-y-3">
                                <template v-if="player.transfers && player.transfers.length > 0">
                                    <div class="avatar team-avatar">
                                        <div class=" w-16 sm:w-20 md:w-24 rounded-xl bg-white p-1  shadow-lg ">
                                            <nuxt-img loading="lazy" :src="url + player.transfers[0].to_team_logo" />
                                        </div>
                                    </div>
                                    <p>لاعب فريق <span class="font-semibold">{{ player.transfers[0].to_team_name }}</span>
                                    </p>
                                </template>
                                <template v-else>
                                    <p class="text-slate-800 dark:text-slate-100">لاعب حر </p>
                                </template>
                            </div>
                        </section>


                        <section>
                            <div class="divider my-5"> انتقالات اللاعب </div>
                            <TeamTransferList v-bind:transfers="player.transfers">
                                <template #noTransText>
                                    لم يجري اللاعب اي انتقالات حتي الان
                                </template>
                            </TeamTransferList>

                        </section>

                    </section>
                </div>
                <BackBtn />
            </template>
            <div v-else class="flex flex-col justify-center items-center mt-10">
                <Icon name="line-md:close-small" size="100" />
                <h4 class="text-center">هذا اللاعب غير موجود</h4>
                <NuxtLink to="/teams" class="btn btn-warning mt-5"> فرق زات</NuxtLink>
            </div>
        </template>
    </FetchDataWraper>
</template>

<script setup lang="ts">
const route = useRoute()
import type { IPlayerFullDetails } from '@/Models/ITeam';
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 
const client = useStrapiClient()
const player = ref<IPlayerFullDetails | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)

const fetchData = () => {
    pending.value = true
    return client(`/players/getbyid/${route.params.id}`, { method: 'GET' })
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