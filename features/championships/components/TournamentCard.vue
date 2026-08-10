<template>
    <NuxtLink
        :to="`/championships/${champion.leagueid}`"
        class="group relative flex w-full max-w-[302px] flex-col items-center gap-4 rounded-zat-sm p-4 transition-transform duration-300 hover:-translate-y-1"
        :aria-label="champion.name"
    >
        <!-- Bottom panel -->
        <div
            class="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] rounded-zat-sm border border-surface-tone bg-surface-raised shadow-zat-sm transition-[height,box-shadow] duration-300 group-hover:h-[48%] group-hover:shadow-zat"
            aria-hidden="true"
        />

        <!-- Emblem stack -->
        <div class="relative z-10 flex size-40 items-center justify-center rounded-zat-sm p-4">
            <div
                class="pointer-events-none absolute inset-x-0 bottom-[-12px] h-[95px] overflow-hidden"
                aria-hidden="true"
            >
                <img
                    :src="CHAMPIONSHIP_CARD_SHARED.bg"
                    alt=""
                    class="absolute inset-0 size-full object-fill"
                >
            </div>
            <Image
                v-if="champion.url"
                :src="mediaBaseUrl + champion.url"
                :alt="champion.name"
                icon="i-heroicons-trophy"
                class="relative z-10 size-32 object-contain "
            />
            <UIcon
                v-else
                name="i-heroicons-trophy"
                class="relative z-10 size-20 text-text-heading dark:text-text-on-action"
            />
        </div>

        <div class="relative z-10 flex w-full flex-col items-center gap-2 text-center">
            <h3 class="line-clamp-2 w-full text-xl font-bold leading-9 text-text-body">
                {{ champion.name }}
            </h3>
            <p class="line-clamp-1 w-full text-base leading-7 text-text-subtitle">
                {{ champion.description || '—' }}
            </p>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { IChamp } from '~/features/championships/types/IChamp'
import { CHAMPIONSHIP_CARD_SHARED } from '~/features/championships/utils/championshipTypes'

defineProps<{
    champion: IChamp
    mediaBaseUrl: string
}>()
</script>
