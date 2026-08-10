<template>
    <article
        class="flex min-h-0 w-full flex-col overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-raised"
        aria-label="جدول الترتيب"
        dir="rtl"
    >
        <header
            class="flex h-17 shrink-0 items-center justify-between gap-6 bg-nav-bar px-4 text-base font-bold leading-7 text-text-on-action"
        >
            <div class="flex min-w-0 flex-1 items-center justify-start gap-6">
                <span class="w-9 shrink-0 text-center">مركز</span>
                <span class="min-w-14 shrink-0 text-end">الفريق</span>
            </div>
            <div class="flex items-center gap-3 sm:gap-6">
                <span class="w-12 shrink-0 text-center">لعب</span>
                <span class="w-12 shrink-0 text-center">فاز</span>
                <span class="hidden w-20 shrink-0 text-center sm:block">فوز متتالى</span>
                <span class="w-12 shrink-0 text-center">خسر</span>
                <span class="w-16 shrink-0 text-center">ابناط</span>
            </div>
        </header>

        <div v-if="rows.length" class="flex flex-col gap-2 px-4 py-2">
            <div
                v-for="(row, index) in rows"
                :key="row.id"
                class="flex items-center justify-between gap-4 rounded-zat-sm px-1 py-2 sm:gap-6"
                :class="index % 2 === 0 ? 'bg-surface-base' : 'bg-surface-off-base'"
            >
                <div class="flex min-w-0 flex-1 items-center justify-start gap-4 sm:gap-6">
                    <span class="w-9 shrink-0 text-center font-numbers text-base leading-7 text-text-body">
                        {{ index + 1 }}
                    </span>
                    <div class="flex min-w-0 flex-1 items-center justify-start gap-2">
                        <div
                            class="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-zat-full bg-surface-off-base"
                        >
                            <Image
                                v-if="logoFor(row.id)"
                                :src="logoFor(row.id)"
                                :alt="displayTextValue(row.name)"
                                icon="i-heroicons-user-group"
                                class="size-7 object-contain"
                            />
                            <UIcon
                                v-else
                                name="i-heroicons-user-group"
                                class="size-4 text-text-caption"
                            />
                        </div>
                        <p class="truncate text-base font-semibold leading-7 text-text-body">
                            {{ displayTextValue(row.name) }}
                        </p>
                    </div>
                </div>

                <div class="flex items-center gap-3 sm:gap-6">
                    <span
                        class="flex w-12 shrink-0 items-center justify-center rounded-zat-sm bg-[rgba(252,196,93,0.25)] px-2 py-1 font-numbers text-base leading-7 text-text-body"
                    >
                        {{ displayStatValue(row.play) }}
                    </span>
                    <span
                        class="flex w-12 shrink-0 items-center justify-center rounded-zat-sm bg-[rgba(252,196,93,0.25)] px-2 py-1 font-numbers text-base leading-7 text-text-body"
                    >
                        {{ displayStatValue(row.win) }}
                    </span>
                    <span
                        class="hidden w-20 shrink-0 items-center justify-center rounded-zat-sm bg-[rgba(252,196,93,0.25)] px-2 py-1 font-numbers text-base font-bold leading-7 text-text-body sm:flex"
                    >
                        {{ displayStatValue(row.consecutiveWins) }}
                    </span>
                    <span
                        class="flex w-12 shrink-0 items-center justify-center rounded-zat-sm bg-[rgba(252,196,93,0.25)] px-2 py-1 font-numbers text-base leading-7 text-text-body"
                    >
                        {{ displayStatValue(row.lost) }}
                    </span>
                    <span
                        class="flex w-16 shrink-0 items-center justify-center rounded-zat-sm bg-[rgba(252,196,93,0.25)] px-2 py-1 font-numbers text-base leading-7 text-text-body"
                    >
                        {{ displayAbnatValue(parseAbnat(row.abnat)) }}
                    </span>
                </div>
            </div>
        </div>

        <div
            v-else
            class="flex min-h-40 items-center justify-center px-4 py-8 text-base text-text-caption"
        >
            لا توجد نتائج حالياً
        </div>
    </article>
</template>

<script setup lang="ts">
import type { HezamTeamSummary } from '~/features/championships/types/IChamp'
import {
    displayAbnatValue,
    displayStatValue,
    displayTextValue,
} from '~/features/championships/utils/championWinnerStats'

const props = defineProps<{
    table: HezamTeamSummary[]
    logosById?: Record<number, string>
    limit?: number
}>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl

function parseAbnat(value: string | number | null | undefined): number | null {
    if (value === null || value === undefined) return null
    if (typeof value === 'number') return Number.isFinite(value) ? value : null
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : null
}

const rows = computed(() => {
    if (props.limit == null) return props.table
    return props.table.slice(0, props.limit)
})

function logoFor(teamId: number) {
    const logo = props.logosById?.[teamId]
    return logo ? mediaBaseUrl + logo : ''
}
</script>
