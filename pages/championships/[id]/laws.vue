<template>
    <div>
        <MarkdownRender v-if="champ.laws !== ''" :markdownString="champ.laws" />
        <div v-else class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center py-10">
            <Icon name="line-md:alert-circle" class="block text-9xl" />
            <h3>لا توجد قوانين حاليا</h3>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IChamp } from "@/Models/IChamp"
const props = defineProps({
    champ: {
        required: true,
        type: Object as PropType<IChamp>
    }
});
useHead({
    title: `قوانين البطولة - ${props.champ.name}`,
    meta: [
        {
            name: 'description',
            content: `تعرف على قوانين وقواعد بطولة ${props.champ.name}. الأنظمة، الشروط، واللوائح التي تحكم المنافسة.`
        },
        {
            property: 'og:title',
            content: `قوانين البطولة - ${props.champ.name}`
        },
        {
            property: 'og:description',
            content: `تعرف على قوانين وقواعد بطولة ${props.champ.name}. الأنظمة، الشروط، واللوائح التي تحكم المنافسة.`
        }
    ]
})


</script>

<style lang="scss" scoped></style>