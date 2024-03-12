<template>
    <div ref="carousalWrapper" class="mx-auto bg-zinc-200 dark:bg-slate-700 rounded-md py-5">
        <Carousel dir="rtl" :breakpoints="breakpoints">
            <Slide v-for="level, levelIndex in table" :key="levelIndex">
                <ChampionCupTreeLines :levelIndex="levelIndex" :levelsLength="level.length" />
                <ChampionCupMatch :isVisible="isVisibleArr[levelIndex] ?? false" :match="match" :levelIndex="levelIndex"
                    :isEven="index % 2 === 0" v-for="match, index in level" />
            </Slide>
            <template #addons>
                <Pagination />
                <Navigation />
            </template>
        </Carousel>
    </div>
</template>

<script setup lang="ts">
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'
import type { ICupMatchData } from "@/Models/ICupSummary"
import 'vue3-carousel/dist/carousel.css'
const props = defineProps<{ table: ICupMatchData[][] }>();

const breakpoints = {

    0: {
        itemsToShow: 2,
        snapAlign: 'start',
    },
    700: {
        itemsToShow: 3,
        snapAlign: 'center',
    },
}
const carousalWrapper = ref<HTMLElement | null>(null);
const isVisibleArr = ref<boolean[]>([])
let observersArr: MutationObserver[] = []


const classListWatcher = (slides: HTMLLIElement[]) => {
    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        isVisibleArr.value.push(Array.from(slide.classList).includes('carousel__slide--visible'));

        const mutationObserver = new MutationObserver(() => {
            const classList = Array.from(slide.classList);
            isVisibleArr.value[i] = classList.includes('carousel__slide--visible');
        });

        mutationObserver.observe(slide, { attributes: true, attributeFilter: ['class'] });
        observersArr.push(mutationObserver);
    }
};

onMounted(() => {
    classListWatcher(Array.prototype.slice.call(carousalWrapper.value?.getElementsByTagName("li") ?? []));
});
onBeforeUnmount(() => {
    observersArr.forEach((observer) => observer.disconnect());
})
</script>

<style scoped>
.carousel__slide {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
}
</style>