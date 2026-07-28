<template>
    <article
        class="relative flex w-full flex-col gap-2 overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-off-base px-6 py-4"
        dir="rtl"
    >
        <div
            class="pointer-events-none absolute -top-10 inset-s-1/4 size-93 rounded-full bg-white/80 blur-[90px]"
            aria-hidden="true"
        />

        <div class="relative z-10 flex items-center justify-between gap-2">
            <NuxtLink
                :to="matchHref"
                class="flex size-8 items-center justify-center rounded-zat-full text-text-body transition-opacity hover:opacity-70"
                :aria-label="`تفاصيل ${displayTextValue(match.name)}`"
            >
                <UIcon name="zat:external-website" class="size-8" />
            </NuxtLink>

            <h3 class="min-w-0 flex-1 truncate px-2 text-center text-xl font-bold leading-9 text-text-subtitle">
                {{ displayTextValue(match.name) }}
            </h3>

            <a
                v-if="match.url"
                :href="match.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex size-8 items-center justify-center rounded-zat-full text-text-body transition-opacity hover:opacity-70"
                aria-label="مشاهدة على يوتيوب"
            >
                <UIcon name="zat:youtube" class="size-8" />
            </a>
            <span v-else class="size-8" aria-hidden="true" />
        </div>

        <div class="relative z-10 flex items-center justify-center gap-6" dir="ltr">
            <div class="flex min-w-0 flex-col items-center gap-1">
                <div class="flex size-24 items-center justify-center rounded-zat-full bg-surface-off-base p-2">
                    <Image
                        v-if="match.team_1_logo"
                        :src="mediaBaseUrl + match.team_1_logo"
                        :alt="match.team_1_name"
                        icon="i-heroicons-user-group"
                        class="size-20 object-contain"
                    />
                    <UIcon v-else name="i-heroicons-user-group" class="size-10 text-text-caption" />
                </div>
                <p class="max-w-28 truncate text-center text-2xl font-bold leading-12 text-text-body">
                    {{ displayTextValue(match.team_1_name) }}
                </p>
            </div>

            <div class="flex flex-col items-center justify-center gap-2">
                <p class="flex items-center gap-4 font-numbers text-[40px] font-bold leading-16 text-text-action">
                    <span>{{ scoreDisplay(match.team_1_score) }}</span>
                    <span>-</span>
                    <span>{{ scoreDisplay(match.team_2_score) }}</span>
                </p>
                <p class="text-base font-semibold leading-7 text-text-subtitle">
                    النتيجة
                </p>
            </div>

            <div class="flex min-w-0 flex-col items-center gap-1">
                <div class="flex size-24 items-center justify-center rounded-zat-full bg-surface-off-base p-2">
                    <Image
                        v-if="match.team_2_logo"
                        :src="mediaBaseUrl + match.team_2_logo"
                        :alt="match.team_2_name"
                        icon="i-heroicons-user-group"
                        class="size-20 object-contain"
                    />
                    <UIcon v-else name="i-heroicons-user-group" class="size-10 text-text-caption" />
                </div>
                <p class="max-w-28 truncate text-center text-2xl font-bold leading-12 text-text-body">
                    {{ displayTextValue(match.team_2_name) }}
                </p>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import type { IMatchLessDetails } from '@/Models/IMatchLessDetails'
import { displayTextValue } from '~/utils/championWinnerStats'

const props = defineProps<{
    match: IMatchLessDetails
    champId: number | string
}>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl

const matchHref = computed(
    () => `/championships/${props.champId}/match/${props.match.id}`,
)

function scoreDisplay(score: number | null | undefined) {
    if (score === null || score === undefined || Number.isNaN(score)) return '-'
    return String(score)
}
</script>
