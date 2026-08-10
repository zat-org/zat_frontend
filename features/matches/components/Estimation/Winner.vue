<template>
    <div class="flex w-full flex-col items-center gap-3">
        <div class="flex items-center justify-center gap-8 sm:gap-16">
            <div class="flex flex-col items-center gap-2">
                <div class="flex size-20 items-center justify-center rounded-full bg-surface-off-base p-2">
                    <Image
                        class="size-16 rounded-full bg-surface-raised object-contain"
                        :src="`${url}${match.team1.logo}`"
                        :alt="match.team1.name"
                        icon="i-heroicons-users"
                    />
                </div>
                <p class="max-w-28 truncate text-center text-base font-bold text-text-body">
                    {{ match.team1.name }}
                </p>
                <MatchEstimationScoreStepper v-model="team1Score" />
            </div>

            <div class="flex flex-col items-center gap-2">
                <div class="flex size-20 items-center justify-center rounded-full bg-surface-off-base p-2">
                    <Image
                        class="size-16 rounded-full bg-surface-raised object-contain"
                        :src="`${url}${match.team2.logo}`"
                        :alt="match.team2.name"
                        icon="i-heroicons-users"
                    />
                </div>
                <p class="max-w-28 truncate text-center text-base font-bold text-text-body">
                    {{ match.team2.name }}
                </p>
                <MatchEstimationScoreStepper v-model="team2Score" />
            </div>
        </div>

        <p class="text-center text-[10px] leading-4 text-text-caption">
            يجب ان تكون النتيجة (2-0) للفريق الفائز او ( 1-1 ) للتعادل
        </p>
        <p v-if="error" class="flex items-center justify-center text-sm text-red-500">
            <UIcon name="i-heroicons-x-circle" class="me-2 size-5" />
            {{ error }}
        </p>
    </div>
</template>

<script setup lang="ts">
import type { IMatchFullDetails } from '~/features/matches/types/IMatchFullDetails'

defineProps<{
    match: IMatchFullDetails
    error: string | null
}>()

const team1Score = defineModel('team1Score', { required: true, type: Number })
const team2Score = defineModel('team2Score', { required: true, type: Number })
const url = useRuntimeConfig().public.apiBaseUrl
</script>
