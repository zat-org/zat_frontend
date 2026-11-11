<template>
    <div class="flex h-dvh w-screen items-center justify-center overflow-hidden bg-transparent">
        <section
            class="relative shrink-0 origin-center overflow-hidden bg-transparent font-sans"
            aria-label="إحصائيات المباراة المباشرة"
            dir="rtl"
            :style="{
                width: `${activeLayout.canvas.width}px`,
                height: `${activeLayout.canvas.height}px`,
                transform: `scale(${boardScale})`,
            }"
        >
            <img
                :src="activeLayout.background"
                alt=""
                class="pointer-events-none absolute z-[1] select-none object-contain object-center"
                aria-hidden="true"
                loading="eager"
                decoding="async"
                :style="{
                    left: `${activeLayout.frame.x}px`,
                    top: `${activeLayout.frame.y}px`,
                    width: `${activeLayout.frame.w}px`,
                    height: `${activeLayout.frame.h}px`,
                }"
            >

            <div
                class="absolute z-[4] flex items-center justify-center overflow-hidden rounded-full"
                :style="boxStyle(activeLayout.logo)"
            >
                <Image
                    v-if="tournamentLogoSrc"
                    :src="tournamentLogoSrc"
                    :alt="tournamentName || 'شعار البطولة'"
                    icon="i-heroicons-trophy"
                    class="size-full object-contain"
                />
                <UIcon
                    v-else
                    name="i-heroicons-trophy"
                    class="size-[55%] text-white/80"
                    aria-hidden="true"
                />
            </div>

            <div
                class="absolute z-[4] flex items-center justify-center overflow-hidden rounded-full"
                :style="boxStyle(activeLayout.team1Logo)"
            >
                <Image
                    v-if="team1LogoSrc"
                    :src="team1LogoSrc"
                    :alt="team1Name"
                    icon="i-heroicons-user-group"
                    class="size-[85%] object-contain"
                />
                <UIcon
                    v-else
                    name="i-heroicons-user-group"
                    class="size-[45%] text-black/50"
                />
            </div>

            <div
                class="absolute z-[4] flex items-center justify-center overflow-hidden rounded-full"
                :style="boxStyle(activeLayout.team2Logo)"
            >
                <Image
                    v-if="team2LogoSrc"
                    :src="team2LogoSrc"
                    :alt="team2Name"
                    icon="i-heroicons-user-group"
                    class="size-[85%] object-contain"
                />
                <UIcon
                    v-else
                    name="i-heroicons-user-group"
                    class="size-[45%] text-black/50"
                />
            </div>

            <div
                class="absolute z-[4] flex items-center font-sans font-bold leading-none"
                :class="alignClass(activeLayout.team1Name.align)"
                :style="textBoxStyle(activeLayout.team1Name)"
            >
                {{ team1Name }}
            </div>

            <div
                class="absolute z-[4] flex items-center font-sans font-bold leading-none"
                :class="alignClass(activeLayout.team2Name.align)"
                :style="textBoxStyle(activeLayout.team2Name)"
            >
                {{ team2Name }}
            </div>

            <template
                v-for="(row, index) in displayRows"
                :key="`stat-row-${index}`"
            >
                <div
                    class="absolute z-[3] flex items-center font-sans font-bold leading-none"
                    :class="[
                        alignClass(activeLayout.rows[index]?.label.align),
                        flashKeys.has(`label-${index}`) ? 'live-stat-flash' : '',
                    ]"
                    :style="textBoxStyle(activeLayout.rows[index]?.label)"
                >
                    {{ row.label }}
                </div>
                <div
                    class="absolute z-[3] flex items-center font-numbers font-bold leading-none"
                    :class="[
                        alignClass(activeLayout.rows[index]?.team1Value.align),
                        flashKeys.has(`t1-${index}`) ? 'live-stat-flash' : '',
                    ]"
                    :style="textBoxStyle(activeLayout.rows[index]?.team1Value)"
                >
                    {{ row.team1 }}
                </div>
                <div
                    class="absolute z-[3] flex items-center font-numbers font-bold leading-none"
                    :class="[
                        alignClass(activeLayout.rows[index]?.team2Value.align),
                        flashKeys.has(`t2-${index}`) ? 'live-stat-flash' : '',
                    ]"
                    :style="textBoxStyle(activeLayout.rows[index]?.team2Value)"
                >
                    {{ row.team2 }}
                </div>
            </template>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { IMatchFullDetails } from '~/features/matches/types/IMatchFullDetails'
import {
    displayStatValue,
    displayTextValue,
} from '~/features/championships/utils/championWinnerStats'
import {
    createDefaultLiveMatchStatsLayout,
    normalizeLiveMatchStatsLayout,
} from '~/features/matches/live-stats/defaultLayout'
import type {
    LiveMatchStatsAlign,
    LiveMatchStatsFieldBox,
    LiveMatchStatsLayout,
} from '~/features/matches/live-stats/types'
import {
    LIVE_MATCH_STATS_KABABIT_HAKAM_LABEL,
    LIVE_MATCH_STATS_MAX_ROWS,
} from '~/features/matches/live-stats/types'
import { useLiveMatchStatsLayout } from '~/features/matches/composables/useLiveMatchStatsLayout'

const VALUE_FLASH_MS = 600

const props = defineProps<{
    match: IMatchFullDetails | null
    tournamentLogo?: string | null
    tournamentName?: string | null
    /** When provided (editor), use this layout instead of stored/default. */
    layout?: LiveMatchStatsLayout | null
}>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl as string
const { layout: storedLayout } = useLiveMatchStatsLayout()

const activeLayout = computed(() =>
    normalizeLiveMatchStatsLayout(
        props.layout ?? storedLayout.value ?? createDefaultLiveMatchStatsLayout(),
    ),
)

const boardScale = ref(1)
const flashKeys = ref<Set<string>>(new Set())
let previousSignature = ''
let flashClearTimer: ReturnType<typeof setTimeout> | null = null

type DisplayRow = {
    label: string
    team1: string
    team2: string
}

function isKababitHakamLabel(name: string | null | undefined) {
    const value = String(name || '')
    return value.includes('كبابيت') && value.includes('حكم')
}

const displayRows = computed<DisplayRow[]>(() => {
    const team1Stats = [...(props.match?.team1.statistics ?? [])]
    const team2Stats = [...(props.match?.team2.statistics ?? [])]

    // Ensure "عدد الكبابيت حكم" appears (13th row on the new board art).
    const hasKababitHakam = team1Stats.some(stat => isKababitHakamLabel(stat.name))
        || team2Stats.some(stat => isKababitHakamLabel(stat.name))

    if (!hasKababitHakam) {
        team1Stats.push({ name: LIVE_MATCH_STATS_KABABIT_HAKAM_LABEL, value: 0 })
        team2Stats.push({ name: LIVE_MATCH_STATS_KABABIT_HAKAM_LABEL, value: 0 })
    }

    const count = Math.min(
        LIVE_MATCH_STATS_MAX_ROWS,
        Math.max(team1Stats.length, team2Stats.length, 1),
    )

    return Array.from({ length: count }, (_, index) => {
        const t1 = team1Stats[index]
        const t2 = team2Stats[index]
        return {
            label: displayTextValue(t1?.name ?? t2?.name ?? ''),
            team1: displayStatValue(t1?.value ?? null),
            team2: displayStatValue(t2?.value ?? null),
        }
    })
})

const tournamentLogoSrc = computed(() => resolveMedia(props.tournamentLogo))
const team1LogoSrc = computed(() => resolveMedia(props.match?.team1.logo))
const team2LogoSrc = computed(() => resolveMedia(props.match?.team2.logo))
const team1Name = computed(() => displayTextValue(props.match?.team1.name))
const team2Name = computed(() => displayTextValue(props.match?.team2.name))

function resolveMedia(src: string | null | undefined) {
    if (!src) return ''
    if (/^https?:\/\//i.test(src) || src.startsWith('data:')) return src
    return `${mediaBaseUrl}${src}`
}

function boxStyle(box: LiveMatchStatsFieldBox) {
    return {
        left: `${box.x}px`,
        top: `${box.y}px`,
        width: `${box.w}px`,
        height: `${box.h}px`,
        backgroundColor: box.bgColor || undefined,
    }
}

function textBoxStyle(box: LiveMatchStatsFieldBox | undefined) {
    if (!box) return {}
    return {
        ...boxStyle(box),
        fontSize: `${box.fontSize}px`,
        color: box.color,
    }
}

function alignClass(align: LiveMatchStatsAlign | undefined) {
    if (align === 'start') return 'justify-start text-start'
    if (align === 'end') return 'justify-end text-end'
    return 'justify-center text-center'
}

function updateBoardScale() {
    if (!import.meta.client) return
    const { width, height } = activeLayout.value.canvas
    boardScale.value = Math.min(window.innerWidth / width, window.innerHeight / height, 1)
}

function rowsSignature(rows: DisplayRow[]) {
    return rows.map(row => `${row.label}|${row.team1}|${row.team2}`).join('||')
}

watch(displayRows, (rows) => {
    const next = rowsSignature(rows)
    if (!previousSignature) {
        previousSignature = next
        return
    }
    if (next === previousSignature) return

    const prevParts = previousSignature.split('||')
    const nextParts = next.split('||')
    const flashed = new Set<string>()

    for (let i = 0; i < Math.max(prevParts.length, nextParts.length); i += 1) {
        const [prevLabel = '', prevT1 = '', prevT2 = ''] = (prevParts[i] || '').split('|')
        const [nextLabel = '', nextT1 = '', nextT2 = ''] = (nextParts[i] || '').split('|')
        if (prevLabel !== nextLabel) flashed.add(`label-${i}`)
        if (prevT1 !== nextT1) flashed.add(`t1-${i}`)
        if (prevT2 !== nextT2) flashed.add(`t2-${i}`)
    }

    previousSignature = next
    if (!flashed.size) return

    flashKeys.value = flashed
    if (flashClearTimer) clearTimeout(flashClearTimer)
    flashClearTimer = setTimeout(() => {
        flashKeys.value = new Set()
    }, VALUE_FLASH_MS)
}, { deep: true })

watch(() => activeLayout.value.canvas, updateBoardScale, { deep: true })

onMounted(() => {
    updateBoardScale()
    window.addEventListener('resize', updateBoardScale)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateBoardScale)
    if (flashClearTimer) clearTimeout(flashClearTimer)
})
</script>

<style scoped>
.live-stat-flash {
    transform-origin: center center;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    animation: live-stat-flip 600ms cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform, filter;
}

@keyframes live-stat-flip {
    0% {
        transform: perspective(700px) rotateX(0deg) scale(1);
        filter: brightness(1);
    }
    35% {
        transform: perspective(700px) rotateX(90deg) scale(1.45);
        filter: brightness(1.35);
    }
    70% {
        transform: perspective(700px) rotateX(180deg) scale(1.2);
        filter: brightness(1.15);
    }
    100% {
        transform: perspective(700px) rotateX(360deg) scale(1);
        filter: brightness(1);
    }
}
</style>
