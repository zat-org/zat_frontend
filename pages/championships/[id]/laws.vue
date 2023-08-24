<template>
    <div>
        <MarkdownRender v-if="(props.leagueData as IChamp).laws !== ''"
            :markdownString="(props.leagueData as IChamp).laws" />
        <div v-else class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center py-10">
            <Icon name="line-md:alert-circle" class="block text-9xl" />
            <h3>لا توجد قوانين حاليا</h3>
        </div>
    </div>
</template>

<script setup lang="ts">
import IChamp from "~/Models/IChamp"

const props = defineProps({
    leagueData: {
        type: Object,
        required: true
    }
})
useHead({
    title: ` قوانين البطولة - ${props.leagueData.name} `,
})


</script>

<style lang="scss" scoped></style>