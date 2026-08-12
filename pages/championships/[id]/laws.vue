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
            <UAccordion
                :items="accordionItems"
                :default-value="hasLaws ? '0' : undefined"
                trailing-icon="i-heroicons-chevron-left-20-solid"
                :ui="accordionUi"
            >
                <template #body>
                    <MarkdownRender
                        v-if="hasLaws"
                        :markdown-string="champ.laws"
                        class="prose-h2:py-1 prose-li:marker:text-amber-600 prose-hr:border-amber-500 prose-hr:py-1 prose-ol:p-0 prose-ol:pr-[1.625rem] prose-ul:p-0 prose-ul:pr-[1.625rem]"
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
                    </div>
                </template>
            </UAccordion>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'
import type { IChamp } from '~/features/championships/types/IChamp'

const props = defineProps<{
    champ: IChamp
}>()

const hasLaws = computed(() => Boolean(props.champ.laws?.trim()))

const accordionItems: AccordionItem[] = [{
    label: 'قوانين البطولة',
    icon: 'zat:library',
}]

const accordionUi = {
    root: 'w-full',
    item: 'border-0',
    trigger: 'group flex h-12 w-full items-center gap-2 rounded-t-zat-md bg-surface-overlay px-5 text-lg font-semibold text-text-heading data-[state=closed]:rounded-b-zat-md',
    body: 'rounded-b-zat-md bg-surface-raised px-4 py-4 text-text-heading sm:px-6',
    leadingIcon: 'size-5 text-text-action',
    trailingIcon: 'size-5 shrink-0 ms-auto transition-transform duration-200 group-data-[state=open]:-rotate-90',
    label: 'truncate grow text-right',
}

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
