<template>
    <a
        :href="studio.url"
        target="_blank"
        rel="noopener noreferrer"
        class="relative flex w-full flex-col overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-off-base transition-opacity hover:opacity-95"
        :class="wide
            ? 'gap-3 px-5 pb-3 pt-5 md:gap-4 md:px-6 md:pb-4 md:pt-6'
            : 'gap-2 px-4 pb-2 pt-4'"
        dir="rtl"
        :aria-label="`شاهد التحليل: ${displayTextValue(studio.name)}`"
    >
        <div
            class="pointer-events-none absolute -top-7 inset-s-0 size-50 rounded-full bg-white blur-[33px]"
            :class="wide ? 'md:-top-10 md:size-64 md:blur-[44px]' : ''"
            aria-hidden="true"
        />

        <div
            class="relative z-10 flex items-center"
            :class="wide ? 'gap-6 md:gap-8' : 'gap-6'"
            dir="ltr"
        >
            <div
                class="relative min-w-0 flex-1 overflow-hidden rounded-zat-sm bg-surface-raised"
                :class="wide ? 'min-h-28 md:min-h-40 lg:min-h-44' : 'min-h-20'"
            >
                <img
                    v-if="thumbnail"
                    :src="thumbnail"
                    :alt="displayTextValue(studio.name)"
                    class="absolute inset-0 size-full object-cover"
                    loading="lazy"
                >
                <div
                    v-else
                    class="flex size-full min-h-full items-center justify-center"
                >
                    <UIcon
                        name="zat:youtube"
                        :class="wide ? 'size-10 md:size-12 text-zat-500' : 'size-8 text-zat-500'"
                    />
                </div>
            </div>

            <div class="flex min-w-0 flex-1 flex-col gap-0.5 text-right" dir="rtl">
                <p
                    class="truncate font-semibold text-text-subtitle"
                    :class="wide ? 'text-xs leading-6 md:text-sm md:leading-7' : 'text-xs leading-6'"
                >
                    {{ displayTextValue(studio.tournament_name) }}
                </p>
                <p
                    class="line-clamp-2 font-semibold text-text-body"
                    :class="wide ? 'text-base leading-7 md:text-xl md:leading-9' : 'text-base leading-7'"
                >
                    {{ displayTextValue(studio.name) }}
                </p>
                <p
                    v-if="analystsLabel"
                    class="truncate font-semibold text-text-subtitle"
                    :class="wide ? 'text-xs leading-6 md:text-sm md:leading-7' : 'text-xs leading-6'"
                >
                    {{ analystsLabel }}
                </p>
            </div>
        </div>

        <div
            class="relative z-10 flex items-center justify-between gap-2"
            :class="wide ? 'md:pt-1' : ''"
        >
            <time
                v-if="displayDate"
                class="font-numbers text-text-subtitle"
                :class="wide ? 'text-xs leading-6 md:text-sm md:leading-7' : 'text-xs leading-6'"
                :datetime="displayDateIso"
            >
                {{ displayDate }}
            </time>
            <span
                class="inline-flex items-center gap-1 text-text-action"
                :class="wide ? 'text-xs leading-6 md:text-sm md:leading-7' : 'text-xs leading-6'"
            >
                شاهد التحليل
                <UIcon name="zat:youtube" :class="wide ? 'size-6 md:size-7' : 'size-6'" />
            </span>
        </div>
    </a>
</template>

<script setup lang="ts">
import type { IStudio } from '@/Models/IStudio'
import { displayTextValue } from '~/utils/championWinnerStats'
import { extractYoutubeVideoId, youtubeThumbnailUrl } from '~/utils/youtube'

const props = withDefaults(defineProps<{
    studio: IStudio
    wide?: boolean
}>(), {
    wide: false,
})

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
