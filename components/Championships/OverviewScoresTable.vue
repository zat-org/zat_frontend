<template>
    <ChampionLeagueTable
        :table="table"
        :logos-by-id="logosById"
        :limit="limit ?? 6"
    />
</template>

<script setup lang="ts">
import type { HezamTeamSummary, LeagueTeamSummary } from '@/Models/IChamp'

defineProps<{
    table: Array<LeagueTeamSummary | HezamTeamSummary>
    logosById?: Record<number, string>
    limit?: number
}>()
</script>
