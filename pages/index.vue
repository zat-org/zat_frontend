<template>
    <main class="w-full">
        <HomeHero />

        <HomeMatchStats />

        <HomeRecentTournaments />

        <!-- Upcoming championships carousel -->
        <div class="page-container">
            <HomeSlider />
        </div>

        <HomeMerch />

        <HomePlayersSection />

        <HomeStatsCards />

        <HomeClientsSection />

        <!-- <div class="page-container">
            <HomeJoinChampions />
        </div> -->
    </main>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'

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
})
</script>
