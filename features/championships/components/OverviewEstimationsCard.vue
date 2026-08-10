<template>
    <article
        class="relative flex w-full flex-col overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-raised"
        aria-label="توقع النقاط"
        dir="rtl"
    >
        <header class="flex h-17 shrink-0 items-center bg-nav-bar px-6">
            <h2 class="text-base font-bold leading-7 text-white">
                توقع النقاط
            </h2>
        </header>

        <div v-if="rows.length" class="flex flex-col gap-2 px-4 py-2">
            <div
                v-for="row in rows"
                :key="row.id"
                class="flex items-center justify-between gap-2"
            >
                <div class="flex min-w-0 flex-1 items-center justify-start gap-2">
                    <span class="shrink-0 font-numbers text-base leading-7 text-text-body">
                        #{{ row.index }}
                    </span>
                    <p class="truncate text-base leading-7 text-text-body">
                        @{{ row.username }}
                    </p>
                </div>
                <span
                    class="flex shrink-0 items-center justify-center rounded-zat-sm bg-[rgba(252,196,93,0.25)] px-2 py-0.5 font-numbers text-base font-bold leading-7 text-text-body"
                >
                    {{ row.sum }}
                </span>
            </div>
        </div>

        <div
            v-else
            class="flex min-h-32 items-center justify-center px-4 py-6 text-base text-text-caption"
        >
            لا توجد توقعات حالياً
        </div>

        <div class="mt-auto flex items-center justify-center py-2">
            <NuxtLink
                :to="moreHref"
                class="text-xs font-bold leading-6 text-text-action underline transition-opacity hover:opacity-80"
            >
                عرض المزيد
            </NuxtLink>
        </div>
    </article>
</template>

<script setup lang="ts">
import type { IEstimationRecord } from '~/features/matches/types/MatchEstimationsModels'

const props = defineProps<{
    records: IEstimationRecord[]
    champId: number | string
    limit?: number
}>()

const moreHref = computed(() => `/championships/${props.champId}/estimations`)

const rows = computed(() => {
    const limit = props.limit ?? 6
    return props.records.slice(0, limit).map((record, index) => ({
        ...record,
        index: index + 1,
    }))
})
</script>
