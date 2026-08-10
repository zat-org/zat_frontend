<template>
    <article
        class="relative w-full max-w-[410px] shrink-0"
        @mouseenter="onHoverStart"
        @mouseleave="onHoverEnd"
    >
        <div class="relative h-[276px] w-full">
            <div
                class="absolute inset-x-0 top-[84px] h-48 overflow-hidden rounded-t-zat-md border border-b-0 border-surface-tone2 bg-surface-raised"
            >
                <img :src="productCardBg" alt="" class="size-full object-cover opacity-50" aria-hidden="true">
            </div>

            <div class="absolute inset-x-0 top-0 z-10 flex h-[276px] items-center justify-center overflow-visible">
                <motion.div
                    class="relative inline-flex h-[243px] max-w-[90%] items-center justify-center origin-center"
                    :animate="{ scale: reduceMotion || !isHovered ? 1 : 1.15 }"
                    :transition="{ type: 'spring', stiffness: 280, damping: 22 }"
                >
                    <!-- Image + shine share the same box so shine stays on the product -->
                    <div ref="imageBoxRef" class="relative h-full w-auto">
                        <img
                            :src="productImage"
                            :alt="title"
                            class="relative z-10 h-full w-auto max-w-full object-contain drop-shadow-zat"
                        >

                        <div
                            v-if="!reduceMotion"
                            class="pointer-events-none absolute inset-0 z-20  overflow-hidden "
                            aria-hidden="true"
                        >
                            <div
                                ref="shineRef"
                                class="absolute inset-x-0 bottom-0 h-[22%] scale-x-200  bg-white opacity-80 -rotate-45 translate-x-[70%] translate-y-[10px] origin-center"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>

        <div class="relative z-0 flex flex-col gap-2 rounded-b-zat-md border border-t-0 border-surface-tone2 bg-surface-raised p-4">
            <div class="flex items-center justify-between gap-2">
                <h3 class="min-w-0  truncate text-end text-2xl font-bold leading-10 text-text-heading">
                    {{ title }}
                </h3>
                <span
                    v-if="badge"
                    class="shrink-0 rounded-zat-sm bg-[#fef0d7] px-2 py-1 text-base font-semibold text-[#c9912a]"
                >
                    {{ badge }}
                </span>
            </div>

            <p class="flex items-center justify-start gap-1 text-xl font-semibold text-text-body">
                <span class="font-cairo">{{ price }}</span>
                <UIcon name="zat:riyal" class="size-6 text-text-body" />
            </p>

            <div class="flex items-center gap-4">
                <UButton
                    :to="storeUrl"
                    target="_blank"
                    variant="outline"
                    color="neutral"
                    class="h-14 flex-1 border-2 border-text-body text-xl font-bold text-text-body ring-0"
                >
                    <span class="flex w-full items-center justify-center gap-1">
                        <UIcon name="zat:bag" class="size-6" />
                        <span>أضف إلى السلة</span>
                    </span>
                </UButton>
                <UButton
                    :to="storeUrl"
                    target="_blank"
                    variant="outline"
                    color="neutral"
                    square
                    class="flex h-14 w-14 items-center justify-center border-2 border-text-body text-xl font-bold text-text-body ring-0"
                    aria-label="أضف إلى المفضلة"
                >
                    <UIcon name="zat:heart" class="size-6" />
                </UButton>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import { animate, motion } from 'motion-v'
import productCardBg from '~/assets/images/merch/product-card-bg.jpg'
import productImage from '~/assets/images/merch/product-cards.png'

withDefaults(defineProps<{
    title?: string
    price?: string
    badge?: string
    storeUrl?: string
}>(), {
    title: '3 ورق بلوت زات',
    price: '88.00',
    badge: 'الاكثر طلباً',
    storeUrl: 'https://zatbaloot.store/ar/zb-blt-3p/p489108162',
})

const preferredReducedMotion = usePreferredReducedMotion()
const reduceMotion = computed(() => preferredReducedMotion.value === 'reduce')

const isHovered = ref(false)
const imageBoxRef = ref<HTMLElement | null>(null)
const shineRef = ref<HTMLElement | null>(null)

let shineControls: { stop: () => void } | null = null

async function onHoverStart() {
    if (reduceMotion.value) {
        return
    }
    isHovered.value = true
    await nextTick()

    const shine = shineRef.value
    const box = imageBoxRef.value
    if (!shine || !box) {
        return
    }

    shineControls?.stop()
    // Travel from just below the image to above it (bottom → top)
    const travel = box.clientHeight + shine.clientHeight+100
    shineControls = animate(
        shine,
        { y: [shine.clientHeight, -travel] },
        { duration: 0.7, ease: 'easeOut' },
    )
}

function onHoverEnd() {
    isHovered.value = false
    shineControls?.stop()
    const shine = shineRef.value
    const box = imageBoxRef.value
    if (!shine || !box) {
        return
    }
    const travel = box.clientHeight + shine.clientHeight+100
    if (shineRef.value) {
        shineControls = animate(shineRef.value, { y: [ -travel,shine.clientHeight] }, { duration: 0.5 ,ease: 'easeOut' })
    }
}

onBeforeUnmount(() => {
    shineControls?.stop()
})
</script>
