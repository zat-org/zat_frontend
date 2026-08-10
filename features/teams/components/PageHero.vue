<template>
    <section
        class="w-full bg-[#F14950] bg-repeat py-6"
        :style="{ backgroundImage: `url(${titlePattern})` }"
        aria-label="فرق زات"
    >
        <div class="page-container flex justify-center">
            <img
                :src="titleBanner"
                alt="فرق"
                class="h-auto w-full max-w-5xl object-contain"
            >
        </div>
    </section>
</template>

<script setup lang="ts">
import titlePattern from '~/assets/images/teams/teams-title-pattern.png'
import titleBanner from '~/assets/images/teams/teams-title-banner.svg'
</script>
