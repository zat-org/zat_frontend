<template>
    <NuxtLink
        :to="`/blogs/${blog.id}`"
        class="group relative flex w-full break-inside-avoid flex-col gap-2 overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-raised p-4 transition-[border-color] duration-300 hover:border-surface-tone sm:p-6"
        dir="rtl"
    >
        <div class="relative h-62 overflow-hidden rounded-zat-sm bg-surface-overlay">
            <Image
                v-if="blog.image"
                :src="mediaBaseUrl + blog.image"
                :alt="blog.title"
                icon="i-heroicons-newspaper"
                class="size-full object-cover"
            />
            <div
                v-else
                class="flex size-full items-center justify-center"
            >
                <img
                    :src="newsIcon"
                    alt=""
                    class="size-12"
                    aria-hidden="true"
                >
            </div>

            <time
                class="absolute inset-e-2 top-2 rounded bg-surface-base/90 px-2 py-1 text-base font-bold leading-7 text-text-caption backdrop-blur-xs"
                :datetime="publishedIso"
            >
                {{ publishedLabel }}
            </time>
        </div>

        <h2 class="line-clamp-2 text-xl font-bold leading-10 text-text-heading transition-[filter] duration-300 group-hover:blur-sm sm:text-2xl sm:leading-12">
            {{ blog.title }}
        </h2>
        <p class="line-clamp-6 text-base font-normal leading-7 text-text-heading transition-[filter] duration-300 group-hover:blur-[6px]">
            {{ blog.description }}
        </p>

        <div
            class="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-50 items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
        >
            <span class="rounded-zat-sm bg-nav-bar px-2 py-2 text-xs font-bold leading-6 text-text-on-action">
                اقرأ المزيد
            </span>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { IBlog } from '~/features/blogs/types/IBlog'
import newsIcon from '~/assets/images/blogs/news-icon.svg'

const props = defineProps<{ blog: IBlog }>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl

const publishedDate = computed(() => {
    const date = new Date(props.blog.published_at)
    return Number.isNaN(date.getTime()) ? null : date
})

const publishedIso = computed(() => publishedDate.value?.toISOString() ?? undefined)

const publishedLabel = computed(() => {
    if (!publishedDate.value) return ''
    return publishedDate.value.toLocaleDateString('en-GB')
})
</script>
