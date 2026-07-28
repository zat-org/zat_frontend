<template>
    <a
        v-if="href"
        :href="href"
        target="_blank"
        rel="noopener noreferrer"
        class="relative block aspect-628/291 w-full overflow-hidden rounded-zat-md bg-surface-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zat-500"
        :aria-label="title"
    >
        <img
            v-if="thumbnail"
            :src="thumbnail"
            :alt="title"
            class="absolute inset-0 size-full object-cover"
            loading="lazy"
        >
        <div
            v-else
            class="absolute inset-0 flex items-center justify-center bg-surface-overlay"
        >
            <UIcon name="zat:youtube" class="size-14 text-zat-500" />
        </div>

        <div
            class="pointer-events-none absolute top-0 h-15 w-full bg-linear-to-b from-black to-transparent mix-blend-multiply"
            aria-hidden="true"
        />

        <div class="absolute inset-s-4 top-4 z-10 flex items-center gap-3">
            <div class="size-11 shrink-0 overflow-hidden rounded-zat-full bg-surface-raised">
                <Image
                    v-if="logoSrc"
                    :src="logoSrc"
                    :alt="logoAlt"
                    icon="i-heroicons-trophy"
                    class="size-full object-cover"
                />
                <UIcon
                    v-else
                    name="i-heroicons-trophy"
                    class="size-full p-2 text-zat-500"
                />
            </div>
            <div class="min-w-0 text-right text-text-on-action">
                <p class="truncate text-base font-semibold leading-7">
                    {{ title }}
                </p>
                <p
                    v-if="meta"
                    class="truncate text-[11px] tracking-tight text-text-on-action/90"
                >
                    {{ meta }}
                </p>
            </div>
        </div>

        <div
            class="absolute inset-e-4 bottom-4 z-10 flex items-center rounded-zat-full bg-black/50 px-6 py-4"
            aria-hidden="true"
        >
            <img
                :src="youtubeWordmark"
                alt=""
                class="h-4 w-18"
                width="72"
                height="16"
            >
        </div>
    </a>

    <div
        v-else
        class="relative flex aspect-628/291 w-full items-center justify-center overflow-hidden rounded-zat-md bg-surface-raised"
    >
        <Image
            v-if="logoSrc"
            :src="logoSrc"
            :alt="logoAlt"
            icon="i-heroicons-trophy"
            class="max-h-40 max-w-40 object-contain"
        />
        <UIcon v-else name="i-heroicons-trophy" class="size-20 text-zat-500" />
    </div>
</template>

<script setup lang="ts">
import { extractYoutubeVideoId, youtubeThumbnailUrl } from '~/utils/youtube'
import youtubeWordmark from '~/assets/images/championships/youtube-wordmark-white.svg'

const props = defineProps<{
    href?: string | null
    title: string
    meta?: string | null
    logoSrc?: string | null
    logoAlt?: string
    thumbnailSrc?: string | null
}>()

const thumbnail = computed(() => {
    if (props.thumbnailSrc) return props.thumbnailSrc
    const videoId = extractYoutubeVideoId(props.href)
    return videoId ? youtubeThumbnailUrl(videoId) : null
})
</script>
