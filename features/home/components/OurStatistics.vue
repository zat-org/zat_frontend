<template>
    <div class="mx-auto" dir="rtl">
        <SectionHeader light title="زات فى أرقام" icon="i-heroicons-chart-bar" />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div class="zat-card shadow-zat-sm h-44 overflow-hidden p-4">
                <div class="relative z-0 flex justify-around items-center">
                    <div v-if="zatChannel" class="flex flex-col justify-evenly">
                        <div class="flex justify-end items-center my-0.5">
                            <h2 class="text-4xl font-bold font-mono">{{ zatChannel.statistics.viewCount }}</h2>
                            <UIcon name="i-heroicons-eye" class="text-zat-500 text-[35px] ms-2" />
                        </div>
                        <div class="flex justify-end items-center my-0.5">
                            <h2 class="text-4xl font-bold font-mono">{{ zatChannel.statistics.subscriberCount }}</h2>
                            <UIcon name="i-heroicons-user-circle-16-solid" class="text-zat-500 text-[35px] ms-2" />
                        </div>
                        <div class="flex justify-end items-center my-0.5">
                            <h2 class="text-4xl font-bold font-mono">{{ zatChannel.statistics.videoCount }}</h2>
                            <UIcon name="i-heroicons-video-camera-20-solid" class="text-zat-500 text-[35px] ms-2" />
                        </div>
                    </div>
                    <UAvatar
                        v-if="zatChannel?.snippet.thumbnails.default.url"
                        :src="zatChannel.snippet.thumbnails.default.url"
                        size="3xl"
                    />

                    <UIcon
                        name="i-heroicons-arrow-trending-up-20-solid"
                        class="absolute text-[220px] text-gray-400 dark:text-gray-600 top-8 -right-9 z-[-1]"
                    />
                    <Icon name="mdi:youtube" class="absolute text-[220px] text-[#CD201F] bottom-8 -left-20 z-[-1]" />
                </div>
            </div>

            <div class="zat-card shadow-zat-sm h-44 overflow-hidden p-4">
                <div class="relative z-0 h-full">
                    <div class="flex flex-col justify-evenly h-full">
                        <h2 class="text-2xl font-semibold text-text-heading">زيارات موقع زات</h2>
                        <h2 class="text-5xl font-bold font-mono text-text-action">{{ visitCount }}</h2>
                    </div>
                    <UIcon
                        name="i-heroicons-globe-alt"
                        class="absolute text-[220px] text-surface-tone -top-11 -right-24 z-[-1]"
                    />
                </div>
            </div>

            <div class="zat-card shadow-zat-sm h-44 overflow-hidden p-4">
                <div class="relative z-0 flex justify-around items-center">
                    <div v-if="zatPlusChannel" class="flex flex-col justify-evenly">
                        <div class="flex justify-end items-center my-0.5">
                            <h2 class="text-4xl font-bold font-mono">{{ zatPlusChannel.statistics.viewCount }}</h2>
                            <UIcon name="i-heroicons-eye" class="text-zat-500 text-[35px] ms-2" />
                        </div>
                        <div class="flex justify-end items-center my-0.5">
                            <h2 class="text-4xl font-bold font-mono">{{ zatPlusChannel.statistics.subscriberCount }}</h2>
                            <UIcon name="i-heroicons-user-circle-16-solid" class="text-zat-500 text-[35px] ms-2" />
                        </div>
                        <div class="flex justify-end items-center my-0.5">
                            <h2 class="text-4xl font-bold font-mono">{{ zatPlusChannel.statistics.videoCount }}</h2>
                            <UIcon name="i-heroicons-video-camera-20-solid" class="text-zat-500 text-[35px] ms-2" />
                        </div>
                    </div>
                    <UAvatar
                        v-if="zatPlusChannel?.snippet.thumbnails.default.url"
                        :src="zatPlusChannel.snippet.thumbnails.default.url"
                        size="3xl"
                    />

                    <UIcon
                        name="i-heroicons-arrow-trending-up-20-solid"
                        class="absolute text-[220px] text-gray-400 dark:text-gray-600 top-8 -right-9 z-[-1]"
                    />
                    <Icon name="mdi:youtube" class="absolute text-[220px] text-[#CD201F] bottom-8 -left-20 z-[-1]" />
                </div>
            </div>

            <div class="zat-card shadow-zat-sm h-44 overflow-hidden p-4">
                <div class="relative z-0 flex justify-around items-center h-full">
                    <div class="flex flex-col justify-evenly">
                        <div class="flex justify-end items-center my-0.5">
                            <h2 class="text-4xl font-bold font-mono">{{ twitch.statistics.viewCount }}</h2>
                            <UIcon name="i-heroicons-eye" class="text-zat-500 text-[35px] ms-2" />
                        </div>
                        <div class="flex justify-end items-center my-0.5">
                            <h2 class="text-4xl font-bold font-mono">{{ twitch.statistics.subscriberCount }}</h2>
                            <UIcon name="i-heroicons-user-circle-16-solid" class="text-zat-500 text-[35px] ms-2" />
                        </div>
                    </div>
                    <UAvatar
                        v-if="zatChannel?.snippet.thumbnails.default.url"
                        :src="zatChannel.snippet.thumbnails.default.url"
                        size="3xl"
                    />

                    <UIcon
                        name="i-heroicons-arrow-trending-up-20-solid"
                        class="absolute text-[220px] text-gray-400 dark:text-gray-600 top-8 -right-9 z-[-1]"
                    />
                    <Icon name="mdi:twitch" class="absolute text-[220px] text-[#6441a5] -bottom-8 -left-20 z-[-1]" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const youtubeApiKey = useRuntimeConfig().public.youtubeApi
const { $api } = useNuxtApp()
const { data } = await $api.websiteAssets.getZatStatistics(youtubeApiKey)

const zatChannel = computed(() => data.value?.zat?.items?.[0] ?? null)
const zatPlusChannel = computed(() => data.value?.zatPlus?.items?.[0] ?? null)
const visitCount = computed(() => data.value?.visitCount ?? '—')

const twitch = {
    statistics: {
        subscriberCount: 89400,
        viewCount: 4020000,
    },
}
</script>
