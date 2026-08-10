<template>
    <section dir="rtl" class="relative w-full overflow-hidden bg-surface-primary" aria-label="القسم الرئيسي">
        <div class="relative lg:h-[50vh]">
            <!-- Swiper: full-width on mobile, 75% background layer on lg -->
            <div class="relative z-0 aspect-video w-full overflow-hidden
                       lg:absolute lg:inset-y-0 lg:inset-e-0 lg:h-full lg:w-[65%] lg:aspect-auto">
                <ClientOnly>
                    <swiper-container ref="swiperRef" class="absolute inset-0 h-full w-full" :loop="slides.length > 1"
                        :slides-per-view="1" :autoplay-delay="6000" :autoplay-disable-on-interaction="false"
                        @swiperslidechange="onSlideChange">
                        <swiper-slide v-for="(slide, index) in slides" :key="slide.id"
                            class="group relative h-full overflow-hidden">
                            <img
                                :src="heroImageSrc(slide)"
                                :alt="slide.alt"
                                :fetchpriority="index === 0 ? 'high' : 'auto'"
                                :loading="index === 0 ? 'eager' : 'lazy'"
                                class="absolute inset-0 size-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                            />

                            <a
                                v-if="slide.url"
                                :href="slide.url"
                                :target="isExternalHeroUrl(slide.url) ? '_blank' : undefined"
                                :rel="isExternalHeroUrl(slide.url) ? 'noopener noreferrer' : undefined"
                                class="absolute inset-0 z-1 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto focus-visible:opacity-100 focus-visible:pointer-events-auto"
                                :aria-label="`فتح ${slide.title}`"
                                @click.stop
                            >
                                <div
                                    class="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_center,rgba(35,31,31,1)_0%,rgba(22,19,19,0.25)_100%)]"
                                    aria-hidden="true"
                                />
                                <Icon name="zat:youtube" class="size-9 text-white!  relative w-full h-full flex items-center justify-center sm:size-11 lg:size-14" />
                                
                            </a>
                        </swiper-slide>
                    </swiper-container>
                    <template #fallback>
                        <img v-if="slides[0]" :src="heroImageSrc(slides[0])" :alt="slides[0].alt" fetchpriority="high"
                            loading="eager" class="absolute inset-0 size-full object-cover object-center" />
                    </template>
                </ClientOnly>

                <div class="pointer-events-none absolute inset-0 max-lg:shadow-[inset_-141px_38px_143px_0px_var(--color-surface-primary)]"
                    aria-hidden="true" />

                <div class="absolute top-6 inset-e-6 z-10 sm:inset-e-20">
                    <span
                        class="inline-flex items-center gap-1 rounded-zat-full bg-surface-raised px-4 py-2 text-xs font-normal text-text-body shadow-zat-sm">
                        دورات البلوت من زات
                        <UIcon name="i-heroicons-academic-cap" class="size-4" />
                    </span>
                </div>

                <div v-if="slides.length > 1"
                    class="absolute inset-e-6 bottom-6 z-10 flex gap-4 sm:inset-e-20 lg:bottom-[76px]">
                    <button v-for="(_, index) in slides" :key="index" type="button"
                        class="size-5 rounded-full border-2 transition-all" :class="activeSlide === index
                            ? 'scale-110 border-zat-500 bg-zat-500'
                            : 'border-white/80 bg-white/30 hover:bg-white/60'" :aria-label="`الشريحة ${index + 1}`"
                        :aria-current="activeSlide === index ? 'true' : undefined" @click="goToSlide(index)" />
                </div>
            </div>

            <!-- Gradient overlay: smooth fade from image into text area (desktop) -->
            <div class="pointer-events-none absolute inset-y-0 inset-s-0 z-10 hidden h-full w-full
                       lg:block
                       lg:bg-linear-to-r 
                       lg:from-transparent lg:from-0%
                       lg:via-surface-primary lg:via-65%
                       lg:to-surface-primary lg:to-95%" aria-hidden="true" />

            <!-- Info panel: text and actions -->
            <div class="relative z-20 flex w-full flex-col items-center justify-center gap-6
                       max-lg:bg-surface-primary px-6 py-8 text-center text-text-on-action
                       sm:px-8
                       lg:absolute lg:inset-y-0 lg:inset-s-0 lg:h-full lg:w-full lg:max-w-[40%]
                       lg:items-start lg:justify-center lg:gap-6 lg:bg-transparent
                       lg:px-0 lg:ps-20 lg:py-6 lg:text-right">
                <div v-if="currentSlide" class="w-full space-y-0.5 text-text-on-action">
                    <p class="hidden text-xs font-bold leading-6 text-text-on-action/80 md:block">
                        منصة زات للبلوت
                    </p>
                    <h1 class="text-2xl font-bold leading-tight sm:text-3xl lg:text-[40px] lg:leading-[64px]">
                        {{ currentSlide.title }}
                    </h1>
                    <p
                        class="mx-auto max-w-lg text-base leading-relaxed text-text-on-action/80 sm:text-lg lg:mx-0 lg:text-xl lg:leading-9">
                        {{ currentSlide.description }}
                    </p>
                </div>

                <div class="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
                    <UButton to="/qydha"
                        variant="outline" color="white"
                        class="h-14 border-2 border-white px-4 text-[clamp(16px,1.5vw,20px)] font-bold text-white hover:bg-white/10 flex-1 min-w-[140px]">
                        <span class="flex items-center gap-2 justify-center  w-full">

                            <Icon name="zat:google-play" class="size-6" />
                            <span>حمل قيدها</span>
                        </span>
                    </UButton>
                    <UButton v-if="currentSlide?.buttonCTA" :to="currentSlide.url || undefined"
                        :target="currentSlide.url?.startsWith('http') ? '_blank' : undefined" 
                        color="white"
                        variant="solid" size="xl"
                        class="h-14 px-4 text-[clamp(16px,1.5vw,20px)] font-bold flex-1 min-w-[140px] text-black">
                        <span class="flex items-center gap-2 justify-center  w-full">
                            <Icon :name="currentSlide.buttonIconName || 'zat:teacher'" class="size-6" />
                            {{ currentSlide.buttonCTA }}

                        </span>
                    </UButton>
                    <UButton v-else to="https://www.youtube.com/@zat_baloot" target="_blank" color="white"
                        variant="solid" size="xl"
                        class="h-14 px-4 text-[clamp(16px,1.5vw,20px)] font-bold flex-1 min-w-[140px] text-black">
                        <span class="flex items-center gap-2 justify-center  w-full">
                            <Icon name="zat:youtube" class="size-6" />
                            <span>تعلم الآن</span>
                        </span>
                    </UButton>

                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const swiperRef = ref<HTMLElement | null>(null)

const {
    slides,
    currentSlide,
    activeSlide,
    onSlideChange,
    goToSlide: goToSlideBase,
} = await useHeroSlides()

function goToSlide(index: number) {
    goToSlideBase(index, swiperRef)
}

function heroImageSrc(slide: { image: string, largeUrl: string | null }) {
    return slide.image || slide.largeUrl || ''
}

function isExternalHeroUrl(url: string) {
    return /^https?:\/\//i.test(url)
}
</script>

<style scoped>
.swiper-slide {
    height: 100% !important;
    overflow: hidden;
}
</style>