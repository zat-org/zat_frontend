<template>
    <article
        class="relative flex w-full flex-col overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-off-base"
        :class="wide ? 'gap-3 px-6 py-5 md:gap-4 md:px-8 md:py-6' : 'gap-2 px-6 py-4'"
        dir="rtl"
    >
        <div
            class="pointer-events-none absolute -top-10 inset-s-1/4 size-93 rounded-full bg-white/80 blur-[90px]"
            :class="wide ? 'md:-top-12 md:size-110 md:blur-[100px]' : ''"
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

            <h3
                class="min-w-0 flex-1 truncate px-2 text-center font-bold text-text-subtitle"
                :class="wide ? 'text-xl leading-9 md:text-2xl md:leading-12' : 'text-xl leading-9'"
            >
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

        <div
            class="relative z-10 flex items-center justify-center"
            :class="wide ? 'gap-6 md:gap-10' : 'gap-6'"
            dir="ltr"
        >
            <div class="flex min-w-0 flex-col items-center gap-1">
                <div
                    class="flex items-center justify-center rounded-zat-full bg-surface-off-base p-2"
                    :class="wide ? 'size-24 md:size-28' : 'size-24'"
                >
                    <Image
                        v-if="match.team_1_logo"
                        :src="mediaBaseUrl + match.team_1_logo"
                        :alt="match.team_1_name"
                        icon="i-heroicons-user-group"
                        :class="wide ? 'size-20 object-contain md:size-24' : 'size-20 object-contain'"
                    />
                    <UIcon v-else name="i-heroicons-user-group" class="size-10 text-text-caption" />
                </div>
                <p
                    class="max-w-28 truncate text-center font-bold text-text-body"
                    :class="wide ? 'text-2xl leading-12 md:max-w-36 md:text-[28px] md:leading-14' : 'text-2xl leading-12'"
                >
                    {{ displayTextValue(match.team_1_name) }}
                </p>
            </div>

            <div class="flex flex-col items-center justify-center gap-2">
                <p
                    class="flex items-center gap-4 font-numbers font-bold text-text-action"
                    :class="wide ? 'text-[40px] leading-16 md:text-[48px] md:leading-20' : 'text-[40px] leading-16'"
                >
                    <span>{{ scoreDisplay(match.team_1_score) }}</span>
                    <span>-</span>
                    <span>{{ scoreDisplay(match.team_2_score) }}</span>
                </p>
                <p
                    class="font-semibold text-text-subtitle"
                    :class="wide ? 'text-base leading-7 md:text-lg md:leading-8' : 'text-base leading-7'"
                >
                    النتيجة
                </p>
            </div>

            <div class="flex min-w-0 flex-col items-center gap-1">
                <div
                    class="flex items-center justify-center rounded-zat-full bg-surface-off-base p-2"
                    :class="wide ? 'size-24 md:size-28' : 'size-24'"
                >
                    <Image
                        v-if="match.team_2_logo"
                        :src="mediaBaseUrl + match.team_2_logo"
                        :alt="match.team_2_name"
                        icon="i-heroicons-user-group"
                        :class="wide ? 'size-20 object-contain md:size-24' : 'size-20 object-contain'"
                    />
                    <UIcon v-else name="i-heroicons-user-group" class="size-10 text-text-caption" />
                </div>
                <p
                    class="max-w-28 truncate text-center font-bold text-text-body"
                    :class="wide ? 'text-2xl leading-12 md:max-w-36 md:text-[28px] md:leading-14' : 'text-2xl leading-12'"
                >
                    {{ displayTextValue(match.team_2_name) }}
                </p>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import type { IMatchLessDetails } from '@/Models/IMatchLessDetails'
import { displayTextValue } from '~/utils/championWinnerStats'

const props = withDefaults(defineProps<{
    match: IMatchLessDetails
    champId: number | string
    wide?: boolean
}>(), {
    wide: false,
})

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl

const matchHref = computed(
    () => `/championships/${props.champId}/match/${props.match.id}`,
)

function scoreDisplay(score: number | null | undefined) {
    if (score === null || score === undefined || Number.isNaN(score)) return '-'
    return String(score)
}
</script>
