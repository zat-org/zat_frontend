<template>
    <div
        id="home-landing"
        class="relative w-full max-w-6xl mx-auto mb-10 overflow-hidden rounded-3xl border shadow-sm"
        :class="[
            isDark
                ? 'border-zinc-800 bg-black'
                : 'border-zinc-200 bg-white'
        ]"
    >
        <!-- Luxury frame -->
        <div class="pointer-events-none absolute inset-0" aria-hidden="true">
            <div
                class="absolute -inset-[2px] rounded-[1.6rem] opacity-60 blur-2xl"
                :class="[
                    isDark
                        ? 'bg-[radial-gradient(55%_80%_at_50%_0%,rgba(239,68,68,0.40),transparent_62%)]'
                        : 'bg-[radial-gradient(55%_80%_at_50%_0%,rgba(239,68,68,0.20),transparent_62%)]'
                ]"
            />
        </div>

        <!-- Ambient accents + subtle pattern -->
        <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div
                class="absolute -start-28 top-12 h-80 w-80 rounded-full blur-3xl motion-safe:animate-landing-glow"
                :class="[isDark ? 'bg-red-500/18' : 'bg-red-200/80']"
            />
            <div
                class="absolute -end-36 bottom-0 h-72 w-72 rounded-full blur-3xl motion-safe:animate-landing-glow [animation-delay:2s]"
                :class="[isDark ? 'bg-white/5' : 'bg-zinc-900/5']"
            />
            <div
                class="absolute inset-0 opacity-[0.10] dark:opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,theme(colors.zinc.400)_1px,transparent_0)] [background-size:22px_22px]"
            />
            <div
                class="absolute inset-x-0 top-0 h-px"
                :class="[isDark ? 'bg-gradient-to-l from-transparent via-red-400/45 to-transparent' : 'bg-gradient-to-l from-transparent via-red-500/25 to-transparent']"
            />
        </div>

        <!-- Hero -->
        <section class="relative px-4 pt-10 pb-8 md:px-10 md:pt-14 md:pb-12" aria-labelledby="landing-hero-title">
            <div class="mx-auto flex max-w-3xl flex-col items-center text-center">
                    <div
                        class="motion-safe:opacity-0 motion-safe:animate-landing-fade-up motion-reduce:opacity-100"
                        style="animation-delay: 30ms"
                    >
                        <p
                            class="mx-auto inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur"
                            :class="[isDark ? 'border-red-500/25 bg-black/35 text-red-200' : 'border-red-200 bg-white/85 text-red-700']"
                        >
                            <span class="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden="true" />
                            <span>زات · بلوت · منصة تنافسية</span>
                        </p>

                        <h1
                            id="landing-hero-title"
                            class="mt-5 text-4xl font-black tracking-tight md:text-6xl"
                            :class="[isDark ? 'text-white' : 'text-zinc-900']"
                        >
                            <span class="block">زات</span>
                            <span
                                class="mt-2 block bg-clip-text text-transparent pb-5"
                                :class="[
                                    isDark
                                        ? 'bg-gradient-to-l from-red-500 via-red-300 to-zinc-200'
                                        : 'bg-gradient-to-l from-red-700 via-red-500 to-zinc-950'
                                ]"
                            >
                                ملوك البلوت
                            </span>
                        </h1>
                    </div>

                    <p
                        class="mt-4 max-w-2xl text-base leading-relaxed md:text-lg motion-safe:opacity-0 motion-safe:animate-landing-fade-up motion-reduce:opacity-100"
                        :class="[isDark ? 'text-zinc-300' : 'text-zinc-600']"
                        style="animation-delay: 90ms"
                    >
                        منصة بطولة بلوت سعودية بطابع esports: مباريات مباشرة، سلاسل موسمية، وتحديات تنافسية مصممة لتجربة مشاهدة فاخرة.
                    </p>

                    <div
                        class="mt-6 flex flex-wrap justify-center gap-2 motion-safe:opacity-0 motion-safe:animate-landing-fade-up motion-reduce:opacity-100"
                        style="animation-delay: 130ms"
                    >
                        <span
                            class="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold shadow-sm"
                            :class="[isDark ? 'bg-red-500 text-white' : 'bg-red-600 text-white']"
                        >
                            مباشر
                        </span>
                        <span
                            class="inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur-sm"
                            :class="[isDark ? 'border-zinc-800 bg-black/40 text-zinc-100' : 'border-zinc-200 bg-white/80 text-zinc-800']"
                        >
                            البطولات
                        </span>
                        <span
                            class="inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur-sm"
                            :class="[isDark ? 'border-zinc-800 bg-black/40 text-zinc-100' : 'border-zinc-200 bg-white/80 text-zinc-800']"
                        >
                            المتجر
                        </span>
                    </div>

                    <div
                        class="mt-8 flex flex-wrap justify-center gap-3 motion-safe:opacity-0 motion-safe:animate-landing-fade-up motion-reduce:opacity-100"
                        style="animation-delay: 170ms"
                    >
                        <a
                            href="https://www.youtube.com/@zat_baloot"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 shadow-sm"
                            :class="[isDark ? 'bg-red-500 text-white hover:bg-red-400 focus:ring-red-400/50' : 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-500/40']"
                            aria-label="YouTube"
                        >
                            <UIcon name="i-heroicons-play-circle-20-solid" class="h-5 w-5" aria-hidden="true" />
                            <span>شاهد على YouTube</span>
                        </a>
                        <NuxtLink
                            to="/championships"
                            class="inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 shadow-sm"
                            :class="[isDark ? 'border-red-500/25 bg-black/35 text-white hover:border-red-400/40 hover:bg-black/55 focus:ring-red-400/40' : 'border-red-200 bg-white text-zinc-900 hover:border-red-300 hover:bg-red-50 focus:ring-red-300/40']"
                            aria-label="Championships"
                        >
                            البطولات
                        </NuxtLink>
                        <a
                            :href="storeUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 shadow-sm"
                            :class="[isDark ? 'border-zinc-800 bg-black/20 text-zinc-100 hover:border-red-500/20 hover:bg-black/40 focus:ring-red-400/30' : 'border-zinc-200 bg-white/80 text-zinc-900 hover:border-red-300 hover:bg-red-50 focus:ring-red-300/30']"
                            aria-label="Store"
                        >
                            <UIcon name="i-heroicons-shopping-bag-20-solid" class="h-5 w-5" aria-hidden="true" />
                            <span>المتجر</span>
                        </a>
                    </div>
            </div>

            <!-- Luxury visual strip -->
            <div class="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
                <div
                    class="relative overflow-hidden rounded-2xl border shadow-lg backdrop-blur-sm"
                    :class="[isDark ? 'border-zinc-800 bg-black/35' : 'border-zinc-200 bg-white/75']"
                >
                    <div class="absolute inset-0 opacity-85" aria-hidden="true">
                        <div
                            class="absolute inset-0"
                            :class="[isDark ? 'bg-gradient-to-tr from-red-500/18 via-transparent to-transparent' : 'bg-gradient-to-tr from-red-500/10 via-transparent to-transparent']"
                        />
                        <div
                            class="absolute -top-10 start-10 h-40 w-40 rounded-full blur-3xl motion-safe:animate-landing-glow"
                            :class="[isDark ? 'bg-red-500/14' : 'bg-red-200/70']"
                        />
                    </div>
                    <div class="relative p-5 md:p-6">
                        <div class="flex items-center justify-between">
                            <p class="text-sm font-semibold" :class="[isDark ? 'text-white' : 'text-zinc-900']">ZAT · Baloot</p>
                            <span
                                class="rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm"
                                :class="[isDark ? 'border-zinc-800 bg-black/40 text-zinc-200' : 'border-zinc-200 bg-white/70 text-zinc-700']"
                            >
                            السعودية
                            </span>
                        </div>
                        <div class="mt-4 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <img src="/assets/images/adv-banner.jpg" class="h-48 w-full object-cover object-top md:h-56"
                                alt="زات بلوت — بطولات البلوت" loading="eager" width="1200" height="600" />
                        </div>
                    </div>
                </div>

                <!-- Action tiles -->
                <div class="grid gap-3">
                    <NuxtLink to="#home-matches"
                        class="group flex items-center justify-between rounded-2xl border p-4 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md"
                        :class="[isDark ? 'border-zinc-800 bg-black/35 hover:border-red-500/20' : 'border-zinc-200 bg-white/75 hover:border-red-400/30']"
                    >
                        <div class="flex items-center gap-3">
                            <div class="grid h-11 w-11 place-items-center rounded-xl bg-red-500 text-white">
                                <UIcon name="i-heroicons-bolt-20-solid" class="h-6 w-6" aria-hidden="true" />
                            </div>
                            <p class="text-base font-semibold" :class="[isDark ? 'text-white' : 'text-zinc-900']">مباشر</p>
                        </div>
                        <UIcon
                            name="i-heroicons-arrow-left-20-solid"
                            class="h-5 w-5 text-zinc-400 transition-colors group-hover:text-red-400"
                            aria-hidden="true"
                        />
                    </NuxtLink>

                    <NuxtLink to="/championships"
                        class="group flex items-center justify-between rounded-2xl border p-4 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md"
                        :class="[isDark ? 'border-zinc-800 bg-black/35 hover:border-red-500/20' : 'border-zinc-200 bg-white/75 hover:border-red-400/30']"
                    >
                        <div class="flex items-center gap-3">
                            <div
                                class="grid h-11 w-11 place-items-center rounded-xl border"
                                :class="[isDark ? 'border-red-500/35 bg-black text-red-200' : 'border-red-200 bg-white text-red-700']"
                            >
                                <UIcon name="i-heroicons-trophy-20-solid" class="h-6 w-6" aria-hidden="true" />
                            </div>
                            <p class="text-base font-semibold" :class="[isDark ? 'text-white' : 'text-zinc-900']">البطولات</p>
                        </div>
                        <UIcon
                            name="i-heroicons-arrow-left-20-solid"
                            class="h-5 w-5 text-zinc-400 transition-colors group-hover:text-red-400"
                            aria-hidden="true"
                        />
                    </NuxtLink>

                    <NuxtLink to="#home-stats"
                        class="group flex items-center justify-between rounded-2xl border p-4 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md"
                        :class="[isDark ? 'border-zinc-800 bg-black/35 hover:border-red-500/20' : 'border-zinc-200 bg-white/75 hover:border-red-400/30']"
                    >
                        <div class="flex items-center gap-3">
                            <div
                                class="grid h-11 w-11 place-items-center rounded-xl"
                                :class="[isDark ? 'bg-red-500/15 text-red-200' : 'bg-red-50 text-red-700']"
                            >
                                <UIcon name="i-heroicons-chart-bar-20-solid" class="h-6 w-6" aria-hidden="true" />
                            </div>
                            <p class="text-base font-semibold" :class="[isDark ? 'text-white' : 'text-zinc-900']">إحصائيات</p>
                        </div>
                        <UIcon
                            name="i-heroicons-arrow-left-20-solid"
                            class="h-5 w-5 text-zinc-400 transition-colors group-hover:text-red-400"
                            aria-hidden="true"
                        />
                    </NuxtLink>

                    <a href="https://www.youtube.com/@zat_baloot" target="_blank" rel="noopener noreferrer"
                        class="group flex items-center justify-between rounded-2xl border p-4 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md"
                        :class="[isDark ? 'border-zinc-800 bg-black/35 hover:border-red-500/20' : 'border-zinc-200 bg-white/75 hover:border-red-400/30']"
                    >
                        <div class="flex items-center gap-3">
                            <div class="grid h-11 w-11 place-items-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
                                <UIcon name="i-heroicons-play-circle-20-solid" class="h-6 w-6" aria-hidden="true" />
                            </div>
                            <p class="text-base font-semibold" :class="[isDark ? 'text-white' : 'text-zinc-900']">YouTube</p>
                        </div>
                        <UIcon
                            name="i-heroicons-arrow-top-right-on-square-20-solid"
                            class="h-5 w-5 text-zinc-400 transition-colors group-hover:text-red-400"
                            aria-hidden="true"
                        />
                    </a>
                </div>
            </div>
        </section>

        <!-- Pillars -->
        <section ref="pillarsRef" class="relative border-t border-zinc-200/70 px-4 py-10 dark:border-zinc-800 md:px-10"
            aria-labelledby="landing-pillars-title">
            <h2 id="landing-pillars-title" class="sr-only">ماذا يقدم زات</h2>
            <div
                :class="[revealClass(revealPillars), 'grid gap-6 transition-all duration-700 ease-out sm:grid-cols-2 lg:grid-cols-3 motion-reduce:opacity-100 motion-reduce:translate-y-0']">
                <article
                    class="rounded-xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/40">
                    <div
                        class="mb-3 flex h-11 w-11 items-center justify-center rounded-lg"
                        :class="[isDark ? 'bg-red-500/15 text-red-200' : 'bg-red-50 text-red-700']"
                    >
                        <UIcon name="i-heroicons-video-camera-20-solid" class="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 class="text-lg font-semibold text-zinc-900 dark:text-white">بث وبطولات في المملكة</h3>
                    <p class="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        تغطية وبُنى تحتية للبطولات بهدف إبراز لعبة البلوت في الساحة الخليجية والعربية.
                    </p>
                </article>
                <article
                    class="rounded-xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/40">
                    <div
                        class="mb-3 flex h-11 w-11 items-center justify-center rounded-lg"
                        :class="[isDark ? 'bg-red-500/15 text-red-200' : 'bg-red-50 text-red-700']"
                    >
                        <UIcon name="i-heroicons-trophy-20-solid" class="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 class="text-lg font-semibold text-zinc-900 dark:text-white">لاعبون محترفون وجوائز قوية</h3>
                    <p class="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        موسم تنافسي مع نخبة اللاعبين؛ وسبق أن تجاوزت قيمة الجوائز 200,000 ريال سعودي بحسب بطولات زات.
                    </p>
                </article>
                <article
                    class="rounded-xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/40 sm:col-span-2 lg:col-span-1">
                    <div
                        class="mb-3 flex h-11 w-11 items-center justify-center rounded-lg"
                        :class="[isDark ? 'bg-red-500/15 text-red-200' : 'bg-red-50 text-red-700']"
                    >
                        <UIcon name="i-heroicons-megaphone-20-solid" class="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 class="text-lg font-semibold text-zinc-900 dark:text-white">قنوات يوتيوب للمحتوى اليومي</h3>
                    <p class="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        اشترك في <strong>@zat_baloot</strong> و<strong>ZAT PLUS</strong> لمقاطع المباريات، اللحظات
                        الحاسمة، ومواد خلف الكواليس.
                    </p>
                </article>
            </div>
            <div class="mt-8 flex flex-wrap justify-center gap-3">
                <UButton to="/championships" variant="soft" color="primary" size="lg" aria-label="عرض البطولات">
                    ابدأ من البطولات
                </UButton>
                <UButton to="#home-matches" variant="outline" color="primary" size="lg" aria-label="الانتقال إلى المباريات">
                    شاهد المباريات
                </UButton>
            </div>
        </section>

        <!-- YouTube strip -->
        <section ref="youtubeRef"
            class="relative border-t border-zinc-200/70 bg-zinc-50/80 px-4 py-10 dark:border-zinc-800 dark:bg-zinc-950/50 md:px-10"
            aria-labelledby="landing-youtube-title">
            <h2 id="landing-youtube-title"
                class="text-center text-2xl font-bold text-zinc-900 dark:text-white transition-all duration-700 ease-out motion-reduce:opacity-100"
                :class="revealClass(revealYoutube)">
                قنوات YouTube زات
            </h2>
            <p class="mx-auto mt-2 max-w-2xl text-center text-zinc-600 dark:text-zinc-400 transition-all duration-700 ease-out motion-reduce:opacity-100"
                :class="revealClass(revealYoutube)">
                محتوى بالعربية حول بلوت السعودية: متابعة مباشرة، إعادات، وبرامج تلفزيونية الرابطة ببطولات زات.
            </p>
            <div
                :class="['mt-8 grid gap-6 transition-all duration-700 ease-out md:grid-cols-2 motion-reduce:translate-y-0 motion-reduce:opacity-100', revealClass(revealYoutube)]">
                <div
                    class="flex flex-col justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-black">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-wider" :class="[isDark ? 'text-red-200/85' : 'text-red-700/85']">
                            القناة الرئيسية
                        </p>
                        <h3 class="mt-1 text-xl font-semibold text-zinc-900 dark:text-white">@zat_baloot</h3>
                        <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            أبرز البثوث والفعاليات والبطولات تحت علامة زات بلوت.
                        </p>
                    </div>
                    <UButton block size="lg" color="primary" target="_blank" rel="noopener noreferrer"
                        icon="i-heroicons-arrow-top-right-on-square-20-solid"
                        to="https://www.youtube.com/@zat_baloot" aria-label="فتح قناة زات بلوت على يوتيوب">
                        الانتقال إلى القناة
                    </UButton>
                </div>
                <div
                    class="flex flex-col justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-black">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-wider" :class="[isDark ? 'text-red-200/85' : 'text-red-700/85']">
                            زات بلس
                        </p>
                        <h3 class="mt-1 text-xl font-semibold text-zinc-900 dark:text-white">@ZAT_PLUS</h3>
                        <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            محتوى إضافي، لحظات مختارة، وتجارب متابعة للجمهور.
                        </p>
                    </div>
                    <UButton block size="lg" variant="outline" color="primary" target="_blank"
                        rel="noopener noreferrer" icon="i-heroicons-arrow-top-right-on-square-20-solid"
                        to="https://www.youtube.com/@ZAT_PLUS" aria-label="فتح قناة زات بلس على يوتيوب">
                        الانتقال إلى القناة
                    </UButton>
                </div>
            </div>
            <div class="mt-8 flex justify-center">
                <UButton to="/championships" variant="soft" color="primary" size="lg"
                    aria-label="عرض البطولات">
                    تصفّح البطولات
                </UButton>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.preference === 'dark')

const websiteUrl = useRuntimeConfig().public.websiteUrl as string | undefined
const storeUrl = computed(() => {
    try {
        const base = websiteUrl || 'https://zatbaloot.com/'
        return new URL('store', base).toString()
    } catch {
        return 'https://zatbaloot.com/store'
    }
})

const pillarsRef = ref<HTMLElement | null>(null)
const youtubeRef = ref<HTMLElement | null>(null)

const pillarsVisible = ref(false)
const youtubeVisible = ref(false)

const reduceMotion = usePreferredReducedMotion()

useIntersectionObserver(
    pillarsRef,
    ([entry]) => {
        if (entry?.isIntersecting)
            pillarsVisible.value = true
    },
    { threshold: 0.12 }
)

useIntersectionObserver(
    youtubeRef,
    ([entry]) => {
        if (entry?.isIntersecting)
            youtubeVisible.value = true
    },
    { threshold: 0.08 }
)

const isClient = import.meta.client

const revealPillars = computed(
    () => !isClient || pillarsVisible.value || reduceMotion.value === 'reduce'
)
const revealYoutube = computed(
    () => !isClient || youtubeVisible.value || reduceMotion.value === 'reduce'
)

function revealClass(visible: boolean) {
    return visible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-6'
}
</script>
