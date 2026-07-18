<template>
    <article
        class="clickable flex items-center justify-center gap-2 overflow-hidden rounded-zat-sm bg-surface-base p-2 transition-colors hover:bg-surface-overlay/60"
        role="link"
        tabindex="0"
        @click="goToChampionship"
        @keydown.enter="goToChampionship"
    >
    <div class="flex size-20 shrink-0 items-center justify-center p-2">
        <Image
            v-if="champion.url"
            :src="mediaBaseUrl + champion.url"
            :alt="champion.name"
            icon="i-heroicons-trophy"
            class="size-16 object-contain"
        />
        <UIcon v-else name="i-heroicons-trophy" class="size-10 text-zat-500" />
    </div>
        <div class="flex min-w-0 flex-1 flex-col items-start justify-center gap-2 text-right">
            <h3 class="w-full text-base font-bold leading-7 text-text-body">
                {{ champion.name }}
            </h3>
            <p class="line-clamp-3 w-full text-xs leading-6 text-text-subtitle truncate">
                {{ champion.description || '—' }}
            </p>
        </div>

    </article>
</template>

<script setup lang="ts">
import type { IChamp } from '@/Models/IChamp'

const props = defineProps<{
    champion: IChamp
    mediaBaseUrl: string
}>()

function goToChampionship() {
    navigateTo(`/championships/${props.champion.leagueid}`)
}
</script>
