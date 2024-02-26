<template>
    <div class="mx-auto bg-zinc-200 dark:bg-slate-700 rounded-md py-5">
        <swiper-container class="w-full h-full" :slides-per-view="itemsToShow" :keyboard="{ enabled: true }"
            :pagination="true" :mousewheel="true">
            <swiper-slide v-for="level, levelIndex in table" :key="levelIndex">
                <ChampionCupTreeLines :levelIndex="levelIndex" :levelsLength="level.length" />
                <ChampionCupMatch :match="match" :levelIndex="levelIndex" :isEven="index % 2 === 0"
                    v-for="match, index in level" />
            </swiper-slide>
        </swiper-container>
    </div>
</template>

<script setup lang="ts">
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'
import type { ICupMatchData } from "@/Models/ICupSummary"
import { breakpointsTailwind } from '@vueuse/core'
import 'vue3-carousel/dist/carousel.css'

const breakpoints = useBreakpoints(breakpointsTailwind)
const isSupported = useSupported(() => window)
const isMounted = useMounted()
const itemsToShow = computed(() => (isSupported.value && isMounted.value && breakpoints.greaterOrEqual('lg').value) ? 3 : 2)

defineProps({
    table: {
        required: true,
        type: Object as PropType<ICupMatchData[][]>
    }
});
const levelName = {
    16: 'دور ال 32',
    8: 'دور ال 16',
    4: 'دور ربع النهائي',
    2: 'دور نصف النهائي',
    1: 'النهائي'
}
</script>

<style scoped>
.carousel__slide {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
}
</style>