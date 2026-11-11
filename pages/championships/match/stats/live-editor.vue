<template>
    <LiveMatchStatsLayoutEditor />
</template>

<script setup lang="ts">
import LiveMatchStatsLayoutEditor from '~/features/matches/live-stats/LiveMatchStatsLayoutEditor.vue'

useHead({
    title: 'محرر إحصائيات المباراة',
})

definePageMeta({
    layout: 'obs',
    name: 'liveMatchStatsLayoutEditor',
})
</script>
