<template>
    <section
        v-if="trackLogos.length > 0"
        id="clients"
        class="relative w-full overflow-hidden py-6"
        aria-label="شركائنا"
    >
        <div class="relative z-10 flex flex-col items-center gap-6">
            <h2 class="w-full text-center text-[32px] font-bold leading-[56px] text-text-subtitle">
                شركائنا
            </h2>

            <div ref="viewportRef" class="partners-viewport w-full overflow-hidden" dir="ltr">
                <div
                    class="partners-marquee flex w-max items-center"
                    :style="{ animationDuration: `${durationSec}s` }"
                >
                    <div
                        ref="trackRef"
                        class="flex shrink-0 items-center gap-6 pe-6"
                    >
                        <div
                            v-for="logo in trackLogos"
                            :key="`a-${logo.key}`"
                            class="flex h-12 shrink-0 items-center justify-center"
                        >
                            <img
                                :src="logo.url"
                                alt="شريك"
                                class="h-12 w-auto max-h-12 object-contain brightness-0 dark:invert"
                                loading="eager"
                                draggable="false"
                            >
                        </div>
                    </div>
                    <div
                        class="flex shrink-0 items-center gap-6 pe-6"
                        aria-hidden="true"
                    >
                        <div
                            v-for="logo in trackLogos"
                            :key="`b-${logo.key}`"
                            class="flex h-12 shrink-0 items-center justify-center"
                        >
                            <img
                                :src="logo.url"
                                alt=""
                                class="h-12 w-auto max-h-12 object-contain brightness-0 dark:invert"
                                loading="eager"
                                draggable="false"
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const { data: images } = await useClientImages()

const viewportRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const durationSec = ref(35)

/**
 * Repeat logos until one track is wider than the viewport.
 * Prevents empty gaps when there are only a few partner images.
 */
const trackLogos = computed(() => {
    const list = images.value ?? []
    if (!list.length) return []

    const minCount = Math.max(list.length * 4, 20)
    const out: Array<{ key: string, id: string | number, url: string }> = []
    let i = 0
    while (out.length < minCount) {
        const img = list[i % list.length]!
        out.push({
            key: `${out.length}-${img.id}`,
            id: img.id,
            url: img.url,
        })
        i++
    }
    return out
})

function syncDuration() {
    const track = trackRef.value
    if (!track) return
    // ~40px/sec keeps motion steady regardless of logo count
    const width = track.scrollWidth
    durationSec.value = Math.max(20, Math.round(width / 40))
}

onMounted(async () => {
    await nextTick()
    syncDuration()
    window.addEventListener('resize', syncDuration, { passive: true })
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', syncDuration)
})

watch(trackLogos, async () => {
    await nextTick()
    syncDuration()
})
</script>

<style scoped>
.partners-viewport {
    mask-image: linear-gradient(
        to right,
        transparent 0%,
        #000 6%,
        #000 94%,
        transparent 100%
    );
    -webkit-mask-image: linear-gradient(
        to right,
        transparent 0%,
        #000 6%,
        #000 94%,
        transparent 100%
    );
}

.partners-marquee {
    animation-name: partners-scroll;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    will-change: transform;
}

.partners-marquee:hover {
    animation-play-state: paused;
}

@keyframes partners-scroll {
    from {
        transform: translate3d(0, 0, 0);
    }

    to {
        transform: translate3d(-50%, 0, 0);
    }
}

@media (prefers-reduced-motion: reduce) {
    .partners-marquee {
        animation: none;
    }
}
</style>
