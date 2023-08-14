<template>
    <MarkdownRender :markdownString="(props.leagueData as IChamp).laws" />
</template>

<script setup lang="ts">
import IChamp from "~/Models/IChamp"

const props = defineProps({
    leagueData: {
        type: Object,
        required: true
    }
})


</script>

<style lang="scss" scoped></style>