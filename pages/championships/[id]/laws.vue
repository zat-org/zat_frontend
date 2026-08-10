<template>
    <div
        class="flex w-full flex-col gap-6"
        dir="rtl"
    >
        <ChampionshipsLawsIntro />

        <section
            id="champ-laws"
            class="scroll-mt-24"
            aria-label="قوانين البطولة"
        >
            <!-- <MarkdownRender
                v-if="hasLaws"
                :markdown-string="champ.laws"
                class="rounded-zat-md bg-surface-raised p-4 sm:p-6"
            />
            <div
                v-else
                class="flex min-h-50 flex-col items-center justify-center gap-2 py-10 text-lg text-text-caption"
            >
                <UIcon
                    name="i-heroicons-exclamation-circle"
                    class="size-16"
                />
                <h3>لا توجد قوانين حاليا</h3>
            </div> -->
        </section>
    </div>
</template>

<script setup lang="ts">
import type { IChamp } from '~/features/championships/types/IChamp'

const props = defineProps<{
    champ: IChamp
}>()

const hasLaws = computed(() => Boolean(props.champ.laws?.trim()))

useHead({
    title: `قوانين البطولة - ${props.champ.name}`,
    meta: [
        {
            name: 'description',
            content: `تعرف على قوانين وقواعد بطولة ${props.champ.name}. الأنظمة، الشروط، واللوائح التي تحكم المنافسة.`,
        },
        {
            property: 'og:title',
            content: `قوانين البطولة - ${props.champ.name}`,
        },
        {
            property: 'og:description',
            content: `تعرف على قوانين وقواعد بطولة ${props.champ.name}. الأنظمة، الشروط، واللوائح التي تحكم المنافسة.`,
        },
    ],
})
</script>
