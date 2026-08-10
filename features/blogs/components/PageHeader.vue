<template>
    <header
        class="w-full border-b border-surface-tone2 bg-surface-raised"
        aria-label="شريط عنوان الخبر"
        dir="rtl"
    >
        <div class="page-container flex items-center gap-2 py-4">
            <NuxtLink
                to="/blogs"
                class="flex size-8 shrink-0 items-center justify-center rounded-zat-full text-text-body transition-opacity hover:opacity-70"
                aria-label="العودة إلى الاخبار"
            >
                <UIcon
                    name="i-heroicons-chevron-right-20-solid"
                    class="size-8"
                />
            </NuxtLink>

            <span
                class="h-8 w-0.5 shrink-0 bg-surface-tone2"
                aria-hidden="true"
            />

            <div class="flex min-w-0 items-center gap-2">
                <NuxtLink
                    to="/blogs"
                    class="shrink-0 text-base font-bold leading-7 text-text-subtitle transition-opacity hover:opacity-70"
                >
                    الاخبار
                </NuxtLink>
                <img
                    :src="breadcrumbChevron"
                    alt=""
                    class="hidden size-8 shrink-0 sm:block"
                    aria-hidden="true"
                >
                <h1 class="truncate text-base font-bold leading-7 text-text-body">
                    {{ title }}
                </h1>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import breadcrumbChevron from '~/assets/images/championships/titlebar-back-arrow.svg'

defineProps<{
    title: string
}>()
</script>
