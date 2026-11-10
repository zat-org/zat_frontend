<template>
    <div class="flex h-dvh w-screen overflow-hidden bg-neutral-950 text-white">
        <!-- Preview -->
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

                <!-- Cell / logo / header boxes -->
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

                <!-- Row hit areas (select / drag whole row) -->
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

                <!-- Column hit areas (select / drag whole column) -->
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
            </div>
        </div>

        <!-- Controls -->
        <aside class="flex w-[380px] shrink-0 flex-col gap-3 overflow-y-auto border-l border-white/10 bg-neutral-900 p-4">
            <h1 class="text-lg font-bold">
                محرر جدول البث
            </h1>
            <p class="text-xs text-white/60">
                يمكن تحديد خلية أو صف أو عمود كامل. الخلفية بدون تمديد (object-contain).
            </p>

            <label class="flex flex-col gap-1 text-sm">
                <span class="text-white/70">خلفية (مسار)</span>
                <input
                    v-model="draft.background"
                    class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                >
            </label>

            <section class="rounded border border-white/10 bg-black/25 p-3">
                <h2 class="mb-2 text-sm font-bold text-white/90">
                    إطار الصورة
                </h2>
                <p class="mb-2 text-[11px] text-white/50">
                    صغّر الإطار لإظهار شعار أكبر في أعلى الوسط. خارج الإطار شفاف (OBS).
                </p>
                <div class="grid grid-cols-2 gap-2">
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Frame X</span>
                        <input
                            v-model.number="draft.frame.x"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Frame Y</span>
                        <input
                            v-model.number="draft.frame.y"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Frame W</span>
                        <input
                            v-model.number="draft.frame.w"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Frame H</span>
                        <input
                            v-model.number="draft.frame.h"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                        >
                    </label>
                </div>
            </section>

            <section class="rounded border border-white/10 bg-black/25 p-3">
                <h2 class="mb-2 text-sm font-bold text-white/90">
                    إعدادات الجدول
                </h2>
                <div class="grid grid-cols-2 gap-2">
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Table X</span>
                        <input
                            v-model.number="draft.table.x"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                            @change="onTableGeometryChange"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Table Y</span>
                        <input
                            v-model.number="draft.table.y"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                            @change="onTableGeometryChange"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Gap X</span>
                        <input
                            v-model.number="draft.table.gapX"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                            @change="onTableGeometryChange"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Gap Y</span>
                        <input
                            v-model.number="draft.table.gapY"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                            @change="onTableGeometryChange"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Cell W</span>
                        <input
                            v-model.number="draft.table.cellW"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                            @change="onTableGeometryChange"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Cell H</span>
                        <input
                            v-model.number="draft.table.cellH"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                            @change="onTableGeometryChange"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Header H</span>
                        <input
                            v-model.number="draft.table.headerH"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                            @change="onTableGeometryChange"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Header Gap</span>
                        <input
                            v-model.number="draft.table.headerGap"
                            type="number"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                            @change="onTableGeometryChange"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Cell BG</span>
                        <div class="flex items-center gap-2">
                            <input
                                :value="draft.table.cellBgColor || '#ffffff'"
                                type="color"
                                class="h-9 w-12 rounded border border-white/15 bg-black/40"
                                @input="onTableCellBgInput"
                            >
                            <button
                                type="button"
                                class="rounded border border-white/15 px-2 py-1 text-[11px] text-white/70 hover:bg-white/10"
                                @click="clearTableCellBg"
                            >
                                شفاف
                            </button>
                        </div>
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Header BG</span>
                        <div class="flex items-center gap-2">
                            <input
                                :value="draft.table.headerBgColor || '#ffffff'"
                                type="color"
                                class="h-9 w-12 rounded border border-white/15 bg-black/40"
                                @input="onTableHeaderBgInput"
                            >
                            <button
                                type="button"
                                class="rounded border border-white/15 px-2 py-1 text-[11px] text-white/70 hover:bg-white/10"
                                @click="clearTableHeaderBg"
                            >
                                شفاف
                            </button>
                        </div>
                    </label>
                </div>
            </section>

            <label class="flex flex-col gap-1 text-sm">
                <span class="text-white/70">وضع التحديد</span>
                <select
                    v-model="selectionMode"
                    class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                >
                    <option value="cell">
                        خلية
                    </option>
                    <option value="row">
                        صف كامل
                    </option>
                    <option value="column">
                        عمود كامل
                    </option>
                </select>
            </label>

            <label class="flex flex-col gap-1 text-sm">
                <span class="text-white/70">العنصر المحدد</span>
                <select
                    v-model="selectedId"
                    class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm"
                >
                    <optgroup label="عام">
                        <option value="frame">
                            إطار الخلفية
                        </option>
                        <option value="logo">
                            شعار البطولة
                        </option>
                    </optgroup>
                    <optgroup
                        v-if="selectionMode !== 'column'"
                        label="عناوين"
                    >
                        <option
                            v-for="item in headerItems"
                            :key="item.id"
                            :value="item.id"
                        >
                            {{ item.label }}
                        </option>
                    </optgroup>
                    <optgroup
                        v-if="selectionMode !== 'column'"
                        label="صفوف"
                    >
                        <option
                            v-for="row in rowItems"
                            :key="row.id"
                            :value="row.id"
                        >
                            {{ row.label }}
                        </option>
                    </optgroup>
                    <optgroup
                        v-if="selectionMode !== 'row'"
                        label="أعمدة"
                    >
                        <option
                            v-for="column in columnItems"
                            :key="column.id"
                            :value="column.id"
                        >
                            {{ column.label }}
                        </option>
                    </optgroup>
                    <optgroup
                        v-if="selectionMode === 'cell'"
                        label="خلايا"
                    >
                        <option
                            v-for="item in dataCellItems"
                            :key="item.id"
                            :value="item.id"
                        >
                            {{ item.label }}
                        </option>
                    </optgroup>
                </select>
            </label>

            <template v-if="selectedBoxes.length">
                <p
                    v-if="isRowSelection"
                    class="text-xs text-fuchsia-300"
                >
                    صف محدد: {{ selectedBoxes.length }} خلايا — السحب يحرّك الصف بالكامل
                </p>
                <p
                    v-else-if="isColumnSelection"
                    class="text-xs text-cyan-300"
                >
                    عمود محدد: {{ selectedBoxes.length }} خلايا — السحب يحرّك العمود بالكامل
                </p>

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
                        <span class="text-white/70">Width</span>
                        <input
                            :value="sharedNumber('w')"
                            type="number"
                            :disabled="isRowSelection"
                            class="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm disabled:opacity-40"
                            @change="onSharedNumberInput('w', $event)"
                        >
                    </label>
                    <label class="flex flex-col gap-1 text-xs">
                        <span class="text-white/70">Height</span>
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
                    <span class="text-white/70">خلفية الخلية</span>
                    <div class="flex items-center gap-2">
                        <input
                            :value="sharedBgColor || '#000000'"
                            type="color"
                            class="h-10 flex-1 rounded border border-white/15 bg-black/40"
                            @input="onSharedBgColorInput"
                        >
                        <button
                            type="button"
                            class="rounded border border-white/15 px-2 py-2 text-xs text-white/70 hover:bg-white/10"
                            @click="clearSharedBgColor"
                        >
                            شفاف
                        </button>
                    </div>
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
import ChampType from '~/features/championships/types/ChampType'
import {
    applyTableBackgrounds,
    createDefaultLiveTableLayout,
    normalizeLiveTableLayout,
    reflowLiveTableLayout,
} from '~/features/championships/live-table/defaultLayout'
import type {
    LiveTableAlign,
    LiveTableFieldBox,
    LiveTableLayout,
} from '~/features/championships/live-table/types'
import { useLiveTableLayout } from '~/features/championships/composables/useLiveTableLayout'

type EditableItem = {
    id: string
    label: string
    preview: string
    box: LiveTableFieldBox
}

type RowItem = {
    id: string
    label: string
    rowIndex: number
    bounds: LiveTableFieldBox
    boxes: LiveTableFieldBox[]
}

type ColumnItem = {
    id: string
    label: string
    columnKey: string
    bounds: LiveTableFieldBox
    boxes: LiveTableFieldBox[]
}

const {
    layout: storedLayout,
    saveToStorage,
    resetToDefault,
    importJson,
    loadFromStorage,
} = useLiveTableLayout(ChampType.LEAGUE)

const draft = ref<LiveTableLayout>(createDefaultLiveTableLayout(ChampType.LEAGUE))
const selectedId = ref('logo')
const selectionMode = ref<'cell' | 'row' | 'column'>('row')
const status = ref('')
const previewScale = ref(1)

const headerItems = computed<EditableItem[]>(() =>
    draft.value.columns.flatMap((column) => {
        const header = draft.value.headers[column.key]
        if (!header) return []
        return [{
            id: `header:${column.key}`,
            label: `عنوان: ${column.label || column.key}`,
            preview: column.label || column.key,
            box: header,
        }]
    }),
)

const dataCellItems = computed<EditableItem[]>(() => {
    const items: EditableItem[] = []
    draft.value.cells.forEach((row, rowIndex) => {
        for (const column of draft.value.columns) {
            const cell = row[column.key]
            if (!cell) continue
            items.push({
                id: `cell:${rowIndex}:${column.key}`,
                label: `صف ${rowIndex + 1} / ${column.label || column.key}`,
                preview: column.key === 'team' ? '⚽' : column.key === 'rank' ? String(rowIndex + 1) : '0',
                box: cell,
            })
        }
    })
    return items
})

const cellItems = computed<EditableItem[]>(() => [
    {
        id: 'logo',
        label: 'شعار البطولة',
        preview: 'LOGO',
        box: draft.value.logo,
    },
    ...headerItems.value,
    ...dataCellItems.value,
])

const rowItems = computed<RowItem[]>(() =>
    draft.value.cells.map((row, rowIndex) => {
        const boxes = draft.value.columns
            .map((column) => row[column.key])
            .filter((box): box is LiveTableFieldBox => Boolean(box))

        const minX = Math.min(...boxes.map((box) => box.x))
        const minY = Math.min(...boxes.map((box) => box.y))
        const maxX = Math.max(...boxes.map((box) => box.x + box.w))
        const maxY = Math.max(...boxes.map((box) => box.y + box.h))

        return {
            id: `row:${rowIndex}`,
            label: `صف ${rowIndex + 1} (كل الخلايا)`,
            rowIndex,
            boxes,
            bounds: {
                x: minX,
                y: minY,
                w: maxX - minX,
                h: maxY - minY,
                fontSize: 0,
                color: '#ffffff',
                bgColor: '',
                align: 'center',
            },
        }
    }),
)

const columnItems = computed<ColumnItem[]>(() =>
    draft.value.columns.map((column) => {
        const boxes: LiveTableFieldBox[] = []
        const header = draft.value.headers[column.key]
        if (header) boxes.push(header)
        for (const row of draft.value.cells) {
            const cell = row[column.key]
            if (cell) boxes.push(cell)
        }

        const minX = Math.min(...boxes.map((box) => box.x))
        const minY = Math.min(...boxes.map((box) => box.y))
        const maxX = Math.max(...boxes.map((box) => box.x + box.w))
        const maxY = Math.max(...boxes.map((box) => box.y + box.h))

        return {
            id: `column:${column.key}`,
            label: `عمود: ${column.label || column.key}`,
            columnKey: column.key,
            boxes,
            bounds: {
                x: minX,
                y: minY,
                w: maxX - minX,
                h: maxY - minY,
                fontSize: 0,
                color: '#ffffff',
                bgColor: '',
                align: 'center',
            },
        }
    }),
)

const isRowSelection = computed(() => selectedId.value.startsWith('row:'))
const isColumnSelection = computed(() => selectedId.value.startsWith('column:'))

const selectedBoxes = computed<LiveTableFieldBox[]>(() => {
    if (selectedId.value === 'logo') return [draft.value.logo]

    if (selectedId.value.startsWith('header:')) {
        const key = selectedId.value.slice('header:'.length)
        const box = draft.value.headers[key]
        return box ? [box] : []
    }

    if (selectedId.value.startsWith('row:')) {
        const rowIndex = Number(selectedId.value.slice('row:'.length))
        return rowItems.value.find((row) => row.rowIndex === rowIndex)?.boxes ?? []
    }

    if (selectedId.value.startsWith('column:')) {
        const key = selectedId.value.slice('column:'.length)
        return columnItems.value.find((column) => column.columnKey === key)?.boxes ?? []
    }

    if (selectedId.value.startsWith('cell:')) {
        const item = dataCellItems.value.find((entry) => entry.id === selectedId.value)
        return item ? [item.box] : []
    }

    return []
})

watch(selectionMode, (mode) => {
    if (mode === 'row') {
        if (selectedId.value.startsWith('cell:')) {
            selectedId.value = `row:${selectedId.value.split(':')[1]}`
        }
        else if (selectedId.value.startsWith('column:') || selectedId.value.startsWith('header:')) {
            selectedId.value = rowItems.value[0]?.id ?? 'logo'
        }
        return
    }

    if (mode === 'column') {
        if (selectedId.value.startsWith('cell:')) {
            selectedId.value = `column:${selectedId.value.split(':')[2]}`
        }
        else if (selectedId.value.startsWith('header:')) {
            selectedId.value = `column:${selectedId.value.slice('header:'.length)}`
        }
        else if (selectedId.value.startsWith('row:')) {
            selectedId.value = columnItems.value[0]?.id ?? 'logo'
        }
    }
})

function isItemSelected(id: string) {
    if (selectedId.value === id) return true

    if (selectedId.value.startsWith('row:')) {
        if (!id.startsWith('cell:')) return false
        const rowIndex = selectedId.value.slice('row:'.length)
        return id.startsWith(`cell:${rowIndex}:`)
    }

    if (selectedId.value.startsWith('column:')) {
        const key = selectedId.value.slice('column:'.length)
        if (id === `header:${key}`) return true
        if (!id.startsWith('cell:')) return false
        return id.split(':')[2] === key
    }

    return false
}

function sharedNumber(key: keyof Pick<LiveTableFieldBox, 'x' | 'y' | 'w' | 'h' | 'fontSize'>) {
    const first = selectedBoxes.value[0]
    if (!first) return 0
    if (selectedBoxes.value.every((box) => box[key] === first[key])) return first[key]
    return first[key]
}

const sharedColor = computed(() => selectedBoxes.value[0]?.color ?? '#ffffff')
const sharedBgColor = computed(() => selectedBoxes.value[0]?.bgColor ?? '')
const sharedAlign = computed(() => selectedBoxes.value[0]?.align ?? 'center')

function onTableGeometryChange() {
    reflowLiveTableLayout(draft.value)
}

function onTableCellBgInput(event: Event) {
    draft.value.table.cellBgColor = (event.target as HTMLInputElement).value
    applyTableBackgrounds(draft.value)
}

function onTableHeaderBgInput(event: Event) {
    draft.value.table.headerBgColor = (event.target as HTMLInputElement).value
    applyTableBackgrounds(draft.value)
}

function clearTableCellBg() {
    draft.value.table.cellBgColor = ''
    applyTableBackgrounds(draft.value)
}

function clearTableHeaderBg() {
    draft.value.table.headerBgColor = ''
    applyTableBackgrounds(draft.value)
}

function onSharedNumberInput(
    key: keyof Pick<LiveTableFieldBox, 'x' | 'y' | 'w' | 'h' | 'fontSize'>,
    event: Event,
) {
    const value = Number((event.target as HTMLInputElement).value)
    if (!Number.isFinite(value)) return

    if (key === 'y' && isRowSelection.value) {
        const currentY = selectedBoxes.value[0]?.y ?? 0
        const delta = value - currentY
        for (const box of selectedBoxes.value) box.y = Math.round(box.y + delta)
        return
    }

    if (key === 'x' && isColumnSelection.value) {
        const currentX = selectedBoxes.value[0]?.x ?? 0
        const delta = value - currentX
        for (const box of selectedBoxes.value) box.x = Math.round(box.x + delta)
        return
    }

    if (key === 'w' && isColumnSelection.value) {
        for (const box of selectedBoxes.value) box.w = value
        return
    }

    if (key === 'h' && isRowSelection.value) {
        for (const box of selectedBoxes.value) box.h = value
        return
    }

    if (key === 'fontSize') {
        for (const box of selectedBoxes.value) box.fontSize = value
        return
    }

    if (selectedBoxes.value.length === 1) {
        selectedBoxes.value[0][key] = value
    }
}

function onSharedColorInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    for (const box of selectedBoxes.value) box.color = value
}

function onSharedBgColorInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    for (const box of selectedBoxes.value) box.bgColor = value
}

function clearSharedBgColor() {
    for (const box of selectedBoxes.value) box.bgColor = ''
}

function onSharedAlignInput(event: Event) {
    const value = (event.target as HTMLSelectElement).value as LiveTableAlign
    for (const box of selectedBoxes.value) box.align = value
}

function boxStyle(box: LiveTableFieldBox) {
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
    draft.value = normalizeLiveTableLayout(
        JSON.parse(JSON.stringify(storedLayout.value)) as LiveTableLayout,
    )
}

function save() {
    const ok = saveToStorage(draft.value)
    status.value = ok ? 'تم الحفظ في المتصفح (localStorage)' : 'تعذر الحفظ'
}

function reset() {
    resetToDefault()
    draft.value = normalizeLiveTableLayout(
        JSON.parse(JSON.stringify(storedLayout.value)) as LiveTableLayout,
    )
    status.value = 'تمت إعادة التخطيط الافتراضي'
}

function downloadJson() {
    const blob = new Blob([JSON.stringify(draft.value, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'live-table-layout.json'
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
        draft.value = normalizeLiveTableLayout(
            JSON.parse(JSON.stringify(storedLayout.value)) as LiveTableLayout,
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
    // In row/column mode, clicking a cell selects its group.
    if (selectionMode.value === 'row' && id.startsWith('cell:')) {
        const rowIndex = id.split(':')[1]
        selectedId.value = `row:${rowIndex}`
    }
    else if (selectionMode.value === 'column' && id.startsWith('cell:')) {
        const key = id.split(':')[2]
        selectedId.value = `column:${key}`
    }
    else if (selectionMode.value === 'column' && id.startsWith('header:')) {
        const key = id.slice('header:'.length)
        selectedId.value = `column:${key}`
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
        dragOrigins = boxes.map((box) => ({ box, x: box.x, y: box.y }))
    }

    window.addEventListener('pointermove', onDragMove)
    window.addEventListener('pointerup', onDragEnd)
}

function onDragMove(event: PointerEvent) {
    if (!dragId || !dragOrigins.length) return
    const dx = (event.clientX - dragPointer.x) / previewScale.value
    const dy = (event.clientY - dragPointer.y) / previewScale.value
    const lockX = dragId.startsWith('row:')
    const lockY = dragId.startsWith('column:')
    for (const origin of dragOrigins) {
        origin.box.x = Math.round(origin.x + (lockX ? 0 : dx))
        origin.box.y = Math.round(origin.y + (lockY ? 0 : dy))
    }
}

function onDragEnd() {
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
