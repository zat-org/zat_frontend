<template>
    <main
       
        :class="[
            'min-h-screen selection:bg-red-500/20 selection:text-red-700',
            isDark ? 'text-white' : 'text-zinc-900'
        ]"
    >
        <!-- Premium background -->
   

        <!-- Starfield background (whole page) -->
        <ClientOnly>
            <div aria-hidden="true" class="pointer-events-none fixed inset-0  overflow-hidden">
                <div
                    class="absolute inset-0 zat-stars"
                    :class="[
                        isDark ? 'opacity-60 mix-blend-screen' : 'opacity-20 mix-blend-multiply'
                    ]"
                >
                    <div class="stars" />
                    <div class="stars2" />
                    <div class="stars3" />
                </div>
            </div>
        </ClientOnly>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
            <!-- Luxury hero shell (keeps HomeLandingHero intact) -->
            <section aria-label="واجهة زات الرئيسية" class="relative">
                <div class="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div class="flex flex-wrap items-center gap-2">
                        <span
                            class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur"
                            :class="[
                                isDark ? 'border-red-500/25 bg-black/35 text-red-200' : 'border-red-200 bg-white/80 text-red-700'
                            ]"
                        >
                            <span class="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden="true" />
                            <span>PREMIUM · ZAT</span>
                        </span>
                        <span
                            class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur"
                            :class="[isDark ? 'border-zinc-800/80 bg-black/30 text-zinc-200' : 'border-zinc-200 bg-white/80 text-zinc-700']"
                        >
                            Baloot · Esports
                        </span>
                        <span
                            class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur"
                            :class="[isDark ? 'border-zinc-800/80 bg-black/30 text-zinc-300' : 'border-zinc-200 bg-white/80 text-zinc-600']"
                        >
                            بطولات · تحديات · سلاسل
                        </span>
                    </div>

                    <div class="flex items-center gap-2">
                        <a
                            :href="youtubeUrl"
                            target="_blank"
                            rel="noopener"
                            class="inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 shadow-sm"
                            :class="[
                                isDark
                                    ? 'bg-red-500 text-white hover:bg-red-400 focus:ring-red-400/50'
                                    : 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-500/40'
                            ]"
                        >
                            YouTube
                        </a>
                        <a
                            href="#home-matches"
                            class="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 shadow-sm"
                            :class="[
                                isDark
                                    ? 'border-red-500/25 bg-black/30 text-white hover:border-red-400/40 hover:bg-black/50 focus:ring-red-400/40'
                                    : 'border-red-200 bg-white text-zinc-900 hover:border-red-300 hover:bg-red-50 focus:ring-red-300/40'
                            ]"
                        >
                            شاهد المباريات
                        </a>
                    </div>
                </div>

                <div class="relative">
                 
               
                    <HomeLandingHero />

                    <a
                        href="#home-slider"
                        class="group absolute -bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold backdrop-blur transition hover:-translate-y-0.5 lg:inline-flex"
                        :class="[
                            isDark ? 'border-zinc-800/80 bg-black/35 text-zinc-200 hover:border-red-500/25' : 'border-zinc-200 bg-white/85 text-zinc-700 hover:border-red-300'
                        ]"
                        aria-label="انتقل إلى القسم التالي"
                    >
                        <span>استكشف المزيد</span>
                        <span aria-hidden="true" class="transition group-hover:-translate-y-0.5">↓</span>
                    </a>
                </div>
            </section>

            <!-- Slider Section -->
            <section id="home-slider" aria-label="عرض شرائح زات" class="mt-6 sm:mt-10 scroll-mt-24">
                <div
                    class="rounded-2xl border backdrop-blur"
                    :class="[
                        isDark ? 'border-red-500/15 bg-black/40' : 'border-zinc-200 bg-white/70'
                    ]"
                >
                    <LazyHomeSlider />
                </div>
            </section>

            <!-- Matches Section -->
            <section id="home-matches" aria-label="المباريات" class="mt-8 sm:mt-12 scroll-mt-24">
                <header class="mb-4 sm:mb-6 flex items-end justify-between gap-4">
                    <div>
                        <p
                            class="text-xs sm:text-sm tracking-widest uppercase"
                            :class="[isDark ? 'text-red-200/80' : 'text-red-700/80']"
                        >
                            منصة تنافسية
                        </p>
                        <h2 class="text-xl sm:text-2xl font-semibold" :class="[isDark ? 'text-white' : 'text-zinc-900']">
                            المباريات المباشرة والنتائج
                        </h2>
                    </div>
                    <div class="hidden sm:flex items-center gap-2 text-xs" :class="[isDark ? 'text-zinc-400' : 'text-zinc-600']">
                        <span class="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        <span>Live</span>
                    </div>
                </header>

                <div
                    class="rounded-2xl border backdrop-blur"
                    :class="[isDark ? 'border-zinc-800/70 bg-black/40' : 'border-zinc-200 bg-white/70']"
                >
                    <div class="flex justify-around flex-col md:flex-row">
                        <LazyHomeMatches class="w-full" />
                    </div>
                </div>
            </section>

            <!-- Tournaments / Challenges / Series -->
            <section aria-label="الأقسام الرئيسية" class="mt-10 sm:mt-14">
                <header class="mb-5 sm:mb-7">
                    <p
                        class="text-xs sm:text-sm tracking-widest uppercase"
                        :class="ui.kicker"
                    >
                        محتوى البطولات
                    </p>
                    <h2 class="text-xl sm:text-2xl font-semibold" :class="ui.text">
                        بطولات، تحديات، وسلاسل موسمية
                    </h2>
                    <p class="mt-2 text-sm sm:text-base max-w-3xl" :class="ui.subtext">
                        تجربة مشاهدة وتنظيم مصممة بروح الرياضات الإلكترونية—مستويات، نقاط، ومواجهات محسوبة.
                    </p>
                </header>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <article
                        v-for="item in contentCards"
                        :key="item.title"
                        class="group relative overflow-hidden rounded-2xl border p-5 sm:p-6 backdrop-blur transition hover:-translate-y-0.5"
                        :class="[ui.border, ui.surface, ui.borderHover, 'hover:shadow-[0_18px_60px_-20px_rgba(239,68,68,0.45)]']"
                    >
                        <!-- Luxury top-line -->
                        <div
                            aria-hidden="true"
                            class="pointer-events-none absolute inset-x-0 top-0 h-px opacity-90"
                            :class="[
                                isDark
                                    ? 'bg-gradient-to-l from-transparent via-red-400/55 to-transparent'
                                    : 'bg-gradient-to-l from-transparent via-red-500/40 to-transparent'
                            ]"
                        />
                        <!-- Subtle pattern -->
                        <div
                            aria-hidden="true"
                            class="pointer-events-none absolute inset-0 opacity-70"
                            :class="[isDark ? ui.luxuryOverlayDark : ui.luxuryOverlayLight]"
                        />
                        <!-- Hover sheen -->
                        <div
                            aria-hidden="true"
                            class="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                            :class="[
                                isDark
                                    ? 'bg-[radial-gradient(60%_50%_at_45%_0%,rgba(239,68,68,0.22),transparent_62%)]'
                                    : 'bg-[radial-gradient(60%_50%_at_45%_0%,rgba(239,68,68,0.14),transparent_62%)]'
                            ]"
                        />
                        <div class="relative flex items-start gap-4">
                            <div
                                class="grid h-11 w-11 place-items-center rounded-xl border shadow-sm"
                                :class="[
                                    isDark
                                        ? 'border-red-500/25 bg-red-500/10 text-red-200'
                                        : 'border-red-200 bg-red-50 text-red-700'
                                ]"
                            >
                                <span class="text-lg leading-none" aria-hidden="true">{{ item.icon }}</span>
                            </div>
                            <div class="min-w-0">
                                <h3 class="text-base sm:text-lg font-semibold tracking-tight" :class="ui.text">
                                    {{ item.title }}
                                </h3>
                                <p class="mt-1 text-sm leading-relaxed" :class="ui.subtext">
                                    {{ item.description }}
                                </p>
                            </div>
                        </div>

                        <div class="relative mt-5 flex items-center justify-between">
                            <div class="flex items-center gap-2 text-xs" :class="ui.muted">
                                <span class="h-1.5 w-1.5 rounded-full bg-red-500/80" />
                                <span>{{ item.kicker }}</span>
                            </div>
                            <a
                                :href="item.href"
                                class="inline-flex items-center gap-2 text-sm font-semibold transition"
                                :class="[isDark ? 'text-red-200/90 hover:text-red-200' : 'text-red-700 hover:text-red-800']"
                            >
                                <span>استكشف</span>
                                <span aria-hidden="true" class="transition group-hover:-translate-x-0.5">←</span>
                            </a>
                        </div>
                    </article>
                </div>
            </section>

            <!-- Join Champions Section -->
            <section id="home-join" aria-label="انضم للبطولات" class="mt-10 sm:mt-14 scroll-mt-24">
                <div
                    class="rounded-2xl border backdrop-blur"
                    :class="[
                        isDark
                            ? 'border-red-500/15 bg-gradient-to-b from-red-500/10 to-black/40'
                            : 'border-zinc-200 bg-gradient-to-b from-red-50 to-white'
                    ]"
                >
                    <LazyHomeJoinChampions />
                </div>
            </section>

            <!-- Teams / Members -->
            <section aria-label="الفريق والأعضاء" class="mt-10 sm:mt-14">
                <header class="mb-5 sm:mb-7 flex items-end justify-between gap-4">
                    <div>
                        <p
                            class="text-xs sm:text-sm tracking-widest uppercase"
                            :class="ui.kicker"
                        >
                            مجتمع زات
                        </p>
                        <h2 class="text-xl sm:text-2xl font-semibold" :class="ui.text">
                            فريق التقديم واللاعبون
                        </h2>
                        <p class="mt-2 text-sm sm:text-base max-w-3xl" :class="ui.subtext">
                            واجهة نظيفة لعرض الأعضاء، الأدوار، ولمسات حركة بسيطة تعكس طابع منصة بطولة.
                        </p>
                    </div>
                </header>

                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                    <article
                        v-for="m in members"
                        :key="m.name"
                        class="group rounded-2xl border p-3 sm:p-4 backdrop-blur transition hover:-translate-y-0.5"
                        :class="[ui.border, ui.surface, ui.borderHover, 'hover:shadow-[0_18px_60px_-24px_rgba(239,68,68,0.35)]']"
                    >
                        <div
                            aria-hidden="true"
                            class="pointer-events-none absolute inset-x-0 top-0 h-px opacity-80"
                            :class="[
                                isDark
                                    ? 'bg-gradient-to-l from-transparent via-red-400/45 to-transparent'
                                    : 'bg-gradient-to-l from-transparent via-red-500/30 to-transparent'
                            ]"
                        />
                        <div class="flex items-center gap-3">
                            <div
                                class="relative grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-xl border font-bold"
                                :class="[
                                    isDark
                                        ? 'border-red-500/20 bg-gradient-to-b from-red-500/10 to-black text-red-200'
                                        : 'border-red-200 bg-gradient-to-b from-red-50 to-white text-red-700'
                                ]"
                                aria-hidden="true"
                            >
                                {{ m.initials }}
                            </div>
                            <div class="min-w-0">
                                <p class="truncate text-sm sm:text-base font-semibold tracking-tight" :class="ui.text">
                                    {{ m.name }}
                                </p>
                                <p class="truncate text-xs" :class="ui.muted">
                                    {{ m.role }}
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            <!-- Featured Videos -->
            <section aria-label="فيديوهات مميزة" class="mt-10 sm:mt-14">
                <header class="mb-5 sm:mb-7">
                    <p
                        class="text-xs sm:text-sm tracking-widest uppercase"
                        :class="ui.kicker"
                    >
                        يوتيوب ZAT
                    </p>
                    <h2 class="text-xl sm:text-2xl font-semibold" :class="ui.text">
                        أبرز الفيديوهات
                    </h2>
                    <p class="mt-2 text-sm sm:text-base max-w-3xl" :class="ui.subtext">
                        تشغيل سريع، تصميم متجاوب، وتهيئة عرض مناسبة للمشاهدة على الهاتف والسطح.
                    </p>
                </header>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    <article
                        v-for="v in featuredVideos"
                        :key="v.id"
                        class="overflow-hidden rounded-2xl border backdrop-blur transition"
                        :class="[ui.border, ui.surface, ui.borderHover, 'hover:shadow-[0_18px_60px_-24px_rgba(239,68,68,0.35)]']"
                    >
                        <div class="relative aspect-video" :class="[isDark ? 'bg-black/60' : 'bg-zinc-100']">
                            <div
                                aria-hidden="true"
                                class="pointer-events-none absolute inset-0"
                                :class="[isDark ? 'bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent_55%)]' : 'bg-[linear-gradient(to_top,rgba(255,255,255,0.6),transparent_55%)]']"
                            />
                            <iframe
                                class="h-full w-full"
                                :src="`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`"
                                :title="v.title"
                                loading="lazy"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                            />
                        </div>
                        <div class="p-4 sm:p-5">
                            <h3 class="text-sm sm:text-base font-semibold tracking-tight line-clamp-2" :class="ui.text">
                                {{ v.title }}
                            </h3>
                            <p class="mt-1 text-xs sm:text-sm leading-relaxed line-clamp-2" :class="ui.muted">
                                {{ v.subtitle }}
                            </p>
                        </div>
                    </article>
                </div>
            </section>

            <!-- Strong CTA -->
            <section aria-label="دعوة لاتخاذ إجراء" class="mt-10 sm:mt-16">
                <div
                    class="relative overflow-hidden rounded-3xl border p-6 sm:p-10 backdrop-blur"
                    :class="[
                        isDark
                            ? 'border-red-500/20 bg-gradient-to-b from-red-500/14 via-black/35 to-black/75'
                            : 'border-red-200 bg-gradient-to-b from-red-50 via-white to-white'
                    ]"
                >
                    <div
                        aria-hidden="true"
                        class="pointer-events-none absolute inset-0 opacity-70"
                        :class="[isDark ? ui.luxuryOverlayDark : ui.luxuryOverlayLight]"
                    />
                    <div
                        aria-hidden="true"
                        class="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl"
                        :class="[isDark ? 'bg-red-500/18' : 'bg-red-200/60']"
                    />

                    <div class="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div class="max-w-2xl">
                            <p
                                class="text-xs sm:text-sm tracking-widest uppercase"
                                :class="ui.kicker"
                            >
                                جاهز للمنافسة؟
                            </p>
                            <h2 class="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight" :class="ui.text">
                                تابع زات على يوتيوب وانضم للبطولات الاحترافية
                            </h2>
                            <p class="mt-3 text-sm sm:text-base leading-relaxed" :class="ui.subtext">
                                محتوى بلوت سعودي بروح esports: مواجهات، تحديات، سلاسل، وتغطية مستمرة.
                            </p>
                        </div>

                        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <a
                                :href="youtubeUrl"
                                target="_blank"
                                rel="noopener"
                                class="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 shadow-sm"
                                :class="[
                                    isDark
                                        ? 'bg-red-500 text-white hover:bg-red-400 focus:ring-red-400/50'
                                        : 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-500/40'
                                ]"
                            >
                                شاهد على يوتيوب
                            </a>
                            <a
                                href="#home-join"
                                class="inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 shadow-sm"
                                :class="[
                                    isDark
                                        ? 'border-red-500/30 bg-black/30 text-white hover:border-red-400/45 hover:bg-black/50 focus:ring-red-400/40'
                                        : 'border-red-200 bg-white text-zinc-900 hover:border-red-300 hover:bg-red-50 focus:ring-red-300/40'
                                ]"
                            >
                                انضم للبطولة
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Statistics and Players Section -->
            <section
                id="home-stats"
                dir="ltr"
                class="mt-10 sm:mt-16 pb-10 text-center overflow-hidden scroll-mt-24 rounded-3xl border backdrop-blur"
                :class="[isDark ? 'border-zinc-800/70 bg-black/40' : 'border-zinc-200 bg-white/70']"
            >
                <!-- Statistics Subsection -->
                <article aria-label="إحصائيات زات" :class="[isDark ? 'text-white' : 'text-zinc-900']">
                    <LazyHomeOurStatistics />
                </article>

                <hr class="my-16" :class="[isDark ? 'border-zinc-800/80' : 'border-zinc-200']" role="separator">

                <!-- Players Subsection -->
                <article aria-label="لاعبو زات" :class="[isDark ? 'text-white' : 'text-zinc-900']">
                    <LazyHomePlayersSection />
                </article>

                <hr class="my-16" :class="[isDark ? 'border-zinc-800/80' : 'border-zinc-200']" role="separator">

                <!-- Clients Subsection -->
                <article aria-label="عملاء زات" :class="[isDark ? 'text-white' : 'text-zinc-900']">
                    <LazyHomeClientsSection />
                </article>
            </section>
        </div>
    </main>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
const colorMode = useColorMode()
const isDark = computed(() => colorMode.preference === 'dark')

const ui = computed(() => {
    const surface = isDark.value ? 'bg-black/45' : 'bg-white/75'
    const surfaceSolid = isDark.value ? 'bg-black/60' : 'bg-white'
    const border = isDark.value ? 'border-zinc-800/80' : 'border-zinc-200'
    const borderHover = isDark.value ? 'hover:border-red-400/35' : 'hover:border-red-400/40'
    const text = isDark.value ? 'text-white' : 'text-zinc-900'
    const subtext = isDark.value ? 'text-zinc-300/80' : 'text-zinc-600'
    const muted = isDark.value ? 'text-zinc-400' : 'text-zinc-500'
    const kicker = isDark.value ? 'text-red-200/85' : 'text-red-700/85'
    const ring = isDark.value ? 'focus:ring-red-400/50' : 'focus:ring-red-500/40'

    return {
        surface,
        surfaceSolid,
        border,
        borderHover,
        text,
        subtext,
        muted,
        kicker,
        ring,
        sectionWrap: `relative overflow-hidden rounded-3xl border ${border} ${surface} backdrop-blur`,
        luxuryOverlayDark:
            'bg-[radial-gradient(60%_80%_at_50%_0%,rgba(239,68,68,0.22),transparent_60%),radial-gradient(50%_50%_at_100%_10%,rgba(255,255,255,0.06),transparent_55%)]',
        luxuryOverlayLight:
            'bg-[radial-gradient(60%_80%_at_50%_0%,rgba(239,68,68,0.10),transparent_60%),radial-gradient(50%_50%_at_100%_10%,rgba(0,0,0,0.04),transparent_55%)]'
    }
})

const youtubeUrl = 'https://www.youtube.com/@zat_baloot'

const contentCards = [
    {
        title: 'البطولات',
        description: 'جداول احترافية، نظام نقاط، ونهائيات قوية بروح esports.',
        kicker: 'من التصفيات إلى النهائي',
        icon: '🏆',
        href: '#home-matches'
    },
    {
        title: 'التحديات',
        description: 'مهام أسبوعية ومواجهات سريعة لرفع مستواك وكسب سمعة.',
        kicker: 'سريع — تنافسي — ممتع',
        icon: '⚔️',
        href: '#home-slider'
    },
    {
        title: 'السلاسل',
        description: 'سلاسل موسمية وفعاليات خاصة مع أبرز اللحظات والتحليلات.',
        kicker: 'محتوى مستمر',
        icon: '🎬',
        href: youtubeUrl
    }
]

const members = [
    { name: 'ZAT', role: 'المنصة', initials: 'Z' },
    { name: 'مقدم 1', role: 'تقديم', initials: 'م1' },
    { name: 'معلق', role: 'تعليق', initials: 'م' },
    { name: 'كابتن', role: 'قيادة', initials: 'ك' },
    { name: 'لاعب', role: 'Pro', initials: 'ل' },
    { name: 'محلل', role: 'تحليل', initials: 'ح' }
]

const featuredVideos = [
    {
        id: 'dQw4w9WgXcQ',
        title: 'مباراة بلوت حماسية — ZAT',
        subtitle: 'لقطات مختارة + أفضل لحظات التحدي.'
    },
    {
        id: 'dQw4w9WgXcQ',
        title: 'تحدي سريع — من يسيطر على الطاولة؟',
        subtitle: 'إيقاع سريع ومواجهات قوية.'
    },
    {
        id: 'dQw4w9WgXcQ',
        title: 'سلسلة الموسم — النهائي الكبير',
        subtitle: 'تحليل، قرارات، وعودة قوية.'
    }
]

useHead({
    title: 'زات — بلوت السعودية على يوتيوب والبطولات الاحترافية',
    htmlAttrs: {
        lang: 'ar',
        dir: 'rtl'
    },
    meta: [
        {
            name: 'description',
            content: 'زات: بث وتنظيم بطولات البلوت في المملكة العربية السعودية، قنوات يوتيوب @zat_baloot وZAT PLUS، مباريات، إحصائيات، وتسوق ورق بلوت زات.'
        },
        {
            name: 'theme-color',
            content: '#000000'
        },
        {
            property: 'og:title',
            content: 'زات — بلوت السعودية على يوتيوب والبطولات الاحترافية'
        },
        {
            property: 'og:description',
            content: 'تابع زات على يوتيوب، البطولات، والمحتوى الاحترافي لبلوت المملكة.'
        },
        {
            property: 'og:image',
            content: '/assets/images/adv-banner.jpg'
        },
        {
            property: 'og:type',
            content: 'website'
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image'
        },
        {
            name: 'twitter:title',
            content: 'زات — بلوت السعودية على يوتيوب والبطولات الاحترافية'
        },
        {
            name: 'twitter:description',
            content: 'تابع زات على يوتيوب، البطولات، والمحتوى الاحترافي لبلوت المملكة.'
        },
        {
            name: 'twitter:image',
            content: '/assets/images/adv-banner.jpg'
        }
    ]
})
</script>

<style scoped>
.zat-stars {
    /* Color handled globally in `assets/css/tailwind.css` */
    contain: layout paint;
}

.zat-stars :deep(.stars),
.zat-stars :deep(.stars2),
.zat-stars :deep(.stars3) {
    position: absolute;
    top: 0;
    left: 0;
}
</style>
