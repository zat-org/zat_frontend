<template>
    <div class="cup-bracket-match-node relative w-[360px]">
        <!-- Progression is right → left (early rounds on the right). -->
        <Handle
            id="out"
            type="source"
            :position="Position.Left"
            class="size-2! border-0! bg-[#B9B9B9]!"
        />
        <ChampionCupBracketCard
            :match="data.match"
            :round-label="data.roundLabel"
        />
        <Handle
            id="in"
            type="target"
            :position="Position.Right"
            class="size-2! border-0! bg-[#B9B9B9]!"
        />
    </div>
</template>

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { NodeProps } from '@vue-flow/core'
import type { CupBracketNodeData } from '~/features/championships/utils/cupBracketLayout'

defineProps<NodeProps<CupBracketNodeData>>()
</script>

<style scoped>
.cup-bracket-match-node :deep(.vue-flow__handle) {
    opacity: 0;
}
</style>
