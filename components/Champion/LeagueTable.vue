<template>
    <article
        class="flex min-h-0 w-full flex-col overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-raised "
        aria-label="جدول الترتيب"
        dir="rtl"
    >
        <header
            class="flex h-17 shrink-0 items-center justify-between gap-6 bg-[#343232] px-4 text-base font-bold leading-7 text-white"
        >
            <div class="flex min-w-0 flex-1 items-center justify-start gap-6">
                <span class="w-9 shrink-0 text-center">مركز</span>
                <span class="min-w-14 shrink-0 text-end">الفريق</span>
            </div>
            <div class="flex items-center gap-4 sm:gap-6">
                <span class="w-12 shrink-0 text-center">لعب</span>
                <span class="hidden w-20.5 shrink-0 text-center sm:block">خ / ت / ف</span>
                <span class="w-16 shrink-0 text-center">ابناط</span>
                <span class="w-12.5 shrink-0 text-center">نقاط</span>
            </div>
        </header>

        <div v-if="rows.length" class="flex flex-col gap-2 px-4 py-2">
            <div
                v-for="(row, index) in rows"
                :key="row.id"
                class="flex items-center justify-between gap-4 rounded-zat-sm px-1 py-2 sm:gap-6"
                :class="index % 2 === 0 ? 'bg-[#F8F8F6]' : 'bg-surface-off-base'"
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

                <div class="flex items-center gap-4 sm:gap-6">
                    <span
                        class="flex w-12 shrink-0 items-center justify-center rounded-zat-sm bg-[rgba(252,196,93,0.25)] px-2 py-1 font-numbers text-base leading-7 text-text-body"
                    >
                        {{ displayStatValue(row.play) }}
                    </span>
                    <span
                        class="hidden w-20.5 shrink-0 items-center justify-center gap-1 rounded-zat-sm bg-[rgba(252,196,93,0.25)] px-2 py-1 font-numbers text-base leading-7 text-text-body sm:inline-flex"
                    >
                        <span>{{ displayStatValue(row.lost) }}</span>
                        <span class="font-semibold text-text-caption">/</span>
                        <span>{{ displayStatValue(row.draw) }}</span>
                        <span class="font-semibold text-text-caption">/</span>
                        <span>{{ displayStatValue(row.win) }}</span>
                    </span>
                    <span
                        class="flex w-16 shrink-0 items-center justify-center rounded-zat-sm bg-[rgba(252,196,93,0.25)] px-2 py-1 font-numbers text-base leading-7 text-text-body"
                    >
                        {{ displayAbnatValue(parseAbnat(row.abnat)) }}
                    </span>
                    <span
                        class="flex w-12.5 shrink-0 items-center justify-center rounded-zat-sm bg-[rgba(252,196,93,0.25)] px-2 py-1 font-numbers text-base leading-7 text-text-body"
                    >
                        {{ displayStatValue(row.points) }}
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
import type { HezamTeamSummary, LeagueTeamSummary } from '@/Models/IChamp'
import {
    displayAbnatValue,
    displayStatValue,
    displayTextValue,
} from '~/utils/championWinnerStats'

type ScoreRow = {
    id: number
    name: string
    play: number
    win: number
    draw: number
    lost: number
    abnat: string | number
    points: number | null
}

const props = defineProps<{
    table: Array<LeagueTeamSummary | HezamTeamSummary>
    logosById?: Record<number, string>
    /** When set, only the first N rows are shown. Omit to show the full table. */
    limit?: number
}>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl

function parseAbnat(value: string | number | null | undefined): number | null {
    if (value === null || value === undefined) return null
    if (typeof value === 'number') return Number.isFinite(value) ? value : null
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : null
}

function toRow(team: LeagueTeamSummary | HezamTeamSummary): ScoreRow {
    const league = team as LeagueTeamSummary
    const hezam = team as HezamTeamSummary
    const points = typeof league.totalScore === 'number'
        ? league.totalScore
        : typeof hezam.consecutiveWins === 'number'
            ? hezam.consecutiveWins
            : null

    return {
        id: team.id,
        name: team.name,
        play: team.play,
        win: team.win,
        draw: team.draw,
        lost: team.lost,
        abnat: team.abnat,
        points,
    }
}

const rows = computed(() => {
    const mapped = props.table.map(toRow)
    if (props.limit == null) return mapped
    return mapped.slice(0, props.limit)
})

function logoFor(teamId: number) {
    const logo = props.logosById?.[teamId]
    return logo ? mediaBaseUrl + logo : ''
}
</script>
