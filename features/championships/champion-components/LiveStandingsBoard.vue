<template>
    <div class="flex h-dvh w-screen items-center justify-center overflow-hidden bg-transparent">
        <section
            class="relative shrink-0 origin-center overflow-hidden bg-transparent font-sans"
            aria-label="جدول الترتيب المباشر"
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

            <!-- Tournament logo -->
            <div
                class="absolute z-[4] flex items-center justify-center overflow-hidden"
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

            <!-- Header labels -->
            <div
                v-for="column in activeLayout.columns"
                :key="`header-${column.key}`"
                class="absolute z-[3] flex items-center font-sans font-bold leading-none"
                :class="alignClass(activeLayout.headers[column.key]?.align)"
                :style="textBoxStyle(activeLayout.headers[column.key])"
            >
                <span v-if="column.label">{{ column.label }}</span>
            </div>

            <!-- Fixed slot backgrounds -->
            <template
                v-for="(_, slotIndex) in occupiedSlotCount"
                :key="`bg-row-${slotIndex}`"
            >
                <div
                    v-for="column in contentColumns"
                    :key="`bg-${slotIndex}-${column.key}`"
                    class="pointer-events-none absolute z-[2]"
                    :style="slotBackgroundStyle(slotIndex, column.key)"
                />
            </template>

            <!-- Fixed rank numbers -->
            <div
                v-for="(_, slotIndex) in occupiedSlotCount"
                :key="`rank-${slotIndex}`"
                class="absolute z-[3] flex items-center font-numbers font-bold leading-none"
                :class="alignClass(cellBox(slotIndex, 'rank')?.align)"
                :style="slotRankStyle(slotIndex)"
            >
                {{ slotIndex + 1 }}
            </div>

            <!-- Sequenced slot content (one fade at a time, no instant swap) -->
            <div
                v-for="(row, slotIndex) in visualRows"
                :key="`slot-${slotIndex}`"
                class="absolute left-0 z-[3] w-full overflow-visible"
                :style="{
                    top: `${slotY(slotIndex)}px`,
                    height: `${rowHeight(slotIndex)}px`,
                }"
            >
                <div
                    v-if="row"
                    class="absolute inset-x-0 top-0 h-full"
                    :class="[
                        slotPhaseClass(slotIndex),
                        valueFlashIds.has(row.id) ? 'live-value-flash' : '',
                    ]"
                >
                    <div
                        v-for="column in contentColumns"
                        :key="`${row.id}-${column.key}`"
                        class="absolute flex items-center font-bold leading-none"
                        :class="[
                            alignClass(cellBox(slotIndex, column.key)?.align),
                            column.key === 'team' ? 'font-sans' : 'font-numbers',
                        ]"
                        :style="contentInRowStyle(slotIndex, column.key)"
                    >
                        <div
                            v-if="column.key === 'team'"
                            class="flex size-full items-center justify-center overflow-hidden rounded-full"
                        >
                            <Image
                                v-if="logoFor(row.id)"
                                :src="logoFor(row.id)"
                                :alt="displayTextValue(row.name)"
                                icon="i-heroicons-user-group"
                                class="size-[85%] object-contain"
                            />
                            <UIcon
                                v-else
                                name="i-heroicons-user-group"
                                class="size-[45%] text-black/50"
                            />
                        </div>

                        <template v-else>
                            {{ row.values[column.key] }}
                        </template>
                    </div>
                </div>
            </div>

            <div
                v-if="!visualRows.length"
                class="absolute inset-0 z-[3] flex items-center justify-center font-sans text-4xl font-bold text-white/75"
            >
                لا توجد نتائج حالياً
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { HezamTeamSummary, LeagueTeamSummary } from '~/features/championships/types/IChamp'
import ChampType from '~/features/championships/types/ChampType'
import {
    displayAbnatValue,
    displayStatValue,
    displayTextValue,
} from '~/features/championships/utils/championWinnerStats'
import {
    createDefaultLiveTableLayout,
    normalizeLiveTableLayout,
} from '~/features/championships/live-table/defaultLayout'
import type {
    LiveTableAlign,
    LiveTableColumnKey,
    LiveTableFieldBox,
    LiveTableLayout,
} from '~/features/championships/live-table/types'
import { LIVE_TABLE_MAX_ROWS } from '~/features/championships/live-table/types'
import { useLiveTableLayout } from '~/features/championships/composables/useLiveTableLayout'

const STEP_MS = 420
const VALUE_FLASH_MS = 450

const props = defineProps<{
    table: Array<LeagueTeamSummary | HezamTeamSummary>
    champType: ChampType
    logosById?: Record<number, string>
    tournamentLogo?: string | null
    tournamentName?: string | null
    /** When provided (editor), use this layout instead of stored/default. */
    layout?: LiveTableLayout | null
}>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl as string

const { layout: storedLayout } = useLiveTableLayout(() => props.champType)

const activeLayout = computed(() =>
    normalizeLiveTableLayout(
        props.layout ?? storedLayout.value ?? createDefaultLiveTableLayout(props.champType),
    ),
)

const tournamentLogoSrc = computed(() => {
    const logo = props.tournamentLogo
    if (!logo) return ''
    if (/^https?:\/\//i.test(logo) || logo.startsWith('data:')) return logo
    return `${mediaBaseUrl}${logo}`
})

type DisplayRow = {
    id: number
    name: string
    values: Partial<Record<LiveTableColumnKey, string>>
}

function parseAbnat(value: string | number | null | undefined): number | null {
    if (value === null || value === undefined) return null
    if (typeof value === 'number') return Number.isFinite(value) ? value : null
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : null
}

function toDisplayRow(team: LeagueTeamSummary | HezamTeamSummary): DisplayRow {
    if (props.champType === ChampType.HEZAM) {
        const hezam = team as HezamTeamSummary
        return {
            id: team.id,
            name: team.name,
            values: {
                play: displayStatValue(team.play),
                win: displayStatValue(team.win),
                streak: displayStatValue(hezam.consecutiveWins),
                lost: displayStatValue(team.lost),
                abnat: displayAbnatValue(parseAbnat(team.abnat)),
            },
        }
    }

    const league = team as LeagueTeamSummary
    return {
        id: team.id,
        name: team.name,
        values: {
            play: displayStatValue(team.play),
            win: displayStatValue(team.win),
            draw: displayStatValue(team.draw),
            lost: displayStatValue(team.lost),
            points: displayStatValue(league.totalScore),
            abnat: displayAbnatValue(parseAbnat(team.abnat)),
        },
    }
}

function cloneRows(rows: DisplayRow[]) {
    return rows.map((row) => ({
        id: row.id,
        name: row.name,
        values: { ...row.values },
    }))
}

const displayRows = computed(() => props.table.slice(0, LIVE_TABLE_MAX_ROWS).map(toDisplayRow))

type SlotPhase = 'idle' | 'leave' | 'gone' | 'enter'

/** What is currently painted in each slot (lags during sequenced animation). */
const visualRows = ref<DisplayRow[]>([])
const slotPhase = ref<Record<number, SlotPhase>>({})
const valueFlashIds = ref<Set<number>>(new Set())

const occupiedSlotCount = computed(() => Math.max(visualRows.value.length, displayRows.value.length))

const contentColumns = computed(() =>
    activeLayout.value.columns.filter((column) => column.key !== 'rank'),
)

let previousValuesById = new Map<number, string>()
let flashClearTimer: ReturnType<typeof setTimeout> | null = null
let sequenceToken = 0
let isSequencing = false
let pendingRows: DisplayRow[] | null = null

function valuesSignature(row: DisplayRow) {
    return JSON.stringify(row.values)
}

function wait(ms: number) {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, ms)
    })
}

function waitFrame() {
    return new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve())
    })
}

function slotPhaseClass(slotIndex: number) {
    const phase = slotPhase.value[slotIndex] || 'idle'
    if (phase === 'leave') return 'live-step-leave'
    if (phase === 'enter') return 'live-step-enter'
    if (phase === 'gone') return 'live-step-gone'
    return ''
}

function setSlotPhase(slotIndex: number, phase: SlotPhase) {
    slotPhase.value = { ...slotPhase.value, [slotIndex]: phase }
}

function clearSlotPhases() {
    slotPhase.value = {}
}

function rankMap(rows: DisplayRow[]) {
    const map = new Map<number, number>()
    rows.forEach((row, index) => map.set(row.id, index))
    return map
}

function slotY(rowIndex: number) {
    const row = activeLayout.value.cells[rowIndex]
    if (!row) return 0
    const firstKey = activeLayout.value.columns[0]?.key
    if (firstKey && row[firstKey]) return row[firstKey].y
    const any = Object.values(row)[0]
    return any?.y ?? 0
}

function rowHeight(rowIndex: number) {
    const row = activeLayout.value.cells[rowIndex]
    if (!row) return activeLayout.value.table.cellH
    let maxH = 0
    for (const column of activeLayout.value.columns) {
        const cell = row[column.key]
        if (cell) maxH = Math.max(maxH, cell.h)
    }
    return maxH || activeLayout.value.table.cellH
}

function cellBox(rowIndex: number, key: string): LiveTableFieldBox | undefined {
    return activeLayout.value.cells[rowIndex]?.[key]
}

function slotBackgroundStyle(rowIndex: number, key: string) {
    const field = cellBox(rowIndex, key)
    if (!field?.bgColor) return { display: 'none' }
    return {
        left: `${field.x}px`,
        top: `${field.y}px`,
        width: `${field.w}px`,
        height: `${field.h}px`,
        backgroundColor: field.bgColor,
    }
}

function slotRankStyle(rowIndex: number) {
    const field = cellBox(rowIndex, 'rank')
    if (!field) return { display: 'none' }
    return {
        left: `${field.x}px`,
        top: `${field.y}px`,
        width: `${field.w}px`,
        height: `${field.h}px`,
        fontSize: field.fontSize ? `${field.fontSize}px` : undefined,
        color: field.color,
        backgroundColor: 'transparent',
    }
}

function contentInRowStyle(rowIndex: number, key: string) {
    const field = cellBox(rowIndex, key)
    if (!field) return { display: 'none' }
    const baseY = slotY(rowIndex)
    return {
        left: `${field.x}px`,
        top: `${field.y - baseY}px`,
        width: `${field.w}px`,
        height: `${field.h}px`,
        fontSize: field.fontSize ? `${field.fontSize}px` : undefined,
        color: field.color,
        backgroundColor: 'transparent',
    }
}

function logoFor(teamId: number) {
    const logo = props.logosById?.[teamId]
    return logo ? `${mediaBaseUrl}${logo}` : ''
}

function boxStyle(field?: LiveTableFieldBox) {
    if (!field) return {}
    return {
        left: `${field.x}px`,
        top: `${field.y}px`,
        width: `${field.w}px`,
        height: `${field.h}px`,
    }
}

function textBoxStyle(field?: LiveTableFieldBox) {
    if (!field) return { display: 'none' }
    return {
        ...boxStyle(field),
        fontSize: field.fontSize ? `${field.fontSize}px` : undefined,
        color: field.color,
        backgroundColor: field.bgColor || 'transparent',
    }
}

function alignClass(align?: LiveTableAlign) {
    if (align === 'start') return 'justify-start text-start'
    if (align === 'end') return 'justify-end text-end'
    return 'justify-center text-center'
}

function syncValueFlash(rows: DisplayRow[], skipIds?: Set<number>) {
    const flashed = new Set<number>()
    const nextValuesById = new Map<number, string>()

    for (const row of rows) {
        const signature = valuesSignature(row)
        const prevValues = previousValuesById.get(row.id)
        if (
            prevValues !== undefined
            && prevValues !== signature
            && !skipIds?.has(row.id)
        ) {
            flashed.add(row.id)
        }
        nextValuesById.set(row.id, signature)
    }

    previousValuesById = nextValuesById

    if (!flashed.size) return

    valueFlashIds.value = flashed
    if (flashClearTimer) clearTimeout(flashClearTimer)
    flashClearTimer = setTimeout(() => {
        valueFlashIds.value = new Set()
    }, VALUE_FLASH_MS)
}

async function playLeave(slotIndex: number, token: number) {
    if (token !== sequenceToken) return
    setSlotPhase(slotIndex, 'leave')
    await waitFrame()
    await wait(STEP_MS)
    if (token !== sequenceToken) return
    setSlotPhase(slotIndex, 'gone')
}

async function playEnter(slotIndex: number, token: number) {
    if (token !== sequenceToken) return
    // Start invisible, then play enter on the next frame (no pop-in / toggle).
    setSlotPhase(slotIndex, 'gone')
    await nextTick()
    await waitFrame()
    if (token !== sequenceToken) return
    setSlotPhase(slotIndex, 'enter')
    await wait(STEP_MS)
    if (token !== sequenceToken) return
    setSlotPhase(slotIndex, 'idle')
}

/**
 * Sequence for movers (example swap team1 ↔ team2):
 * 1) team1 fade out  2) team2 fade out
 * 3) apply new order (movers stay invisible)
 * 4) team2 fade in   5) team1 fade in
 */
async function runRankSequence(prev: DisplayRow[], next: DisplayRow[], moverIds: Set<number>) {
    const token = ++sequenceToken
    isSequencing = true

    const prevRanks = rankMap(prev)
    const nextRanks = rankMap(next)

    const fadeOutOrder = [...moverIds]
        .filter((id) => prevRanks.has(id))
        .sort((a, b) => (prevRanks.get(a) ?? 0) - (prevRanks.get(b) ?? 0))

    const fadeInOrder = [...moverIds]
        .filter((id) => nextRanks.has(id))
        .sort((a, b) => (nextRanks.get(a) ?? 0) - (nextRanks.get(b) ?? 0))

    // Keep old arrangement; go straight into leave fades (no pre-swap).
    visualRows.value = cloneRows(prev)
    clearSlotPhases()
    await nextTick()
    await waitFrame()

    for (const teamId of fadeOutOrder) {
        if (token !== sequenceToken) return
        const slot = prevRanks.get(teamId)
        if (slot === undefined) continue
        await playLeave(slot, token)
    }

    if (token !== sequenceToken) return

    // Swap data while movers stay gone — never show new teams before enter fade.
    const phases: Record<number, SlotPhase> = {}
    for (const teamId of fadeInOrder) {
        const slot = nextRanks.get(teamId)
        if (slot !== undefined) phases[slot] = 'gone'
    }
    visualRows.value = cloneRows(next)
    slotPhase.value = phases
    await nextTick()
    await waitFrame()

    for (const teamId of fadeInOrder) {
        if (token !== sequenceToken) return
        const slot = nextRanks.get(teamId)
        if (slot === undefined) continue
        await playEnter(slot, token)
    }

    if (token !== sequenceToken) return
    clearSlotPhases()
    isSequencing = false

    // Value flash only after motion, and only for teams that did not move.
    syncValueFlash(next, moverIds)

    if (pendingRows) {
        const queued = pendingRows
        pendingRows = null
        await applyRows(queued)
    }
}

async function applyRows(next: DisplayRow[]) {
    const prev = cloneRows(visualRows.value)

    if (!prev.length) {
        visualRows.value = cloneRows(next)
        clearSlotPhases()
        syncValueFlash(next)
        return
    }

    const prevRanks = rankMap(prev)
    const nextRanks = rankMap(next)

    const moverIds = new Set<number>()
    for (const row of next) {
        const oldIndex = prevRanks.get(row.id)
        if (oldIndex !== undefined && oldIndex !== nextRanks.get(row.id)) {
            moverIds.add(row.id)
        }
    }
    for (const row of prev) {
        if (!nextRanks.has(row.id)) moverIds.add(row.id)
    }

    const orderChanged = moverIds.size > 0 || prev.length !== next.length

    if (!orderChanged) {
        visualRows.value = cloneRows(next)
        syncValueFlash(next)
        return
    }

    if (isSequencing) {
        pendingRows = cloneRows(next)
        return
    }

    // Do not flash / swap first — go directly into sequenced fades.
    await runRankSequence(prev, next, moverIds)
}

watch(
    displayRows,
    (rows) => {
        void applyRows(cloneRows(rows))
    },
    { immediate: true, deep: true },
)

const boardScale = ref(1)

function updateScale() {
    if (!import.meta.client) return
    const { width, height } = activeLayout.value.canvas
    boardScale.value = Math.min(window.innerWidth / width, window.innerHeight / height, 1)
}

watch(() => activeLayout.value.canvas, updateScale, { deep: true })

onMounted(() => {
    updateScale()
    window.addEventListener('resize', updateScale)
})

onBeforeUnmount(() => {
    sequenceToken += 1
    if (!import.meta.client) return
    window.removeEventListener('resize', updateScale)
    if (flashClearTimer) clearTimeout(flashClearTimer)
})
</script>

<style scoped>
.live-step-gone {
    opacity: 0;
    transform: translateX(48px);
    pointer-events: none;
}

.live-step-leave {
    animation: live-step-leave 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.live-step-enter {
    animation: live-step-enter 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes live-step-leave {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(48px);
    }
}

@keyframes live-step-enter {
    from {
        opacity: 0;
        transform: translateX(-48px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.live-value-flash {
    animation: live-value-flash 0.45s ease;
}

@keyframes live-value-flash {
    0% {
        filter: brightness(1);
    }
    35% {
        filter: brightness(1.25);
    }
    100% {
        filter: brightness(1);
    }
}
</style>
