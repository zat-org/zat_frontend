<template>
    <div class="w-full bg-white rounded-xl text-gray-800 py-5 dark:bg-slate-800 dark:text-slate-50">
        <MatchDetailsState :match="match" />
        <MatchDetailsPlayers :match="match" />
        <MatchDetailsReferees :match="match" />
        <MatchDetailsStatistics :match="match" />
    </div>
</template>

<script setup lang="ts">
import type { IMatchFullDetails } from "@/Models/IMatchFullDetails"
defineProps({
    match: {
        required: true,
        type: Object as PropType<IMatchFullDetails>
    }
});

</script>

<style scoped></style>
