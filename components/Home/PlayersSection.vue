<template>
    <section
        v-if="images.length > 0"
        id="players"
        dir="rtl"
        class="relative overflow-hidden bg-surface-base py-8 sm:py-10"
        aria-label="اعضاء زات"
    >
     

        <div class="page-container relative z-10 flex min-w-0 flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-6">
            <!-- Copy + CTAs (visual right in RTL) -->
            <div class="flex w-full min-w-0 max-w-[644px] flex-col items-center gap-6 text-center lg:max-w-none lg:flex-1">
                <div class="flex w-full flex-col items-center gap-1">
                    <p class="text-xl font-bold leading-9 text-text-caption">
                        ما هي زات؟
                    </p>
                    <img
                        :src="logoSrc"
                        alt="زات"
                        class="h-20 w-auto object-contain"
                        width="83"
                        height="48"
                    >
                    <h2 class="text-xl font-bold leading-9 text-text-body">
                        أول منصة احترافية للعبة البلوت
                    </h2>
                    <p class="max-w-xl text-xl font-normal leading-9 text-text-subtitle">
                        ننظم سلسلة من بطولات البلوت ونقدم تغطية شاملة للأخبار والتحليلات ومحتوى تطويري للعبة.
                    </p>
                </div>

                <div class="flex w-full flex-row items-center justify-center gap-2 sm:gap-4">
                    <UButton
                        to="https://www.youtube.com/@zat_baloot"
                        target="_blank"
                        color="primary"
                        size="sm"
                        class="h-10 min-w-0 flex-1 px-3 text-[clamp(14px,3.5vw,16px)] font-bold sm:h-14 sm:min-w-[200px] sm:flex-none sm:px-4 sm:text-[clamp(16px,1.5vw,20px)]"
                    >
                        <span class="flex items-center justify-center gap-1">
                            <Icon name="zat:youtube" class="size-5 sm:size-6" />
                            <span>تابعنا على يوتيوب</span>
                        </span>
                    </UButton>
                    <UButton
                        to="https://twitch.tv/zat_baloot"
                        target="_blank"
                        color="neutral"
                        size="sm"
                        class="h-10 min-w-0 flex-1 px-3 text-[clamp(14px,3.5vw,16px)] font-bold sm:h-14 sm:min-w-[200px] sm:flex-none sm:px-4 sm:text-[clamp(16px,1.5vw,20px)]"
                    >
                        <span class="flex items-center justify-center gap-1">
                            <Icon name="zat:twitch" class="size-5 sm:size-6" />
                            <span>تابعنا على تويتش</span>
                        </span>
                    </UButton>
                </div>
            </div>

            <!-- Members carousel (visual left in RTL) -->
            <div class="relative flex w-full min-w-0 max-w-[500px] flex-col items-center py-4 sm:max-w-[500px] lg:max-w-none lg:w-[clamp(280px,42%,550px)] lg:flex-none">
                <div class="mb-2 flex w-full items-center justify-between gap-4 px-1">
                    <p class="font-numbers text-xl text-text-subtitle">
                        {{ activeIndex + 1 }}/{{ images.length }}
                    </p>
                    <div class="inline-flex h-14 items-center gap-1 rounded-zat-full px-4 text-xl font-bold text-text-body">
                        <UIcon name="i-heroicons-arrow-long-left" class="size-6" />
                        <span>اعضاء زات</span>
                    </div>
                </div>

                <div class="relative h-[440px] w-full overflow-hidden sm:h-[500px] lg:h-[clamp(380px,46vw,520px)] xl:h-[580px]">
                    <!-- Red circle backdrop -->
                    <div
                        class="absolute inset-e-[5%] top-[15%] z-0 w-[66%] aspect-square rounded-full bg-[#F14950]"
                        aria-hidden="true"
                    />

                    <ClientOnly>
                        <swiper-container
                            class="absolute inset-s-0 h-full w-full"
                            :loop="images.length > 1"
                            :slides-per-view="1"
                            :autoplay-delay="4000"
                            :autoplay-disable-on-interaction="true"
                            @swiperslidechange="onSlideChange"
                        >
                            <swiper-slide
                                v-for="img in images"
                                :key="img.id"
                                class="relative h-full"
                            >
                                <div class="relative flex h-full w-full items-end justify-start ">
                                    <img
                                        :src="img.url"
                                        :alt="img.name"
                                        class="relative z-10 h-full aspect-4/5  w-full object-cover object-top  grayscale "
                                        loading="lazy"

                                    >
                                    <div
                                        class="absolute z-20 top-[18%] inset-e-0 w-[42%] min-w-0 px-1 sm:top-[22%] sm:w-[40%] sm:px-2 md:top-[25%] md:px-3"
                                    >
                                        <p class="w-full text-center font-zaatar leading-[0.95] text-text-body text-[clamp(0.875rem,4.5vw,3rem)] sm:leading-tight md:text-[clamp(1.25rem,3.5vw,3rem)]">
                                            <span
                                                v-for="(word, i) in img.name.trim().split(/\s+/)"
                                                :key="`${img.id}-${i}`"
                                                class="block w-full break-words"
                                            >
                                                {{ word }}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </swiper-slide>
                        </swiper-container>
                        <template #fallback>
                            <div class="relative flex h-full w-full items-end justify-center">
                                <img
                                    v-if="images[0]"
                                    :src="images[0].url"
                                    :alt="images[0].name"
                                    class="relative z-10 h-[92%] aspect-[4/5] w-auto max-w-[90%] object-cover object-bottom grayscale"
                                    width="400"
                                    height="500"
                                >
                            </div>
                        </template>
                    </ClientOnly>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const logoSrc = computed(() =>
    colorMode.value === 'dark' ? '/images/zat-logo-white.svg' : '/images/zat-logo-black.svg',
)

const { data } = await usePlayerImages()
const images = computed(() => data.value ?? [])

const activeIndex = ref(0)

function onSlideChange(event: CustomEvent) {
    const swiper = (event as CustomEvent & { detail?: Array<{ realIndex?: number }> }).detail?.[0]
    if (swiper && typeof swiper.realIndex === 'number') {
        activeIndex.value = swiper.realIndex
    }
}
</script>
