<template>
    <div class="flex h-dvh w-screen overflow-hidden bg-neutral-950 text-white">
        <div class="relative flex min-w-0 flex-1 items-center justify-center overflow-hidden bg-neutral-800">
            <div
                class="relative shrink-0 origin-center overflow-hidden bg-transparent"
                :style="{
                    width: `${draft.canvas.width}px`,
                    height: `${draft.canvas.height}px`,
                    transform: `scale(${previewScale})`,
                    backgroundImage: 'linear-gradient(45deg, #3f3f46 25%, transparent 25%), linear-gradient(-45deg, #3f3f46 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #3f3f46 75%), linear-gradient(-45deg, transparent 75%, #3f3f46 75%)',
                    backgroundSize: '24px 24px',
                    backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0',
                    backgroundColor: '#27272a',
                }"
            >
                <button
                    type="button"
                    class="absolute z-[1] box-border border-2 border-dashed p-0"
                    :class="selectedId === 'frame'
                        ? 'border-lime-300'
                        : 'border-transparent hover:border-lime-300/50'"
                    :style="{
                        left: `${draft.frame.x}px`,
                        top: `${draft.frame.y}px`,
                        width: `${draft.frame.w}px`,
                        height: `${draft.frame.h}px`,
                    }"
                    title="إطار الخلفية"
                    @pointerdown.stop="startDrag($event, 'frame')"
                >
                    <img
                        :src="draft.background"
                        alt=""
                        class="pointer-events-none size-full object-contain object-center"
                    >
                </button>

                <button
                    v-for="item in cellItems"
                    :key="item.id"
                    type="button"
                    class="absolute z-[4] box-border border-2 border-dashed"
                    :class="isItemSelected(item.id)
                        ? 'border-amber-300 bg-amber-300/15'
                        : 'border-sky-300/50 bg-sky-300/5 hover:border-sky-200'"
                    :style="boxStyle(item.box)"
                    @pointerdown.stop="startDrag($event, item.id)"
                >
                    <span
                        class="pointer-events-none flex size-full items-center justify-center font-bold"
                        :style="{
                            fontSize: `${item.box.fontSize || 14}px`,
                            color: item.box.color,
                        }"
                    >
                        {{ item.preview }}
                    </span>
                </button>

                <button
                    v-for="row in rowItems"
                    v-show="selectionMode === 'row'"
                    :key="row.id"
                    type="button"
                    class="absolute z-[5] box-border border-2"
                    :class="selectedId === row.id
                        ? 'border-fuchsia-300 bg-fuchsia-300/10'
                        : 'border-transparent hover:border-fuchsia-300/50 hover:bg-fuchsia-300/5'"
                    :style="boxStyle(row.bounds)"
                    :title="row.label"
                    @pointerdown.stop="startDrag($event, row.id)"
                />

                <button
                    v-for="column in columnItems"
                    v-show="selectionMode === 'column'"
                    :key="column.id"
                    type="button"
                    class="absolute z-[5] box-border border-2"
                    :class="selectedId === column.id
                        ? 'border-cyan-300 bg-cyan-300/10'
                        : 'border-transparent hover:border-cyan-300/50 hover:bg-cyan-300/5'"
                    :style="boxStyle(column.bounds)"
                    :title="column.label"
                    @pointerdown.stop="startDrag($event, column.id)"
                />

                <button
                    v-show="selectionMode === 'grid'"
                    type="button"
                    class="absolute z-[5] box-border border-2"
                    :class="selectedId === 'grid'
                        ? 'border-violet-300 bg-violet-300/10'
                        : 'border-transparent hover:border-violet-300/50 hover:bg-violet-300/5'"
                    :style="boxStyle(gridBounds)"
                    title="الشبكة بالكامل"
                    @pointerdown.stop="startDrag($event, 'grid')"
                />
            </div>
        </div>

        <aside class="flex w-[380px] shrink-0 flex-col gap-3 overflow-y-auto border-l border-white/10 bg-neutral-900 p-4">
            <h1 class="text-lg font-bold">
                محرر إحصائيات المباراة
            </h1>
            <p class="text-xs text-white/60">
                اسحب الشعارات والأسماء والشبكة فوق الخلفية. احفظ لعرض البث المباشر.
            </p>

            <label class="flex flex-col gap-1 text-sm">
                <span class="text-white/70">خلفية (مسار)</span>
                <input
                    v-model="draft.background"
                    class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                >
            </label>

            <div class="grid grid-cols-2 gap-2">
                <button
                    type="button"
                    class="rounded px-2 py-1.5 text-sm font-bold"
                    :class="selectionMode === 'cell' ? 'bg-amber-600' : 'bg-white/10 hover:bg-white/15'"
                    @click="selectionMode = 'cell'"
                >
                    خلية
                </button>
                <button
                    type="button"
                    class="rounded px-2 py-1.5 text-sm font-bold"
                    :class="selectionMode === 'row' ? 'bg-fuchsia-600' : 'bg-white/10 hover:bg-white/15'"
                    @click="selectionMode = 'row'"
                >
                    صف
                </button>
                <button
                    type="button"
                    class="rounded px-2 py-1.5 text-sm font-bold"
                    :class="selectionMode === 'column' ? 'bg-cyan-600' : 'bg-white/10 hover:bg-white/15'"
                    @click="selectionMode = 'column'"
                >
                    عمود
                </button>
                <button
                    type="button"
                    class="rounded px-2 py-1.5 text-sm font-bold"
                    :class="selectionMode === 'grid' ? 'bg-violet-600' : 'bg-white/10 hover:bg-white/15'"
                    @click="selectionMode = 'grid'"
                >
                    شبكة
                </button>
            </div>

            <label
                v-if="selectionMode !== 'grid'"
                class="flex flex-col gap-1 text-sm"
            >
                <span class="text-white/70">العنصر المحدد</span>
                <select
                    v-model="selectedId"
                    class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                >
                    <option
                        v-if="selectionMode === 'cell'"
                        value="frame"
                    >
                        إطار الخلفية
                    </option>
                    <option
                        v-for="item in selectOptions"
                        :key="item.id"
                        :value="item.id"
                    >
                        {{ item.label }}
                    </option>
                </select>
            </label>

            <section
                v-if="selectionMode === 'grid' || selectedId === 'grid'"
                class="rounded border border-white/10 bg-black/25 p-3"
            >
                <h2 class="mb-2 text-sm font-bold text-white/90">
                    إعدادات الشبكة بالكامل
                </h2>
                <p class="mb-2 text-[11px] text-white/50">
                    حرّك أو عدّل القيم ثم تُعاد محاذاة كل الصفوف معاً.
                </p>
                <div class="grid grid-cols-2 gap-2">
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Grid X</span>
                        <input
                            v-model.number="draft.grid.x"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                            @change="onGridGeometryChange"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Grid Y</span>
                        <input
                            v-model.number="draft.grid.y"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                            @change="onGridGeometryChange"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Gap X</span>
                        <input
                            v-model.number="draft.grid.gapX"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                            @change="onGridGeometryChange"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Gap Y</span>
                        <input
                            v-model.number="draft.grid.gapY"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                            @change="onGridGeometryChange"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Row H</span>
                        <input
                            v-model.number="draft.grid.rowH"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                            @change="onGridGeometryChange"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Value W</span>
                        <input
                            v-model.number="draft.grid.valueW"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                            @change="onGridGeometryChange"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Label W</span>
                        <input
                            v-model.number="draft.grid.labelW"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                            @change="onGridGeometryChange"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Label font</span>
                        <input
                            v-model.number="draft.grid.labelFontSize"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                            @change="onGridGeometryChange"
                        >
                    </label>
                    <label class="col-span-2 flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Value font</span>
                        <input
                            v-model.number="draft.grid.valueFontSize"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                            @change="onGridGeometryChange"
                        >
                    </label>
                </div>
                <button
                    type="button"
                    class="mt-2 w-full rounded border border-violet-400/40 bg-violet-500/20 px-2 py-1.5 text-xs font-bold text-violet-100 hover:bg-violet-500/30"
                    @click="onGridGeometryChange"
                >
                    تطبيق على كل الصفوف
                </button>
            </section>

            <template v-if="selectedId === 'frame'">
                <div class="grid grid-cols-2 gap-2">
                    <label
                        v-for="key in frameKeys"
                        :key="key"
                        class="flex flex-col gap-1 text-xs"
                    >
                        <span class="text-white/70">Frame {{ key.toUpperCase() }}</span>
                        <input
                            v-model.number="draft.frame[key]"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                        >
                    </label>
                </div>
            </template>

            <template v-else-if="selectedBoxes.length && selectedId !== 'grid'">
                <div class="grid grid-cols-2 gap-2">
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">X</span>
                        <input
                            :value="sharedNumber('x')"
                            type="number"
                            :disabled="isRowSelection"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm disabled:opacity-40"
                            @change="onSharedNumberInput('x', $event)"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Y</span>
                        <input
                            :value="sharedNumber('y')"
                            type="number"
                            :disabled="isColumnSelection"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm disabled:opacity-40"
                            @change="onSharedNumberInput('y', $event)"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">W</span>
                        <input
                            :value="sharedNumber('w')"
                            type="number"
                            :disabled="isRowSelection"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm disabled:opacity-40"
                            @change="onSharedNumberInput('w', $event)"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">H</span>
                        <input
                            :value="sharedNumber('h')"
                            type="number"
                            :disabled="isColumnSelection"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm disabled:opacity-40"
                            @change="onSharedNumberInput('h', $event)"
                        >
                    </label>
                    <label class="col-span-2 flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Font size</span>
                        <input
                            :value="sharedNumber('fontSize')"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                            @change="onSharedNumberInput('fontSize', $event)"
                        >
                    </label>
                </div>

                <label class="flex flex-col gap-1 text-sm">
                    <span class="text-white/70">لون النص</span>
                    <input
                        :value="sharedColor"
                        type="color"
                        class="h-10 w-full rounded border border-white/15 bg-black/40"
                        @input="onSharedColorInput"
                    >
                </label>

                <label class="flex flex-col gap-1 text-sm">
                    <span class="text-white/70">المحاذاة</span>
                    <select
                        :value="sharedAlign"
                        class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                        @change="onSharedAlignInput"
                    >
                        <option value="start">
                            start
                        </option>
                        <option value="center">
                            center
                        </option>
                        <option value="end">
                            end
                        </option>
                    </select>
                </label>
            </template>

            <div class="mt-2 flex flex-col gap-2">
                <button
                    type="button"
                    class="rounded bg-emerald-600 px-3 py-2 text-sm font-bold hover:bg-emerald-500"
                    @click="save"
                >
                    حفظ في التطبيق
                </button>
                <button
                    type="button"
                    class="rounded bg-white/10 px-3 py-2 text-sm font-bold hover:bg-white/15"
                    @click="reset"
                >
                    إعادة للافتراضي
                </button>
                <button
                    type="button"
                    class="rounded bg-white/10 px-3 py-2 text-sm font-bold hover:bg-white/15"
                    @click="downloadJson"
                >
                    تصدير JSON
                </button>
                <label class="rounded bg-white/10 px-3 py-2 text-center text-sm font-bold hover:bg-white/15">
                    استيراد JSON
                    <input
                        type="file"
                        accept="application/json,.json"
                        class="hidden"
                        @change="onImportFile"
                    >
                </label>
            </div>

            <p
                v-if="status"
                class="text-xs text-emerald-300"
            >
                {{ status }}
            </p>
        </aside>
    </div>
</template>

<script setup lang="ts">
import {
    createDefaultLiveMatchStatsLayout,
    normalizeLiveMatchStatsLayout,
    reflowLiveMatchStatsGrid,
} from '~/features/matches/live-stats/defaultLayout'
import type {
    LiveMatchStatsAlign,
    LiveMatchStatsColumnKey,
    LiveMatchStatsFieldBox,
    LiveMatchStatsLayout,
} from '~/features/matches/live-stats/types'
import {
    LIVE_MATCH_STATS_COLUMN_KEYS,
    LIVE_MATCH_STATS_COLUMN_LABELS,
} from '~/features/matches/live-stats/types'
import { useLiveMatchStatsLayout } from '~/features/matches/composables/useLiveMatchStatsLayout'

type EditableItem = {
    id: string
    label: string
    preview: string
    box: LiveMatchStatsFieldBox
}

type RowItem = {
    id: string
    label: string
    bounds: LiveMatchStatsFieldBox
    boxes: LiveMatchStatsFieldBox[]
}

type ColumnItem = {
    id: string
    label: string
    columnKey: LiveMatchStatsColumnKey
    bounds: LiveMatchStatsFieldBox
    boxes: LiveMatchStatsFieldBox[]
}

const frameKeys = ['x', 'y', 'w', 'h'] as const

const {
    layout: storedLayout,
    saveToStorage,
    resetToDefault,
    importJson,
    loadFromStorage,
} = useLiveMatchStatsLayout()

const draft = ref<LiveMatchStatsLayout>(createDefaultLiveMatchStatsLayout())
const selectedId = ref('logo')
const selectionMode = ref<'cell' | 'row' | 'column' | 'grid'>('cell')
const status = ref('')
const previewScale = ref(1)

function collectGridBoxes() {
    return draft.value.rows.flatMap(row => [row.label, row.team1Value, row.team2Value])
}

function boundsFromBoxes(boxes: LiveMatchStatsFieldBox[]): LiveMatchStatsFieldBox {
    const minX = Math.min(...boxes.map(box => box.x))
    const minY = Math.min(...boxes.map(box => box.y))
    const maxX = Math.max(...boxes.map(box => box.x + box.w))
    const maxY = Math.max(...boxes.map(box => box.y + box.h))
    return {
        x: minX,
        y: minY,
        w: maxX - minX,
        h: maxY - minY,
        fontSize: 0,
        color: '#ffffff',
        bgColor: '',
        align: 'center',
    }
}

const cellItems = computed<EditableItem[]>(() => {
    const items: EditableItem[] = [
        { id: 'logo', label: 'شعار البطولة', preview: 'LOGO', box: draft.value.logo },
        { id: 'team1Logo', label: 'شعار الفريق 1', preview: 'T1', box: draft.value.team1Logo },
        { id: 'team2Logo', label: 'شعار الفريق 2', preview: 'T2', box: draft.value.team2Logo },
        { id: 'team1Name', label: 'اسم الفريق 1', preview: 'اسم 1', box: draft.value.team1Name },
        { id: 'team2Name', label: 'اسم الفريق 2', preview: 'اسم 2', box: draft.value.team2Name },
    ]

    draft.value.rows.forEach((row, index) => {
        items.push(
            {
                id: `row:${index}:label`,
                label: `صف ${index + 1} / التسمية`,
                preview: `ص${index + 1}`,
                box: row.label,
            },
            {
                id: `row:${index}:team1Value`,
                label: `صف ${index + 1} / قيمة 1`,
                preview: '0',
                box: row.team1Value,
            },
            {
                id: `row:${index}:team2Value`,
                label: `صف ${index + 1} / قيمة 2`,
                preview: '0',
                box: row.team2Value,
            },
        )
    })

    return items
})

const rowItems = computed<RowItem[]>(() =>
    draft.value.rows.map((row, index) => {
        const boxes = [row.label, row.team1Value, row.team2Value]
        return {
            id: `row:${index}`,
            label: `صف ${index + 1}`,
            boxes,
            bounds: boundsFromBoxes(boxes),
        }
    }),
)

const columnItems = computed<ColumnItem[]>(() =>
    LIVE_MATCH_STATS_COLUMN_KEYS.map((columnKey) => {
        const boxes = draft.value.rows.map(row => row[columnKey])
        return {
            id: `column:${columnKey}`,
            label: LIVE_MATCH_STATS_COLUMN_LABELS[columnKey],
            columnKey,
            boxes,
            bounds: boundsFromBoxes(boxes),
        }
    }),
)

const gridBounds = computed(() => boundsFromBoxes(collectGridBoxes()))

const selectOptions = computed(() => {
    if (selectionMode.value === 'row') {
        return rowItems.value.map(row => ({ id: row.id, label: row.label }))
    }
    if (selectionMode.value === 'column') {
        return columnItems.value.map(column => ({ id: column.id, label: column.label }))
    }
    if (selectionMode.value === 'grid') {
        return [{ id: 'grid', label: 'الشبكة بالكامل' }]
    }
    return cellItems.value.map(item => ({ id: item.id, label: item.label }))
})

const isRowSelection = computed(() => selectedId.value.startsWith('row:') && selectedId.value.split(':').length === 2)
const isColumnSelection = computed(() => selectedId.value.startsWith('column:'))

const selectedBoxes = computed<LiveMatchStatsFieldBox[]>(() => {
    const id = selectedId.value
    if (id === 'frame') return []
    if (id === 'grid') return collectGridBoxes()
    if (id === 'logo') return [draft.value.logo]
    if (id === 'team1Logo') return [draft.value.team1Logo]
    if (id === 'team2Logo') return [draft.value.team2Logo]
    if (id === 'team1Name') return [draft.value.team1Name]
    if (id === 'team2Name') return [draft.value.team2Name]

    if (id.startsWith('column:')) {
        const key = id.slice('column:'.length) as LiveMatchStatsColumnKey
        return columnItems.value.find(column => column.columnKey === key)?.boxes ?? []
    }

    if (id.startsWith('row:') && id.split(':').length === 2) {
        const rowIndex = Number(id.split(':')[1])
        const row = draft.value.rows[rowIndex]
        return row ? [row.label, row.team1Value, row.team2Value] : []
    }

    const match = /^row:(\d+):(label|team1Value|team2Value)$/.exec(id)
    if (!match) return []
    const row = draft.value.rows[Number(match[1])]
    if (!row) return []
    const key = match[2] as 'label' | 'team1Value' | 'team2Value'
    return [row[key]]
})

const sharedColor = computed(() => selectedBoxes.value[0]?.color || '#ffffff')
const sharedAlign = computed(() => selectedBoxes.value[0]?.align || 'center')

watch(selectionMode, (mode) => {
    if (mode === 'row') {
        selectedId.value = rowItems.value[0]?.id ?? 'logo'
    }
    else if (mode === 'column') {
        selectedId.value = columnItems.value[0]?.id ?? 'logo'
    }
    else if (mode === 'grid') {
        selectedId.value = 'grid'
    }
    else if (
        selectedId.value === 'grid'
        || selectedId.value.startsWith('row:')
        || selectedId.value.startsWith('column:')
    ) {
        selectedId.value = 'logo'
    }
})

function isItemSelected(id: string) {
    if (selectedId.value === id) return true
    if (selectionMode.value === 'grid' && id.startsWith('row:')) return true
    if (selectionMode.value === 'column' && id.startsWith('row:')) {
        const key = id.split(':')[2]
        return selectedId.value === `column:${key}`
    }
    if (selectionMode.value === 'row' && id.startsWith('row:')) {
        return selectedId.value === `row:${id.split(':')[1]}`
    }
    return false
}

function syncGridOriginFromRows() {
    const first = draft.value.rows[0]
    if (!first) return
    draft.value.grid.x = first.team1Value.x
    draft.value.grid.y = first.team1Value.y
}

function onGridGeometryChange() {
    reflowLiveMatchStatsGrid(draft.value)
    selectedId.value = 'grid'
}

function sharedNumber(key: 'x' | 'y' | 'w' | 'h' | 'fontSize') {
    const first = selectedBoxes.value[0]
    if (!first) return 0
    return first[key]
}

function onSharedNumberInput(key: 'x' | 'y' | 'w' | 'h' | 'fontSize', event: Event) {
    const value = Number((event.target as HTMLInputElement).value)
    if (!Number.isFinite(value)) return
    for (const box of selectedBoxes.value) box[key] = value
}

function onSharedColorInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    for (const box of selectedBoxes.value) box.color = value
}

function onSharedAlignInput(event: Event) {
    const value = (event.target as HTMLSelectElement).value as LiveMatchStatsAlign
    for (const box of selectedBoxes.value) box.align = value
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

function updatePreviewScale() {
    if (!import.meta.client) return
    const { width, height } = draft.value.canvas
    const availableW = Math.max(320, window.innerWidth - 380)
    const availableH = window.innerHeight
    previewScale.value = Math.min(availableW / width, availableH / height, 1)
}

function syncDraftFromStorage() {
    loadFromStorage()
    draft.value = normalizeLiveMatchStatsLayout(
        JSON.parse(JSON.stringify(storedLayout.value)) as LiveMatchStatsLayout,
    )
}

function save() {
    const ok = saveToStorage(draft.value)
    status.value = ok ? 'تم الحفظ في المتصفح (localStorage)' : 'تعذر الحفظ'
}

function reset() {
    resetToDefault()
    draft.value = normalizeLiveMatchStatsLayout(
        JSON.parse(JSON.stringify(storedLayout.value)) as LiveMatchStatsLayout,
    )
    status.value = 'تمت إعادة التخطيط الافتراضي'
}

function downloadJson() {
    const blob = new Blob([JSON.stringify(draft.value, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'live-match-stats-layout.json'
    a.click()
    URL.revokeObjectURL(url)
    status.value = 'تم تصدير JSON'
}

async function onImportFile(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    try {
        const text = await file.text()
        importJson(text)
        draft.value = normalizeLiveMatchStatsLayout(
            JSON.parse(JSON.stringify(storedLayout.value)) as LiveMatchStatsLayout,
        )
        status.value = 'تم استيراد JSON وحفظه'
    }
    catch {
        status.value = 'ملف JSON غير صالح'
    }
    finally {
        input.value = ''
    }
}

let dragId: string | null = null
let dragOrigins: Array<{ box: { x: number, y: number }, x: number, y: number }> = []
let dragPointer = { x: 0, y: 0 }

function startDrag(event: PointerEvent, id: string) {
    if (selectionMode.value === 'grid') {
        selectedId.value = 'grid'
    }
    else if (selectionMode.value === 'row' && id.startsWith('row:') && id.split(':').length === 3) {
        selectedId.value = `row:${id.split(':')[1]}`
    }
    else if (selectionMode.value === 'column' && id.startsWith('row:') && id.split(':').length === 3) {
        selectedId.value = `column:${id.split(':')[2]}`
    }
    else {
        selectedId.value = id
    }

    dragId = selectedId.value
    dragPointer = { x: event.clientX, y: event.clientY }

    if (selectedId.value === 'frame') {
        const frame = draft.value.frame
        dragOrigins = [{ box: frame, x: frame.x, y: frame.y }]
    }
    else {
        const boxes = selectedBoxes.value
        if (!boxes.length) return
        dragOrigins = boxes.map(box => ({ box, x: box.x, y: box.y }))
    }

    window.addEventListener('pointermove', onDragMove)
    window.addEventListener('pointerup', onDragEnd)
}

function onDragMove(event: PointerEvent) {
    if (!dragId || !dragOrigins.length) return
    const dx = (event.clientX - dragPointer.x) / previewScale.value
    const dy = (event.clientY - dragPointer.y) / previewScale.value
    const lockX = dragId.startsWith('row:') && dragId.split(':').length === 2
    const lockY = dragId.startsWith('column:')
    for (const origin of dragOrigins) {
        origin.box.x = Math.round(origin.x + (lockX ? 0 : dx))
        origin.box.y = Math.round(origin.y + (lockY ? 0 : dy))
    }
}

function onDragEnd() {
    if (dragId === 'grid') {
        syncGridOriginFromRows()
    }
    dragId = null
    dragOrigins = []
    window.removeEventListener('pointermove', onDragMove)
    window.removeEventListener('pointerup', onDragEnd)
}

onMounted(() => {
    syncDraftFromStorage()
    updatePreviewScale()
    window.addEventListener('resize', updatePreviewScale)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updatePreviewScale)
    window.removeEventListener('pointermove', onDragMove)
    window.removeEventListener('pointerup', onDragEnd)
})
</script>
