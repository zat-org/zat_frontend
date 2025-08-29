
<template>
    <FetchDataWrapper class="relative  w-full md:w-5/6 lg:w2/3 mx-auto"
        :error="getPlayerError ? 'تعذر تحميل بيانات اللاعب.' : null" :pending="getPlayerPending">
        <template v-if="player">
            <div class="flex flex-col justify-center items-center my-5 space-y-5">
                <h2 class="font-semibold text-2xl">{{ player.player_name }}</h2>
                <UAvatar size="3xl"
                    :ui="{ rounded: 'rounded-lg object-cover object-top shadow-lg', size: { '3xl': 'w-40 h-40' } }"
                    :src="`${url}${player.player_image}`" icon="i-heroicons-user" :alt="player.player_name" />

                <section class="grid grid-cols-1 w-full md:w-2/3 lg:w-1/2">
                    <section class="flex justify-around items-end md:col-span-2">
                        <div class="flex flex-col justify-center items-center space-y-2"
                            v-if="socialMediaAccounts.length > 0">
                            <div class="flex justify-center items-center ">
                                <UButton v-for="sma in socialMediaAccounts" target="_blank" :to="sma.href" :key="sma.href"
                                    class="rounded-full transition-transform duration-500 ease-out hover:-translate-y-2 mx-1"
                                    size="lg" square variant="outline">
                                    <template #trailing>
                                        <Icon :name="sma.iconName" width="22" height="22" />
                                    </template>
                                </UButton>
                            </div>
                            <h2 class="text-lg">تابع {{ player.player_name }}</h2>
                        </div>
                        <div class="flex flex-col justify-center items-center space-y-3">
                            <template v-if="player.transfers && player.transfers.length > 0">
                                <template v-if="player.transfers[0].to_team_name">
                                    <UAvatar size="3xl"
                                        :ui="{ rounded: 'rounded-lg object-contain object-center shadow-lg bg-white' }"
                                        :src="url + player.transfers[0].to_team_logo" icon="i-heroicons-users" />
                                    <p>لاعب فريق <span class="font-semibold">{{
                                        player.transfers[0].to_team_name }}</span>
                                    </p>
                                </template>
                                <p v-else> لاعب حر </p>
                            </template>
                            <template v-else>
                                <p class="text-slate-800 dark:text-slate-100">لاعب حر </p>
                            </template>
                        </div>
                    </section>


                    <section>
                        <UDivider class="my-5"> انتقالات اللاعب </UDivider>
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
    </FetchDataWrapper>
</template>

<script setup lang="ts">

const { $api } = useNuxtApp();
const route = useRoute();
const url = useRuntimeConfig().public.apiBaseUrl;
const { error: getPlayerError, pending: getPlayerPending, data } = await $api.players.getById(route.params.id as string);
const player = computed(() => data.value?.data);
useHead({
    title: player.value?.player_name ? `لاعبي زات - ${player.value?.player_name}` : 'لاعبي زات',
    meta: computed(() => [
        {
            name: 'description',
            content: player.value?.player_name ? 
                `الصفحة الشخصية للاعب ${player.value.player_name}. تعرف على مسيرته، انتقالاته، وتابع حساباته على مواقع التواصل الاجتماعي.` :
                'لاعبو زات - تعرف على نجوم البلوت في المملكة'
        },
        {
            property: 'og:title',
            content: player.value?.player_name ? `لاعبي زات - ${player.value?.player_name}` : 'لاعبي زات'
        },
        {
            property: 'og:description',
            content: player.value?.player_name ? 
                `الصفحة الشخصية للاعب ${player.value.player_name}. تعرف على مسيرته، انتقالاته، وتابع حساباته على مواقع التواصل الاجتماعي.` :
                'لاعبو زات - تعرف على نجوم البلوت في المملكة'
        },
        {
            property: 'og:image',
            content: player.value?.player_image ? url + player.value.player_image : undefined
        }
    ])
})
const socialMediaAccounts = computed(() => {
    let accounts: { href: string, iconName: string }[] = []
    if (player.value?.tiktok_link) {
        accounts.push({
            iconName: "streamline:tiktok-solid", href: player.value?.tiktok_link
        })
    }
    if (player.value?.youtube_link) {
        accounts.push({ iconName: "mingcute:youtube-fill", href: player.value?.youtube_link })
    }
    if (player.value?.twitter_link) {
        accounts.push({ iconName: "ri:twitter-x-fill", href: player.value?.twitter_link })
    }
    if (player.value?.snap_link) {
        accounts.push({ iconName: "simple-icons:snapchat", href: player.value?.snap_link })
    }
    return accounts;
})

</script>

<style scoped>
.team-avatar img {
    object-fit: contain;
}
</style>