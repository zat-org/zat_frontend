<template>
    <div
        ref="carouselWrapper"
        class="relative mx-auto w-[90%]"
        :class="wrapperClass"
        dir="rtl"
    >
        <Carousel dir="rtl" :breakpoints="activeBreakpoints">
            <Slide v-for="(level, levelIndex) in table" :key="levelIndex">
                <ChampionCupTreeLines
                    :level-index="levelIndex"
                    :levels-length="level.length"
                />
                <ChampionCupMatch
                    v-for="(match, index) in level"
                    :key="match.matchId"
                    :is-visible="isVisibleArr[levelIndex] ?? false"
                    :match="match"
                    :level-index="levelIndex"
                    :is-even="index % 2 === 0"
                    :round-label="roundLabel(levelIndex)"
                />
            </Slide>
            <template v-if="showAddons" #addons>
                <Pagination />
                <Navigation />
            </template>
        </Carousel>
    </div>
</template>

<script setup lang="ts">
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import type { ICupMatchData } from '@/Models/ICupSummary'
import 'vue3-carousel/dist/carousel.css'

const props = withDefaults(defineProps<{
    table: ICupMatchData[][]
    variant?: 'preview' | 'full'
}>(), {
    variant: 'full',
})

const previewBreakpoints = {
    0: {
        itemsToShow: 1,
        snapAlign: 'start' as const,
    },
}

const fullBreakpoints = {
    0: {
        itemsToShow: 1.1,
        snapAlign: 'start' as const,
    },
    640: {
        itemsToShow: 1.5,
        snapAlign: 'center' as const,
    },
    1024: {
        itemsToShow: 2.2,
        snapAlign: 'center' as const,
    },
    1280: {
        itemsToShow: 3,
        snapAlign: 'center' as const,
    },
}

const activeBreakpoints = computed(() =>
    props.variant === 'preview' ? previewBreakpoints : fullBreakpoints,
)

const showAddons = computed(() => props.variant === 'full')

const wrapperClass = computed(() =>
    props.variant === 'preview' ? 'h-full min-h-0' : 'min-h-[420px]',
)

const carouselWrapper = ref<HTMLElement | null>(null)
const isVisibleArr = ref<boolean[]>([])
let observersArr: MutationObserver[] = []

function roundLabel(levelIndex: number): string {
    const total = props.table.length
    if (total <= 1) return 'النهائي'
    if (levelIndex === total - 1) return 'النهائي'
    if (levelIndex === total - 2) return 'نصف النهائي'
    if (levelIndex === total - 3) return 'ربع النهائي'

    const labels = ['الجولة الأولى', 'الجولة الثانية', 'الجولة الثالثة', 'الجولة الرابعة']
    return labels[levelIndex] ?? `الجولة ${levelIndex + 1}`
}

function disconnectObservers() {
    observersArr.forEach((observer) => observer.disconnect())
    observersArr = []
}

function setupVisibilityWatchers() {
    disconnectObservers()
    isVisibleArr.value = []

    const slides = Array.from(
        carouselWrapper.value?.getElementsByTagName('li') ?? [],
    ) as HTMLLIElement[]

    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i]
        if (!slide) continue

        isVisibleArr.value.push(Array.from(slide.classList).includes('carousel__slide--visible'))

        const mutationObserver = new MutationObserver(() => {
            const classList = Array.from(slide.classList)
            isVisibleArr.value[i] = classList.includes('carousel__slide--visible')
        })

        mutationObserver.observe(slide, { attributes: true, attributeFilter: ['class'] })
        observersArr.push(mutationObserver)
    }
}

onMounted(async () => {
    await nextTick()
    setupVisibilityWatchers()
})

onBeforeUnmount(() => {
    disconnectObservers()
})

watch(() => props.table, async () => {
    await nextTick()
    setupVisibilityWatchers()
}, { deep: true })
</script>

<style scoped>
:deep(.carousel__slide) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    min-height: 100%;
}

:deep(.carousel__pagination-button) {
    background-color: #B9B9B9;
}

:deep(.carousel__pagination-button--active) {
    background-color: #231F1F;
}

:deep(.carousel__prev),
:deep(.carousel__next) {
    color: #231F1F;
    background: #F0F0F0;
    border: 1px solid #B9B9B9;
    border-radius: 9999px;
}
</style>
