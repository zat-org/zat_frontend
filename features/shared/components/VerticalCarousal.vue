<template>
    <div class="w-full h-96 overflow-hidden">
        <swiper-container ref="swiperElm" class="w-full h-full" :centerInsufficientSlides="true"
            :slides-per-view="slidesPerView" :direction="'vertical'" :space-between="spaceBetween"
            :keyboard="{ enabled: true }" :pagination="true" :mousewheel="true">
            <slot name="default"></slot>
        </swiper-container>
    </div>
</template> 
  
<script setup lang="ts">
import Swiper from "swiper";
const props = defineProps<{
    startAtIndex: number,
}>()
interface SwiperElement extends HTMLElement {
    swiper: Swiper
}
const swiperElm = ref<SwiperElement | null>(null);
const slidesPerView = ref(1);
const spaceBetween = ref(2)
onMounted(() => {
    // Wait for Swiper to be fully initialized
    nextTick(() => {
        if (swiperElm.value?.swiper) {
            swiperElm.value.swiper.slideTo(props.startAtIndex)
        } else {
            // If Swiper is not ready, wait a bit more
            setTimeout(() => {
                swiperElm.value?.swiper?.slideTo(props.startAtIndex)
            }, 100)
        }
    })
})
const isSupported = useSupported(() => window)

// Watch for changes in startAtIndex prop
watch(() => props.startAtIndex, (newIndex) => {
    if (swiperElm.value?.swiper) {
        swiperElm.value.swiper.slideTo(newIndex)
    }
})

const { height } = useElementBounding(swiperElm)
watch(height, () => {
    let containerHeight = swiperElm.value?.scrollHeight;
    let children = swiperElm.value?.getElementsByClassName("swiper-slide-li");
    if (isSupported && containerHeight && children && children.length > 0) {
        let numberOfSlides = Math.floor(containerHeight / (children[0].scrollHeight + spaceBetween.value));
        slidesPerView.value = numberOfSlides
    }
}, { immediate: true })
</script>

<style scoped></style>

