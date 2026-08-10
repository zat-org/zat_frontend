<template>
    <div
        ref="target"
        class="relative z-10 mb-2 flex w-full justify-center"
    >
        <ChampionLargeCupMatch
            v-show="isVisible"
            :match="match"
            :round-label="roundLabel"
        />
        <ChampionSmallCupMatch v-show="!isVisible" :match="match" />
    </div>
</template>

<script setup lang="ts">
import type { ICupMatchData } from '~/features/championships/types/ICupSummary'

defineProps<{
    match: ICupMatchData
    isEven: boolean
    isVisible: boolean
    levelIndex: number
    roundLabel?: string
}>()
</script>
