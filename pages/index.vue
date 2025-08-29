<template>
    <main class="container mx-auto my-5">
        <!-- Hero Section -->
        <header class="mb-3 w-full relative" role="banner">
            <img src="/assets/images/adv-banner.jpg" 
                 class="rounded-lg w-full object-cover h-48 object-top" 
                 alt="زات بلوت - صورة ترحيبية"
                 role="img" />
            <h1 class="absolute hidden lg:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-white lg:text-2xl">
                لا تفوتك ورق بلوت زات
            </h1>
            <div class="inline absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <UButton size="lg" class="animate-bounce" target="_blank" to="https://zatbaloot.store/"
                    aria-label="اطلب ورق بلوت زات الآن">
                    اطلبها الآن
                </UButton>
            </div>
        </header>

        <!-- Slider Section -->
        <section aria-label="عرض شرائح زات" class="mb-8">
            <HomeSlider />
        </section>

        <!-- Matches Section -->
        <section aria-label="المباريات" class="flex justify-around flex-col md:flex-row md:mb-10">
            <HomeMatches class="w-full" />
        </section>

        <!-- News Section -->
        <section aria-label="أخبار زات">
            <HomeBlogs />
        </section>

        <!-- Join Champions Section -->
        <section aria-label="انضم للبطولات">
            <HomeJoinChampions />
        </section>

        <!-- Statistics and Players Section -->
        <section dir="ltr"
            class="pb-8 text-slate-800 dark:text-white text-center -mb-5 dark:bg-slate-800 overflow-hidden">
            <ClientOnly>
                <div :class="[colorMode.preference === 'dark' ? 'stars' : 'stars-light']" 
                     aria-hidden="true"></div>
                <div :class="[colorMode.preference === 'dark' ? 'stars2' : 'stars-light2']" 
                     aria-hidden="true"></div>
                <div :class="[colorMode.preference === 'dark' ? 'stars3' : 'stars-light3']" 
                     aria-hidden="true"></div>
            </ClientOnly>

            <!-- Statistics Subsection -->
            <article aria-label="إحصائيات زات">
                <HomeOurStatistics />
            </article>

            <hr class="my-20" role="separator">

            <!-- Players Subsection -->
            <article aria-label="لاعبو زات">
                <HomePlayersSection />
            </article>

            <hr class="my-20" role="separator">

            <!-- Clients Subsection -->
            <article aria-label="عملاء زات">
                <HomeClientsSection />
            </article>
        </section>
    </main>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
const colorMode = useColorMode();

useHead({
    title: 'زات - الموقع الرائد لبطولات البلوت في المملكة',
    meta: [
        {
            name: 'description',
            content: 'زات - المنصة الرائدة لبطولات البلوت في المملكة العربية السعودية. تابع آخر البطولات، الأخبار، النتائج المباشرة، والإحصائيات.'
        },
        {
            property: 'og:title',
            content: 'زات - الموقع الرائد لبطولات البلوت في المملكة'
        },
        {
            property: 'og:description',
            content: 'زات - المنصة الرائدة لبطولات البلوت في المملكة العربية السعودية. تابع آخر البطولات، الأخبار، النتائج المباشرة، والإحصائيات.'
        },
        {
            property: 'og:image',
            content: '/assets/images/adv-banner.jpg'
        }
    ]
});
</script>

<style scoped></style>