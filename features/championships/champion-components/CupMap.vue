<template>
    <div class="relative w-full" dir="rtl">
        <article
            class="relative mx-auto overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-raised"
            aria-label="شجرة البطولة"
        >
            <div class="relative h-64 overflow-hidden p-3 sm:h-86 sm:p-6">
                <ChampionCupBracketTree
                    :table="table"
                    variant="preview"
                />

                <div
                    class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-linear-to-t from-surface-raised via-surface-raised/80 to-transparent sm:h-20"
                    aria-hidden="true"
                />

                <button
                    type="button"
                    class="absolute inset-e-3 top-3 z-20 flex size-9 items-center justify-center rounded-full bg-text-body text-white shadow-[0_2px_16px_4px_rgba(22,19,19,0.25)] transition-opacity hover:opacity-90 sm:inset-e-4 sm:top-4 sm:size-10"
                    aria-label="عرض شجرة البطولة كاملة"
                    @click="isModalOpen = true"
                >
                    <UIcon
                        name="i-heroicons-arrows-pointing-out"
                        class="size-5 sm:size-6"
                    />
                </button>
            </div>
        </article>

        <UModal
            v-model:open="isModalOpen"
            title="شجرة البطولة"
            scrollable
            fullscreen
            :ui="{
                content: 'sm:max-w-none sm:rounded-zat-md',
                body: 'p-2 sm:p-6',
            }"
        >
            <template #body>
                <ChampionCupBracketTree
                    :table="table"
                    variant="full"
                />
            </template>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import type { ICupMatchData } from '~/features/championships/types/ICupSummary'
import ChampionCupBracketTree from '~/features/championships/champion-components/CupBracketTree.vue'

defineProps<{ table: ICupMatchData[][] }>()

const isModalOpen = ref(false)
</script>
