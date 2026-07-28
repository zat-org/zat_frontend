<template>
    <ClientOnly>
        <div
            class="cup-bracket-tree relative w-full overflow-hidden rounded-zat-md bg-surface-raised"
            :class="variant === 'preview' ? 'h-full min-h-80' : 'h-[min(70vh,720px)] min-h-[420px]'"
            dir="ltr"
        >
            <VueFlow
                :nodes="nodes"
                :edges="edges"
                :node-types="nodeTypes"
                :min-zoom=".5"
                :max-zoom="1.5"
                :default-viewport="{ zoom: 0.85, x: 24, y: 24 }"
                :nodes-draggable="false"
                :nodes-connectable="false"
                :elements-selectable="false"
                :pan-on-drag="variant === 'full'"
                :zoom-on-scroll="variant === 'full'"
                :zoom-on-pinch="variant === 'full'"
                :zoom-on-double-click="false"
                :prevent-scrolling="variant === 'full'"
                fit-view-on-init
                :fit-view-options="{ padding: 0.12, includeHiddenNodes: true }"
                class="h-full w-full"
            >
                <Background
                    v-if="variant === 'full'"
                    :gap="24"
                    :size="1"
                    color="#E8E8E8"
                />
            </VueFlow>
        </div>

        <template #fallback>
            <div
                class="flex items-center justify-center rounded-zat-md bg-surface-raised text-text-caption"
                :class="variant === 'preview' ? 'h-80' : 'min-h-[420px]'"
            >
                جاري تحميل شجرة البطولة...
            </div>
        </template>
    </ClientOnly>
</template>

<script setup lang="ts">
import { Background } from '@vue-flow/background'
import { VueFlow, type NodeTypesObject } from '@vue-flow/core'
import type { ICupMatchData } from '@/Models/ICupSummary'
import { buildCupBracketGraph } from '~/utils/cupBracketLayout'
import CupBracketMatchNode from '~/components/Champion/CupBracketMatchNode.vue'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

const props = withDefaults(defineProps<{
    table: ICupMatchData[][]
    variant?: 'preview' | 'full'
}>(), {
    variant: 'full',
})

const nodeTypes = {
    match: markRaw(CupBracketMatchNode),
} as NodeTypesObject

const graph = computed(() => buildCupBracketGraph(props.table ?? []))
const nodes = computed(() => graph.value.nodes)
const edges = computed(() => graph.value.edges)
</script>

<style scoped>
.cup-bracket-tree :deep(.vue-flow__node) {
    padding: 0;
    border: none;
    background: transparent;
    box-shadow: none;
}

.cup-bracket-tree :deep(.vue-flow__edge-path) {
    stroke: #B9B9B9;
    stroke-width: 1.5;
}

.cup-bracket-tree :deep(.vue-flow__attribution) {
    display: none;
}
</style>
