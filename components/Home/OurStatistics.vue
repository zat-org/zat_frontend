<template>
    <div class="mx-auto mt-6" dir="rtl">
        <div class="flex justify-center">
            <SectionHeader title="زات بالأرقام" icon="i-heroicons-chart-bar" />
        </div>

        <div v-if="pending" class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div v-for="i in 6" :key="i" class="h-44 rounded-2xl border border-zinc-200 bg-white/70 dark:border-zinc-800 dark:bg-black/40 animate-pulse" />
        </div>

        <div v-else class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <!-- ZAT main channel -->
            <UCard :ui="cardUi" class="h-44 overflow-hidden" :class="cardClass">
                <div class="relative z-0 flex h-full items-center justify-between gap-4">
                    <div class="flex min-w-0 flex-col justify-center gap-2">
                        <p class="text-xs font-semibold tracking-widest uppercase" :class="kickerClass">يوتيوب زات</p>

                        <div class="grid gap-1.5">
                            <div class="flex items-center justify-end gap-2">
                                <span class="text-3xl font-black tabular-nums tracking-tight">{{ fmt(data?.zat.items[0].statistics.viewCount) }}</span>
                                <UIcon name="i-heroicons-eye" class="text-[26px]" :class="iconClass" />
                            </div>
                            <div class="flex items-center justify-end gap-2">
                                <span class="text-3xl font-black tabular-nums tracking-tight">{{ fmt(data?.zat.items[0].statistics.subscriberCount) }}</span>
                                <UIcon name="i-heroicons-user-circle-16-solid" class="text-[26px]" :class="iconClass" />
                            </div>
                            <div class="flex items-center justify-end gap-2">
                                <span class="text-3xl font-black tabular-nums tracking-tight">{{ fmt(data?.zat.items[0].statistics.videoCount) }}</span>
                                <UIcon name="i-heroicons-video-camera-20-solid" class="text-[26px]" :class="iconClass" />
                            </div>
                        </div>
                    </div>

                    <div class="shrink-0">
                        <UAvatar :src="data?.zat.items[0].snippet.thumbnails.default.url" size="3xl" />
                    </div>

                    <UIcon
                        name="i-heroicons-arrow-trending-up-20-solid"
                        class="absolute -right-10 top-6 z-[-1] text-[210px]"
                        :class="bgIconClass"
                    />
                    <Icon name="mdi:youtube" class="absolute -left-24 bottom-6 z-[-1] text-[210px] text-[#CD201F]" />
                </div>
            </UCard>

            <!-- Website visits -->
            <UCard :ui="cardUi" class="h-44 overflow-hidden" :class="cardClass">
                <div class="relative z-0 flex h-full flex-col justify-between">
                    <div>
                        <p class="text-xs font-semibold tracking-widest uppercase" :class="kickerClass">الموقع</p>
                        <h3 class="mt-2 text-lg font-semibold" :class="titleClass">زيارات موقع زات</h3>
                        <p class="mt-2 text-5xl font-black tabular-nums tracking-tight" :class="titleClass">
                            {{ fmt(data?.websiteCounter.data.attributes.counter) }}
                        </p>
                    </div>
                    <UIcon name="i-heroicons-globe-alt" class="absolute -right-24 -top-14 z-[-1] text-[220px]" :class="bgIconClass" />
                </div>
            </UCard>

            <!-- ZAT PLUS -->
            <UCard :ui="cardUi" class="h-44 overflow-hidden" :class="cardClass">
                <div class="relative z-0 flex h-full items-center justify-between gap-4">
                    <div class="flex min-w-0 flex-col justify-center gap-2">
                        <p class="text-xs font-semibold tracking-widest uppercase" :class="kickerClass">ZAT PLUS</p>
                        <div class="grid gap-1.5">
                            <div class="flex items-center justify-end gap-2">
                                <span class="text-3xl font-black tabular-nums tracking-tight">{{ fmt(data?.zatPlus.items[0].statistics.viewCount) }}</span>
                                <UIcon name="i-heroicons-eye" class="text-[26px]" :class="iconClass" />
                            </div>
                            <div class="flex items-center justify-end gap-2">
                                <span class="text-3xl font-black tabular-nums tracking-tight">{{ fmt(data?.zatPlus.items[0].statistics.subscriberCount) }}</span>
                                <UIcon name="i-heroicons-user-circle-16-solid" class="text-[26px]" :class="iconClass" />
                            </div>
                            <div class="flex items-center justify-end gap-2">
                                <span class="text-3xl font-black tabular-nums tracking-tight">{{ fmt(data?.zatPlus.items[0].statistics.videoCount) }}</span>
                                <UIcon name="i-heroicons-video-camera-20-solid" class="text-[26px]" :class="iconClass" />
                            </div>
                        </div>
                    </div>

                    <div class="shrink-0">
                        <UAvatar :src="data?.zatPlus.items[0].snippet.thumbnails.default.url" size="3xl" />
                    </div>

                    <UIcon
                        name="i-heroicons-arrow-trending-up-20-solid"
                        class="absolute -right-10 top-6 z-[-1] text-[210px]"
                        :class="bgIconClass"
                    />
                    <Icon name="mdi:youtube" class="absolute -left-24 bottom-6 z-[-1] text-[210px] text-[#CD201F]" />
                </div>
            </UCard>

            <!-- Twitch -->
            <UCard :ui="cardUi" class="h-44 overflow-hidden" :class="cardClass">
                <div class="relative z-0 flex h-full items-center justify-between gap-4">
                    <div class="flex min-w-0 flex-col justify-center gap-2">
                        <p class="text-xs font-semibold tracking-widest uppercase" :class="kickerClass">Twitch</p>
                        <div class="grid gap-1.5">
                            <div class="flex items-center justify-end gap-2">
                                <span class="text-3xl font-black tabular-nums tracking-tight">{{ fmt(twitch.statistics.viewCount) }}</span>
                                <UIcon name="i-heroicons-eye" class="text-[26px]" :class="iconClass" />
                            </div>
                            <div class="flex items-center justify-end gap-2">
                                <span class="text-3xl font-black tabular-nums tracking-tight">{{ fmt(twitch.statistics.subscriberCount) }}</span>
                                <UIcon name="i-heroicons-user-circle-16-solid" class="text-[26px]" :class="iconClass" />
                            </div>
                        </div>
                    </div>

                    <div class="shrink-0">
                        <UAvatar :src="data?.zat.items[0].snippet.thumbnails.default.url" size="3xl" />
                    </div>

                    <UIcon
                        name="i-heroicons-arrow-trending-up-20-solid"
                        class="absolute -right-10 top-6 z-[-1] text-[210px]"
                        :class="bgIconClass"
                    />
                    <Icon name="mdi:twitch" class="absolute -left-24 -bottom-8 z-[-1] text-[210px] text-[#6441a5]" />
                </div>
            </UCard>

            <div v-if="error" class="md:col-span-2 lg:col-span-3 rounded-2xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-200 dark:text-red-200">
                تعذّر تحميل الإحصائيات الآن. حاول مرة أخرى لاحقًا.
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const YOUTUBE_API_KEY = useRuntimeConfig().public.youtubeApi;
const { $api } = useNuxtApp();
const { data, error, pending } = await $api.websiteAssets.getZatStatistics(YOUTUBE_API_KEY);
const colorMode = useColorMode()
const isDark = computed(() => colorMode.preference === 'dark')

const cardUi = {
    body: { base: 'h-full p-5' }
}

const cardClass = computed(() => (
    isDark.value
        ? 'bg-black/45 border border-zinc-800/80 backdrop-blur shadow-[0_18px_60px_-30px_rgba(239,68,68,0.35)]'
        : 'bg-white/75 border border-zinc-200 backdrop-blur shadow-sm'
))
const titleClass = computed(() => (isDark.value ? 'text-white' : 'text-zinc-900'))
const kickerClass = computed(() => (isDark.value ? 'text-red-200/85' : 'text-red-700/85'))
const iconClass = computed(() => (isDark.value ? 'text-red-300' : 'text-red-600'))
const bgIconClass = computed(() => (isDark.value ? 'text-zinc-700/50' : 'text-zinc-300/60'))

function fmt(value: unknown) {
    const n = Number(value)
    if (!Number.isFinite(n))
        return '—'

    return new Intl.NumberFormat('ar-SA', { notation: 'compact' }).format(n)
}
const twitch = {
    statistics: {
        subscriberCount: 89400,
        viewCount: 4020000
    }
}
</script>

<style scoped></style>