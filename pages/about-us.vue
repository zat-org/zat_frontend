<template>
    <div class="flex w-full flex-col bg-surface-base">
        <section
            class="w-full bg-surface-secondary bg-repeat py-4 sm:py-6"
            :style="{ backgroundImage: `url(${darkHeroPattern})` }"
            aria-label="الشروط والأحكام"
        >
            <div class="page-container flex justify-center">
                <h1 class="text-center font-zaatar text-4xl leading-tight text-white sm:text-5xl lg:text-[48px] lg:leading-normal">
                    الشروط والأحكام
                </h1>
            </div>
        </section>

        <section class="w-full bg-surface-base py-6" aria-label="من نحن" dir="rtl">
            <div class="page-container flex flex-col gap-6 lg:flex-row lg:items-start">
                <nav
                    class="hidden w-64 shrink-0 border-e border-surface-tone2 px-2 lg:block"
                    aria-label="أقسام الصفحة"
                >
                    <ul class="sticky top-24 flex flex-col gap-4 text-right">
                        <li v-for="item in navItems" :key="item.id">
                            <a
                                :href="`#${item.id}`"
                                class="block text-base leading-7 text-text-body transition-opacity hover:opacity-70"
                                :class="activeId === item.id ? 'font-bold' : 'font-normal'"
                                @click.prevent="scrollToSection(item.id)"
                            >
                                {{ item.label }}
                            </a>
                        </li>
                    </ul>
                </nav>

                <div class="min-w-0 flex-1">
                    <header id="intro" class="scroll-mt-24">
                        <div class="mb-4 flex flex-col gap-1">
                            <h2 class="text-2xl font-bold leading-12 text-text-subtitle">
                                من نحن
                            </h2>
                        </div>
                        <h3 class="mb-3 text-xl font-bold leading-9 text-text-heading sm:text-2xl">
                            قناة متخصصة ببث وتنظيم بطولات البلوت في المملكة العربية السعودية
                        </h3>
                        <p class="mb-4 text-xl leading-9 text-text-body">
                            تهدف إلى نشر محتوى لعبة البلوت بشكل واسع في جميع أنحاء الوطن العربي ورفع التنافسية الى مستوى جديد في
                            عالم اللعبة الشهيرة، تضم القناة عدد من اللاعبين المحترفين الذين يتنافسون لحصد الجوائز والألقاب الموسمية
                            على مدار السنة وقد بلغ عدد الجوائز حتى الآن ما يتجاوز 200,000 ريال سعودي.
                        </p>
                        <!-- <NuxtImg
                            class="mb-4 w-full max-w-xl rounded-lg object-cover object-center"
                            alt="زات"
                            src="https://storage.googleapis.com/qydha_bucket/zatbaloot_assets/zat_hero.png"
                        /> -->
                    </header>

                    <article id="vision" class="mb-4 scroll-mt-24">
                        <h3 class="mb-2 text-xl font-bold leading-10 text-text-heading">
                            الرؤية
                        </h3>
                        <p class="text-xl leading-9 text-text-heading">
                            "أن تكون زات مظلة مجتمع البلوت في العالم، عبر قيادة الابتكار وصناعة تجارب تجمع بين الترفيه والتقنية"
                        </p>
                    </article>

                    <article id="mission" class="mb-4 scroll-mt-24">
                        <h3 class="mb-2 text-xl font-bold leading-10 text-text-heading">
                            الرسالة
                        </h3>
                        <p class="text-xl leading-9 text-text-heading">
                            تقديم تجربة بلوت متكاملة تجمع بين المنتجات المبتكرة، الحلول التقنية، بإدارة كفاءات متميزة تعزز متعة اللعب وترفع جودة التجربة للمجتمع المحلي والعالمي
                        </p>
                    </article>

                    <article id="values" class="mb-4 scroll-mt-24">
                        <h3 class="mb-2 text-xl font-bold leading-10 text-text-heading">
                            القيم
                        </h3>
                        <p class="mb-4 text-xl leading-9 text-text-caption">
                            المبادئ التي نؤمن بها ونسير عليها
                        </p>

                        <div
                            v-for="value in values"
                            :key="value.title"
                            class="mb-4"
                        >
                            <div class="mb-1 flex flex-wrap items-baseline gap-2">
                                <h4 class="text-xl font-bold leading-10 text-text-heading">
                                    {{ value.title }}
                                </h4>
                                <span class="text-sm text-text-caption">{{ value.english }}</span>
                            </div>
                            <p class="text-xl leading-9 text-text-heading">
                                {{ value.description }}
                            </p>
                        </div>
                    </article>

                    <div id="contact" class="mb-6 scroll-mt-24">
                        <NuxtLink
                            to="/contact-us"
                            class="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-surface-secondary px-4 text-xl font-bold text-white transition-opacity hover:opacity-90"
                        >
                            <UIcon name="i-heroicons-chat-bubble-oval-left-ellipsis" class="size-6" />
                            تواصل معنا
                        </NuxtLink>
                    </div>

                    <div class="flex flex-wrap items-center justify-end gap-6">
                        <div class="flex items-center gap-2 text-text-subtitle">
                            <img :src="locationIcon" alt="" class="size-7" aria-hidden="true">
                            <div class="flex flex-col items-end">
                                <span class="text-xs font-semibold leading-6">موقعنا</span>
                                <span class="text-base font-semibold leading-7">الرياض، السعودية</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 text-text-subtitle">
                            <img :src="smsIcon" alt="" class="size-7" aria-hidden="true">
                            <div class="flex flex-col items-end">
                                <span class="text-xs font-semibold leading-6">بريدنا الالكتروني</span>
                                <ULink
                                    to="mailto:info@zatbaloot.com"
                                    class="text-base font-semibold leading-7 text-text-subtitle hover:text-text-action"
                                >
                                    info@zatbaloot.com
                                </ULink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import darkHeroPattern from '~/assets/images/shared/dark-hero-pattern.png'
import locationIcon from '~/assets/images/contact/icon-location.svg'
import smsIcon from '~/assets/images/contact/icon-sms.svg'

useHead({
    title: 'زات - من نحن',
})
defineWebPage({
    '@type': 'AboutPage',
    name: ' من نحن',
    description: 'للمزيد من المعلومات عن زات - قناة متخصصة ببث وتنظيم بطولات البلوت في المملكة العربية السعودية',
})

const navItems = [
    { id: 'intro', label: 'من نحن' },
    { id: 'vision', label: 'الرؤية' },
    { id: 'mission', label: 'الرسالة' },
    { id: 'values', label: 'القيم' },
    { id: 'contact', label: 'تواصل معنا' },
]

const values = [
    {
        title: 'الشغف',
        english: 'Passion',
        description: 'دافعنا الرئيسي هو حب اللعبة والمجتمع، مما يحفزنا على تقديم أفضل تجربة دائمًا.',
    },
    {
        title: 'الابتكار',
        english: 'Innovation',
        description: 'نسعى لتجربة جديدة وفريدة تجمع بين التقنية والإبداع، ونبتكر حلولًا تجعل مجتمع البلوت أكثر تميزًا.',
    },
    {
        title: 'الأصالة',
        english: 'Authenticity',
        description: 'نحافظ على هوية زات المميزة ونعكس الثقافة المحلية بأسلوب عالمي أصيل.',
    },
    {
        title: 'التجربة المتميزة',
        english: 'Excellence in Experience',
        description: 'نحرص على تقديم تجربة متكاملة وممتعة للمستخدمين، من جودة اللعب إلى التفاعل المجتمعي.',
    },
    {
        title: 'المتعة',
        english: 'Fun & Enjoyment',
        description: 'نخلق تجربة ممتعة ومسلية لجميع اللاعبين، تجعل كل تفاعل مع زات مليئًا بالبهجة والتشويق.',
    },
]

const activeId = ref(navItems[0]?.id ?? 'intro')
let sectionObserver: IntersectionObserver | undefined

onMounted(() => {
    sectionObserver = new IntersectionObserver((entries) => {
        const visible = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) {
            activeId.value = visible.target.id
        }
    }, {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.35, 0.6],
    })

    for (const item of navItems) {
        const el = document.getElementById(item.id)
        if (el) sectionObserver.observe(el)
    }
})

onBeforeUnmount(() => sectionObserver?.disconnect())
</script>
