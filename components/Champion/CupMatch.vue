<template>
    <div ref="target" class="z-10 relative"
        :class="{ 'mb-2': !isEven && levelIndex === 0, 'mb-1': isEven || levelIndex !== 0 }">
        <ChampionLargeCupMatch v-show="isVisible" :match="match" />
        <ChampionSmallCupMatch v-show="!isVisible" :match="match" />
    </div>
</template>

<script setup lang="ts">
import type { ICupMatchData } from "@/Models/ICupSummary"
defineProps<{ match: ICupMatchData, isEven: boolean, isVisible: boolean, levelIndex: number }>();

</script>

<style scoped></style>