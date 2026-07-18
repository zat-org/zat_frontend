<template>
    <section
        dir="rtl"
        class="relative overflow-hidden  py-8 bg-poker-pattern"
        aria-label="إحصائيات زات"
    >
        <div class="page-container relative z-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4" dir="ltr">
            <article
                v-for="card in cards"
                :key="card.id"
                class="relative flex min-h-[180px] flex-col items-center justify-center rounded-zat-md px-4 pb-6 pt-12"
            >
                <!-- Calligraphy label (top) -->
                <div
                    class="pointer-events-none absolute inset-e-0 top-0 h-8 w-auto max-w-[45%] text-text-body  sm:h-10 [&>svg]:h-full [&>svg]:w-auto"
                    aria-hidden="true"
                    v-html="card.labelSvg"
                />

                <!-- Watermark word behind icon -->
                <div
                    class="pointer-events-none absolute inset-x-0 top-[25%] flex justify-center text-stats-decor opacity-90"
                    aria-hidden="true"
                >
                    <div
                        class="h-16 w-auto max-w-[70%] sm:h-20 [&>svg]:h-full [&>svg]:w-auto"
                        v-html="card.watermarkSvg"
                    />
                </div>

                <div class="relative z-10 flex flex-col items-center">
                    <Icon :name="card.icon" class="mb-1 size-8 text-text-body" />
                    <p class="font-numbers text-center text-3xl font-bold leading-tight text-text-body sm:text-[40px] sm:leading-[64px]">
                        {{ card.value }}
                    </p>
                    <p class="text-xl font-bold leading-9 text-text-body">
                        {{ card.unit }}
                    </p>
                </div>
            </article>
        </div>
    </section>
</template>

<script setup lang="ts">
import visitsH from '~/assets/images/stats/visitsH.svg?raw'
import viewsH from '~/assets/images/stats/viewsH.svg?raw'
import subsH from '~/assets/images/stats/subsH.svg?raw'
import websiteT from '~/assets/images/stats/websiteT.svg?raw'
import twitchT from '~/assets/images/stats/twitchT.svg?raw'
import youtubeT from '~/assets/images/stats/youtubeT.svg?raw'

function toCurrentColorSvg(svg: string) {
    return svg.replace(/fill="(?!none|currentColor)[^"]+"/gi, 'fill="currentColor"')
}

const youtubeApiKey = useRuntimeConfig().public.youtubeApi
const { $api } = useNuxtApp()
const { data } = await $api.websiteAssets.getZatStatistics(youtubeApiKey)

const zatChannel = computed(() => data.value?.zat?.items?.[0] ?? null)
const visitCount = computed(() => data.value?.visitCount ?? '151,000')

/** Twitch followers — same static source as previous stats until API exists */
const TWITCH_SUBSCRIBERS = 90_000

function formatCount(value: string | number | null | undefined, fallback: string) {
    if (value === null || value === undefined || value === '' || value === '—') {
        return fallback
    }
    const numeric = typeof value === 'number' ? value : Number(String(value).replace(/[^\d.]/g, ''))
    if (Number.isFinite(numeric) && numeric > 0) {
        return new Intl.NumberFormat('en-US').format(Math.round(numeric))
    }
    return String(value)
}

function formatArabicGrouped(value: string) {
    // Figma uses Arabic thousands separator "،"
    return value.replace(/,/g, '،')
}

const youtubeViews = computed(() => {
    const raw = zatChannel.value?.statistics?.viewCount
    return formatArabicGrouped(formatCount(raw, '125,000,000'))
})

const twitchSubs = computed(() =>
    formatArabicGrouped(formatCount(TWITCH_SUBSCRIBERS, '90,000')),
)

const siteVisits = computed(() =>
    formatArabicGrouped(formatCount(visitCount.value, '151,000')),
)

const cards = computed(() => [
    {
        id: 'visits',
        icon: 'zat:globe',
        value: siteVisits.value,
        unit: 'الــــف',
        labelSvg: toCurrentColorSvg(visitsH),
        watermarkSvg: toCurrentColorSvg(websiteT),
    },
    {
        id: 'twitch',
        icon: 'zat:twitch',
        value: twitchSubs.value,
        unit: 'الـــــــــف',
        labelSvg: toCurrentColorSvg(subsH),
        watermarkSvg: toCurrentColorSvg(twitchT),
    },
    {
        id: 'youtube',
        icon: 'zat:youtube',
        value: youtubeViews.value,
        unit: 'مــــليـــون',
        labelSvg: toCurrentColorSvg(viewsH),
        watermarkSvg: toCurrentColorSvg(youtubeT),
    },
])
</script>
