<template>
    <div class="relative w-full" dir="rtl">
        <article
            class="relative mx-auto overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-raised"
            aria-label="شجرة البطولة"
        >
            <div class="relative h-86 overflow-hidden p-6">
                <ChampionCupBracketTree
                    :table="table"
                    variant="preview"
                />

                <div
                    class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-linear-to-t from-surface-raised via-surface-raised/80 to-transparent"
                    aria-hidden="true"
                />

                <button
                    type="button"
                    class="absolute inset-e-4 top-4 z-20 flex size-10 items-center justify-center rounded-full bg-text-body text-white shadow-[0_2px_16px_4px_rgba(22,19,19,0.25)] transition-opacity hover:opacity-90"
                    aria-label="عرض شجرة البطولة كاملة"
                    @click="isModalOpen = true"
                >
                    <UIcon name="i-heroicons-arrows-pointing-out" class="size-6" />
                </button>
            </div>
        </article>

        <UModal
            v-model:open="isModalOpen"
            title="شجرة البطولة"
    
            scrollable
            :ui="{
                content: 'sm:max-w-none',
                body: 'p-4 sm:p-6',
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
import type { ICupMatchData } from '@/Models/ICupSummary'
import ChampionCupBracketTree from '~/components/Champion/CupBracketTree.vue'

defineProps<{ table: ICupMatchData[][] }>()

const isModalOpen = ref(false)
</script>
