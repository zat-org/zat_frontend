<template>
    <a
        :href="studio.url"
        target="_blank"
        rel="noopener noreferrer"
        class="relative flex w-full flex-col gap-2 overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-off-base px-4 pb-2 pt-4 transition-opacity hover:opacity-95"
        dir="rtl"
        :aria-label="`شاهد التحليل: ${displayTextValue(studio.name)}`"
    >
        <div
            class="pointer-events-none absolute -top-7 inset-s-0 size-50 rounded-full bg-white blur-[33px]"
            aria-hidden="true"
        />

        <div class="relative z-10 flex items-center gap-6" dir="ltr">
            <div class="relative min-h-20 min-w-0 flex-1 overflow-hidden rounded-zat-sm bg-surface-raised">
                <img
                    v-if="thumbnail"
                    :src="thumbnail"
                    :alt="displayTextValue(studio.name)"
                    class="absolute inset-0 size-full object-cover"
                    loading="lazy"
                >
                <div
                    v-else
                    class="flex min-h-20 items-center justify-center"
                >
                    <UIcon name="zat:youtube" class="size-8 text-zat-500" />
                </div>
            </div>

            <div class="flex min-w-0 flex-1 flex-col gap-0.5 text-right" dir="rtl">
                <p class="truncate text-xs font-semibold leading-6 text-text-subtitle">
                    {{ displayTextValue(studio.tournament_name) }}
                </p>
                <p class="line-clamp-2 text-base font-semibold leading-7 text-text-body">
                    {{ displayTextValue(studio.name) }}
                </p>
                <p
                    v-if="analystsLabel"
                    class="truncate text-xs font-semibold leading-6 text-text-subtitle"
                >
                    {{ analystsLabel }}
                </p>
            </div>
        </div>

        <div class="relative z-10 flex items-center justify-between gap-2">
            <time
                v-if="displayDate"
                class=" font-numbers text-xs leading-6 text-text-subtitle"
                :datetime="displayDateIso"
            >
                {{ displayDate }}
            </time>
            <span class="inline-flex items-center gap-1 text-xs leading-6 text-text-action">
                شاهد التحليل
                <UIcon name="zat:youtube" class="size-6" />
            </span>
            
        </div>
    </a>
</template>

<script setup lang="ts">
import type { IStudio } from '@/Models/IStudio'
import { displayTextValue } from '~/utils/championWinnerStats'
import { extractYoutubeVideoId, youtubeThumbnailUrl } from '~/utils/youtube'

const props = defineProps<{
    studio: IStudio
}>()

const thumbnail = computed(() => {
    const id = extractYoutubeVideoId(props.studio.url)
    return id ? youtubeThumbnailUrl(id) : null
})

const analystsLabel = computed(() => {
    const names = (props.studio.analysts ?? []).map(a => a.name).filter(Boolean)
    return names.length ? names.join('/') : ''
})

const displayDateIso = computed(() => {
    if (!props.studio.start_at) return undefined
    const date = new Date(props.studio.start_at)
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
})

const displayDate = computed(() => {
    if (!props.studio.start_at) return ''
    const date = new Date(props.studio.start_at)
    if (Number.isNaN(date.getTime())) return ''
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
})
</script>
