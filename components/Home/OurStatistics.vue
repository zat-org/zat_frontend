<template>
    <div class="mx-auto mt-5" dir="rtl">
        <div class="flex  justify-center">

            <SectionHeader title="زات فى أرقام" icon="i-heroicons-chart-bar" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 align-content-center">
            <UCard class="bg-gray-200 h-44" :ui="{ body: { base: 'h-full' } }">
                <div class="relative z-0  flex justify-around items-center">
                    <div class="flex flex-col justify-evenly">
                        <div class="flex justify-end items-center my-0.5">
                            <h2 class="text-4xl font-bold font-mono ">{{ data?.zat.items[0].statistics.viewCount }}</h2>
                            <UIcon name="i-heroicons-eye" class="text-amber-500 text-[35px] ms-2" />
                        </div>
                        <div class="flex justify-end items-center my-0.5">
                            <h2 class="text-4xl font-bold font-mono ">{{ data?.zat.items[0].statistics.subscriberCount }}
                            </h2>
                            <UIcon name="i-heroicons-user-circle-16-solid" class="text-amber-500 text-[35px] ms-2" />
                        </div>
                        <div class="flex justify-end items-center my-0.5">
                            <h2 class="text-4xl font-bold font-mono ">{{ data?.zat.items[0].statistics.videoCount }}</h2>
                            <UIcon name="i-heroicons-video-camera-20-solid" class="text-amber-500 text-[35px] ms-2" />
                        </div>
                    </div>
                    <UAvatar :src="data?.zat.items[0].snippet.thumbnails.default.url" size="3xl" />

                    <UIcon name="i-heroicons-arrow-trending-up-20-solid"
                        class="absolute text-[220px]  text-gray-400 dark:text-gray-600 top-8 -right-9 z-[-1]" />
                    <Icon name="mdi:youtube" class="absolute text-[220px]  text-[#CD201F] bottom-8 -left-20 z-[-1]" />
                </div>
            </UCard>

            <UCard class="bg-gray-200 h-44" :ui="{ body: { base: 'h-full' } }">
                <div class="relative z-0 h-full">
                    <div class="flex flex-col justify-evenly h-full">
                        <h2 class="text-2xl font-semibold ">زيارات موقع زات</h2>
                        <h2 class="text-5xl font-bold font-mono ">{{ data?.websiteCounter.data.attributes.counter }}</h2>
                    </div>
                    <UIcon name="i-heroicons-globe-alt"
                        class="absolute text-[220px]  text-gray-400 dark:text-gray-600 -top-11  -right-24 z-[-1]" />
                </div>
            </UCard>

            <UCard class="bg-gray-200 h-44" :ui="{ body: { base: 'h-full' } }">
                <div class="relative z-0  flex justify-around items-center">
                    <div class="flex flex-col justify-evenly">
                        <div class="flex justify-end items-center my-0.5">
                            <h2 class="text-4xl font-bold font-mono ">{{ data?.zatPlus.items[0].statistics.viewCount }}</h2>
                            <UIcon name="i-heroicons-eye" class="text-amber-500 text-[35px] ms-2" />
                        </div>
                        <div class="flex justify-end items-center my-0.5">
                            <h2 class="text-4xl font-bold font-mono ">{{ data?.zatPlus.items[0].statistics.subscriberCount
                            }}
                            </h2>
                            <UIcon name="i-heroicons-user-circle-16-solid" class="text-amber-500 text-[35px] ms-2" />
                        </div>
                        <div class="flex justify-end items-center my-0.5">
                            <h2 class="text-4xl font-bold font-mono ">{{ data?.zatPlus.items[0].statistics.videoCount }}
                            </h2>
                            <UIcon name="i-heroicons-video-camera-20-solid" class="text-amber-500 text-[35px] ms-2" />
                        </div>
                    </div>
                    <UAvatar :src="data?.zatPlus.items[0].snippet.thumbnails.default.url" size="3xl" />

                    <UIcon name="i-heroicons-arrow-trending-up-20-solid"
                        class="absolute text-[220px]  text-gray-400 dark:text-gray-600 top-8 -right-9 z-[-1]" />
                    <Icon name="mdi:youtube" class="absolute text-[220px]  text-[#CD201F] bottom-8 -left-20 z-[-1]" />
                </div>
            </UCard>

            <UCard class="bg-gray-200 h-44" :ui="{ body: { base: 'h-full' } }">
                <div class="relative z-0  flex justify-around items-center h-full">
                    <div class="flex flex-col justify-evenly">
                        <div class="flex justify-end items-center my-0.5">
                            <h2 class="text-4xl font-bold font-mono ">{{ twitch.statistics.viewCount }}</h2>
                            <UIcon name="i-heroicons-eye" class="text-amber-500 text-[35px] ms-2" />
                        </div>
                        <div class="flex justify-end items-center my-0.5">
                            <h2 class="text-4xl font-bold font-mono ">{{ twitch.statistics.subscriberCount
                            }}
                            </h2>
                            <UIcon name="i-heroicons-user-circle-16-solid" class="text-amber-500 text-[35px] ms-2" />
                        </div>
                    </div>
                    <UAvatar :src="data?.zat.items[0].snippet.thumbnails.default.url" size="3xl" />

                    <UIcon name="i-heroicons-arrow-trending-up-20-solid"
                        class="absolute text-[220px]  text-gray-400 dark:text-gray-600 top-8 -right-9 z-[-1]" />
                    <Icon name="mdi:twitch" class="absolute text-[220px]  text-[#6441a5] -bottom-8 -left-20 z-[-1]" />
                </div>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">

const YOUTUBE_API_KEY = useRuntimeConfig().public.youtubeApi;
const { $api } = useNuxtApp();
const { data, error, pending } = await $api.websiteAssets.getZatStatistics(YOUTUBE_API_KEY);
const twitch = {
    statistics: {
        subscriberCount: 89400,
        viewCount: 4020000
    }
}
</script>

<style scoped></style>