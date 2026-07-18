<template>
    <NuxtLink
        :to="config.to"
        class="championship-type-card group relative z-0 block h-[200px] w-[148px] shrink-0 overflow-hidden rounded-zat-sm transition-[z-index] duration-300 hover:z-10 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zat-500 focus-visible:ring-offset-2 md:h-[230px] md:w-[180px] lg:h-[262px] lg:w-[237px]"
        :class="active ? 'ring-2 ring-zat-500 ring-offset-2' : ''"
        :aria-label="`${config.title} — ${config.subtitle}`"
        :aria-current="active ? 'page' : undefined"
        @mouseenter="onHoverStart"
        @mouseleave="onHoverEnd"
        @focus="onHoverStart"
        @blur="onHoverEnd"
    >
        <div ref="cardBoxRef" class="absolute inset-0">
            <!-- Default: red trapezoid banner -->
            <div
                class="pointer-events-none absolute inset-x-0 top-[6%] bottom-[15%]"
                aria-hidden="true"
            >
                <img
                    :src="CHAMPIONSHIP_CARD_SHARED.bg"
                    alt=""
                    class="absolute inset-0 size-full max-w-none object-fill"
                >
            </div>

            <!-- Default: watermark -->
            <div
                class="pointer-events-none absolute left-1/2 top-[26%] z-1 w-[116%] max-w-none -translate-x-1/2 aspect-276/118 md:top-[60px] md:w-[220px] lg:top-[70px] lg:w-[276px]"
                aria-hidden="true"
            >
                <img
                    :src="CHAMPIONSHIP_CARD_SHARED.watermark"
                    alt=""
                    class="size-full object-contain"
                >
            </div>

            <!-- Default: emblem -->
            <div
                class="pointer-events-none absolute left-1/2 top-0 z-10 flex h-[120px] w-[96px] -translate-x-1/2 items-start justify-center pt-1 drop-shadow-[0_2px_8px_rgba(22,19,19,0.25)] md:h-[148px] md:w-[116px] lg:h-[176px] lg:w-[138px]"
                aria-hidden="true"
            >
                <img
                    :src="config.emblem"
                    alt=""
                    class="h-[72%] w-auto max-w-[88%] object-contain dark:invert"
                >
            </div>

            <!-- Default: calligraphic title -->
            <div
                class="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2"
                :style="titleStyle"
                aria-hidden="true"
            >
                <img
                    :src="config.titleImage"
                    alt=""
                    class="h-auto w-full object-contain dark:invert"
                >
            </div>

            <!-- Default: subtitle -->
            <p
                class="absolute inset-x-0 bottom-2 z-10 text-center text-sm leading-7 text-text-body sm:bottom-3 sm:text-base"
            >
                {{ config.subtitle }}
            </p>

            <!-- Default: thin CTA peek -->
            <div
                class="pointer-events-none translate-y-[100px] absolute inset-x-0 bottom-0 z-10 h-1 bg-[#f14950]"
                aria-hidden="true"
            />
        </div>

        <!-- Hover: full red CTA panel slides up -->
        <div
            class="championship-type-card__cta pointer-events-none absolute inset-0 z-30 overflow-hidden bg-[#f14950] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-[110%] group-hover:translate-y-0 group-focus-visible:translate-y-0"
            aria-hidden="true"
        >
            <div
                class="absolute top-1/2 left-[-5%] flex h-[105%] w-[50%] -translate-y-1/2 items-center justify-center"
            >
                <img
                    :src="CHAMPIONSHIP_CARD_SHARED.watermark"
                    alt=""
                    class="h-[45%] w-[210%] max-w-none rotate-90 object-contain opacity-90"
                >
            </div>

            <span
                class="absolute top-1/2 left-1/2 flex h-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-[#231f1f] px-4 text-center text-lg font-bold text-white sm:h-12 lg:h-14"
            >
                عرض الكل
            </span>
        </div>

        <!-- Shine sweep (same as MerchProductCard) -->
        <div
            v-if="!reduceMotion"
            class="pointer-events-none absolute inset-0 z-40 overflow-hidden"
            aria-hidden="true"
        >
            <div
                ref="shineRef"
                class="absolute inset-x-0 bottom-0 h-[22%] origin-center scale-x-200 translate-y-[100px] translate-x-[40%] -rotate-10 bg-white opacity-80"
            />
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import { animate } from 'motion-v'
import type { ChampionshipTypeConfig } from '~/utils/championshipTypes'
import { CHAMPIONSHIP_CARD_SHARED } from '~/utils/championshipTypes'

const props = defineProps<{
    config: ChampionshipTypeConfig
    active?: boolean
}>()

const preferredReducedMotion = usePreferredReducedMotion()
const reduceMotion = computed(() => preferredReducedMotion.value === 'reduce')

const cardBoxRef = ref<HTMLElement | null>(null)
const shineRef = ref<HTMLElement | null>(null)

let shineControls: { stop: () => void } | null = null

const titleStyle = computed(() => ({
    top: `${(props.config.titleTop / 262) * 100}%`,
    width: `${(props.config.titleWidth / 237) * 100}%`,
}))

async function onHoverStart() {
    if (reduceMotion.value) {
        return
    }
    await nextTick()

    const shine = shineRef.value
    const box = cardBoxRef.value
    if (!shine || !box) {
        return
    }

    shineControls?.stop()
    const travel = box.clientHeight + shine.clientHeight + 100
    shineControls = animate(
        shine,
        { y: [shine.clientHeight, -travel] },
        { duration: 0.7, ease: 'easeOut' },
    )
}

function onHoverEnd() {
    if (reduceMotion.value) {
        return
    }
    shineControls?.stop()

    const shine = shineRef.value
    const box = cardBoxRef.value
    if (!shine || !box) {
        return
    }

    const travel = box.clientHeight + shine.clientHeight + 100
    shineControls = animate(
        shine,
        { y: [-travel, shine.clientHeight] },
        { duration: 0.5, ease: 'easeOut' },
    )
}

onBeforeUnmount(() => {
    shineControls?.stop()
})
</script>

<style scoped>
@media (prefers-reduced-motion: reduce) {
    .championship-type-card__cta {
        transition: opacity 0.2s ease;
        transform: none;
        opacity: 0;
    }

    .championship-type-card:hover .championship-type-card__cta,
    .championship-type-card:focus-visible .championship-type-card__cta {
        opacity: 1;
    }
}
</style>
