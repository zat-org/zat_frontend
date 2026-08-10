<template>
    <div
        :aria-busy="pending || undefined"
        :aria-live="pending || error ? 'polite' : undefined"
    >
        <template v-if="!pending && !error">
            <slot />
        </template>

        <template v-else-if="pending">
            <slot name="pending" :pending="pending">
                <div
                    class="flex w-full flex-col gap-4 overflow-hidden rounded-zat-md border-2 border-surface-tone2 bg-surface-raised p-4 sm:p-6"
                    role="status"
                >
                    <span class="sr-only">جاري التحميل</span>

                    <div class="flex items-center justify-between gap-4">
                        <USkeleton class="h-8 w-40 rounded-zat-sm" />
                        <USkeleton class="h-8 w-24 rounded-zat-sm" />
                    </div>

                    <div
                        v-for="i in skeletonRows"
                        :key="i"
                        class="flex items-center gap-3 rounded-zat-sm bg-surface-base p-3"
                    >
                        <USkeleton class="size-14 shrink-0 rounded-zat-sm" />
                        <div class="flex min-w-0 flex-1 flex-col gap-2">
                            <USkeleton class="h-5 w-2/3 rounded" />
                            <USkeleton class="h-4 w-full rounded" />
                        </div>
                    </div>
                </div>
            </slot>
        </template>

        <template v-else-if="error">
            <slot name="error" :error="error">
                <div
                    class="flex min-h-50 w-full flex-col items-center justify-center gap-4 rounded-zat-md border-2 border-surface-tone2 bg-surface-raised px-4 py-10 text-center"
                    role="alert"
                >
                    <div
                        class="flex size-16 items-center justify-center rounded-full bg-zat-500/10 text-zat-500"
                    >
                        <UIcon
                            name="i-heroicons-exclamation-triangle"
                            class="size-8"
                            aria-hidden="true"
                        />
                    </div>

                    <div class="flex max-w-md flex-col gap-1">
                        <h3 class="text-xl font-bold leading-9 text-text-heading">
                            تعذر تحميل البيانات
                        </h3>
                        <p class="text-base leading-7 text-text-subtitle">
                            {{ error }}
                        </p>
                    </div>

                    <UButton
                        v-if="retryable"
                        color="primary"
                        variant="soft"
                        icon="i-heroicons-arrow-path"
                        @click="emit('retry')"
                    >
                        إعادة المحاولة
                    </UButton>
                </div>
            </slot>
        </template>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    pending: boolean
    error: string | null
    /** Number of skeleton content rows */
    skeletonRows?: number
    /** Show retry button and emit `retry` when clicked */
    retryable?: boolean
}>(), {
    skeletonRows: 3,
    retryable: false,
})

const emit = defineEmits<{
    retry: []
}>()
</script>
