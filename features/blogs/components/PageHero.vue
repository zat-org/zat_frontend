<template>
    <section
        class="w-full bg-[#F14950] bg-repeat py-8 sm:py-10"
        :style="{ backgroundImage: `url(${titlePattern})` }"
        :aria-label="title"
    >
        <div class="page-container flex justify-center">
            <h1 class="text-center font-zaatar text-4xl leading-tight text-white sm:text-5xl lg:text-[64px] lg:leading-normal">
                {{ title }}
            </h1>
        </div>
    </section>
</template>

<script setup lang="ts">
import titlePattern from '~/assets/images/blogs/news-hero-pattern.png'

withDefaults(defineProps<{
    title?: string
}>(), {
    title: 'جريدة زات',
})
</script>
