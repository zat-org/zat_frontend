<template>
    <article
        class="flex items-center gap-4 rounded-zat-md border border-surface-tone2 bg-surface-raised p-4 shadow-zat-sm"
        dir="rtl"
    >
        <div class="size-20 shrink-0 overflow-hidden rounded-zat-sm bg-surface-overlay sm:size-24">
            <Image
                v-if="referee.image"
                :src="toMediaUrl(referee.image)"
                :alt="referee.name"
                icon="i-heroicons-user"
                class="size-full object-cover object-top"
            />
            <div
                v-else
                class="flex size-full items-center justify-center"
            >
                <UIcon
                    name="i-heroicons-user"
                    class="size-8 text-text-caption"
                />
            </div>
        </div>

        <div class="min-w-0 flex flex-1 flex-col gap-1">
            <h3 class="truncate text-lg font-bold leading-7 text-text-heading">
                {{ referee.name }}
            </h3>
            <p class="text-sm leading-6 text-text-subtitle">
                بدأ التحكيم منذ
                <span class="font-semibold text-zat-500">{{ elapsed }}</span>
            </p>
            <p class="text-sm leading-6 text-text-subtitle">
                حكم بـ
                <span class="font-semibold text-zat-500">{{ matchesLabel }}</span>
            </p>
        </div>
    </article>
</template>

<script setup lang="ts">
import type { IReferee } from '~/features/referees/types/IReferee'
import getElapsedTime from '~/features/shared/utils/getElapsedTime'

const props = defineProps<{
    referee: IReferee
}>()

const toMediaUrl = useMediaUrl()

const elapsed = computed(() => getElapsedTime(props.referee.start_refereeing_at))

const matchesCount = computed(() => {
    const count = Number.parseInt(props.referee.refereed_matches_count, 10)
    return Number.isFinite(count) ? Math.max(0, count) : 0
})

const matchesLabel = computed(() => {
    if (matchesCount.value === 1) {
        return 'مباراة واحدة'
    }
    return `${matchesCount.value} مباريات`
})
</script>
