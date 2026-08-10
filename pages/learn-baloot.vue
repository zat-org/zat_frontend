<template>
    <div class="flex w-full flex-col bg-surface-base">
        <section
            class="w-full bg-surface-secondary bg-repeat py-4 sm:py-6"
            :style="{ backgroundImage: `url(${darkHeroPattern})` }"
            aria-label="دورات البلوت"
        >
            <div class="page-container flex justify-center">
                <h1 class="text-center font-zaatar text-3xl leading-normal text-white sm:text-4xl lg:text-[48px]">
                    دورات البلوت
                </h1>
            </div>
        </section>

        <section
            class="w-full bg-poker-pattern bg-surface-off-base py-6"
            aria-label="تعلم واحترف البلوت"
            dir="rtl"
        >
            <div class="page-container">
                <div class="flex flex-col items-center gap-4 bg-surface-raised px-4 py-6 shadow-zat sm:px-8 sm:py-6 lg:px-20">
                    <div class="flex w-full flex-col items-center gap-2 text-center">
                        <p class="w-fit rounded-zat-sm bg-zat-500 px-2 py-0.5 text-[10px] font-bold leading-4 text-white">
                            اكثر من 3 مليون مشاهدة على قناتنا
                        </p>
                        <h2 class="text-2xl font-bold leading-12 text-text-heading sm:text-3xl sm:leading-14">
                            تعلم واحترف البلوت
                        </h2>
                        <p class="max-w-2xl text-[10px] leading-4 text-text-subtitle">
                            كورس عملي لتعلم البلوت خطوة بخطوة: من القواعد الأساسية لحد استراتيجيات الفوز. هتتعلم إزاي تفكر زي المحترفين، تقرأ اللعب، وتاخد قرارات ذكية تخليك تكسب بثقة في كل جولة.
                        </p>
                    </div>

                    <img
                        :src="heroGraphic"
                        alt="تعلم البلوت مع زات"
                        class="h-auto w-full max-w-72 object-contain"
                    >

                    <p class="flex items-center justify-center gap-2 rounded-lg bg-stats-decor px-4 py-2 text-xs leading-6 text-zat-500 backdrop-blur-sm">
                        <span>من مبتدئ</span>
                        <UIcon name="zat:learn-arrow" class="size-4 shrink-0" />
                        <span>الى محترف</span>
                    </p>

                    <div class="flex flex-wrap items-center justify-center gap-2 text-base font-bold leading-7 text-text-heading">
                        <template v-for="(highlight, index) in highlights" :key="highlight">
                            <span v-if="index" aria-hidden="true">•</span>
                            <span>{{ highlight }}</span>
                        </template>
                    </div>

                    <div class="flex w-full flex-col items-center gap-2">
                        <AppButton
                            label="احترف معنا الان"
                            icon="zat:teacher"
                            variant="secondary"
                            size="lg"
                            href="https://www.youtube.com/@zat_baloot"
                        />
                        <p class="text-center text-base font-semibold leading-7 text-text-subtitle">
                            ارسل لنا الان و اشترك في دورات البلوت
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import darkHeroPattern from '~/assets/images/shared/dark-hero-pattern.png'
import heroGraphic from '~/assets/images/learn/hero-graphic.png'

const highlights = [
    'استراتيجيات احترافية للفوز',
    'مناسب للمبتدئين والمحترفين',
    'تعلم أساسيات البلوت من الصفر',
]

useHead({
    title: 'دورات البلوت - زات',
    meta: [
        { name: 'description', content: 'تعلم واحترف البلوت مع زات. كورس عملي من القواعد الأساسية حتى استراتيجيات الفوز.' },
        { property: 'og:title', content: 'دورات البلوت - زات' },
        { property: 'og:description', content: 'تعلم واحترف البلوت مع زات. كورس عملي من القواعد الأساسية حتى استراتيجيات الفوز.' },
    ],
})
</script>
