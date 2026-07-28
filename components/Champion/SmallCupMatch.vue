<template>
    <article
        class="flex w-full max-w-[360px] items-center justify-between gap-2 overflow-hidden rounded-lg border border-surface-tone2 bg-[#F0F0F0] px-3 py-2"
        dir="rtl"
    >
        <div class="flex min-w-0 flex-1 items-center gap-2">
            <div class="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-[#F0F0F0]">
                <Image
                    v-if="match.team2?.logoUrl"
                    :src="mediaBaseUrl + match.team2.logoUrl"
                    :alt="match.team2.name"
                    icon="i-heroicons-user-group"
                    class="size-6 object-contain"
                />
                <UIcon v-else name="i-heroicons-question-mark-circle" class="size-5 text-text-caption" />
            </div>
            <p class="min-w-0 flex-1 truncate text-xs font-semibold text-text-body">
                {{ match.team2?.name ?? '—' }}
            </p>
        </div>

        <p class="shrink-0 text-xs font-bold text-text-caption">
            {{ scoreLine }}
        </p>

        <div class="flex min-w-0 flex-1 items-center justify-end gap-2">
            <p class="min-w-0 flex-1 truncate text-end text-xs font-semibold text-text-body">
                {{ match.team1?.name ?? '—' }}
            </p>
            <div class="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-[#F0F0F0]">
                <Image
                    v-if="match.team1?.logoUrl"
                    :src="mediaBaseUrl + match.team1.logoUrl"
                    :alt="match.team1.name"
                    icon="i-heroicons-user-group"
                    class="size-6 object-contain"
                />
                <UIcon v-else name="i-heroicons-question-mark-circle" class="size-5 text-text-caption" />
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import MatchState from '@/Models/MatchState'
import type { ICupMatchData } from '@/Models/ICupSummary'

const props = defineProps<{ match: ICupMatchData }>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl

const scoreLine = computed(() => {
    if (props.match.matchState === MatchState.Done || props.match.matchState === MatchState.Live) {
        return `${props.match.team2Score} - ${props.match.team1Score}`
    }
    return '—'
})
</script>
