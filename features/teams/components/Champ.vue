<template>
    <NuxtLink
        :to="`/championships/${champ.id}`"
        class="flex items-center gap-3 rounded-zat-md px-2 py-1 transition-opacity hover:opacity-80"
        dir="rtl"
    >
        <div class="flex size-20 shrink-0 items-center justify-center p-2">
            <Image
                v-if="champ.logo"
                :src="mediaBaseUrl + champ.logo"
                :alt="champ.name"
                icon="i-heroicons-trophy"
                class="size-16 object-contain"
            />
            <UIcon
                v-else
                name="i-heroicons-trophy"
                class="size-12 text-zat-500"
            />
        </div>
        <div class="flex min-w-0 flex-1 flex-col  ">
            <p class="w-full truncate text-base font-bold leading-7 text-text-body">
                {{ champ.name }}
            </p>
            <p class="text-xs leading-6 text-text-subtitle">
                موسم {{ seasonYear }}
            </p>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { IChampLessDetails } from '~/features/teams/types/ITeam'

const props = defineProps<{
    champ: IChampLessDetails
}>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl

const seasonYear = computed(() => {
    const date = new Date(props.champ.end_at)
    return Number.isNaN(date.getTime()) ? '—' : date.getFullYear()
})
</script>
