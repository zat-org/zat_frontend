<template>
    <ChampionCupBracketCard :match="match" :round-label="roundLabel" />
</template>

<script setup lang="ts">
import type { ICupMatchData } from '@/Models/ICupSummary'

defineProps<{
    match: ICupMatchData
    roundLabel?: string
}>()
</script>
