<template>
    <div class="text-gray-900 dark:text-slate-50 body-font container mx-auto my-5 ">
        <HomeSlider />
        <div class="flex justify-around flex-col md:flex-row md:mb-10 ">
            <HomeCalender class="w-full md:w-5/12 mb-16 md:mb-0" />
            <HomeMatches class="w-full md:w-7/12" />
        </div>
        <div class="flex justify-center">
            <SectionHeader title="خارطة البطولات" icon="i-heroicons-map" />
        </div>

        <img src="https://storage.googleapis.com/qydha_bucket/zatbaloot_assets/btolat_zat.jpg" class="mb-5 rounded-xl" />
        <HomeBlogs />
        <HomeJoinChampions />
        <div dir="ltr" class=" pb-8 text-slate-800 dark:text-white text-center -mb-5 dark:bg-slate-800  overflow-hidden">

            <div :class="[colorMode.preference === 'dark' ? 'stars' : 'stars-light']"></div>
            <div :class="[colorMode.preference === 'dark' ? 'stars2' : 'stars-light2']"></div>
            <div :class="[colorMode.preference === 'dark' ? 'stars3' : 'stars-light3']"></div>

            <HomeOurStatistics />
            <hr class="my-20">
            <HomeClientsSection />
        </div>
    </div>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
const colorMode = useColorMode();
useHead({
    title: `زات لبطولات البلوت الاحترافية`,
})
</script>

<style scoped></style>