<template>
    <div class="w-full bg-white rounded-xl text-gray-800 py-5 dark:bg-slate-800 dark:text-slate-50">
        <MatchDetailsState :match="$props.match" />
        <MatchDetailsPlayers :match="$props.match" />
        <MatchDetailsReferees :match="$props.match" />
        <MatchDetailsStatistics :match="$props.match" />
    </div>
</template>

<script setup lang="ts">

defineProps(["match"])
</script>

<style scoped></style>
