<template>
    <article
        class="recent-tournament-card zat-card clickable relative w-full shrink-0 overflow-hidden p-0 shadow-zat-sm sm:w-[411px]"
        role="link"
        tabindex="0"
        @click="goToChamp"
        @keydown.enter="goToChamp"
    >
        <!-- Mobile layout (Figma 841:12496) -->
        <div class="flex flex-col sm:hidden">
            <div class="flex items-center gap-2 p-2">
                <div class="flex shrink-0 flex-col items-center justify-between self-stretch">
                    <div
                        class="flex size-12 items-center justify-center overflow-hidden rounded-zat-sm bg-surface-overlay p-1"
                    >
                        <Image
                            v-if="champ.url"
                            :src="mediaBaseUrl + champ.url"
                            :alt="champ.name"
                            icon="i-heroicons-trophy"
                            class="size-10 object-contain"
                        />
                        <UIcon v-else name="i-heroicons-trophy" class="size-8 text-zat-500" />
                    </div>
                    <p class="flex items-center justify-center gap-0.5 text-[10px] font-normal leading-4 text-text-caption">
                        <span>{{ endMonth }}</span>
                        <span>/</span>
                        <span>{{ endYear }}</span>
                    </p>
                </div>

                <div class="flex min-w-0 flex-1 flex-col items-center gap-0.5">
                    <h3 class="w-full truncate text-center text-sm font-bold leading-[22px] text-text-heading">
                        {{ displayTextValue(champ.name) }}
                    </h3>
                    <div class="flex max-w-full items-center justify-center gap-0.5 rounded px-0.5">
                        <p class="truncate text-xs leading-5 text-text-body">
                            {{ displayTextValue(champ.winner_name) }}
                        </p>
                        <UIcon name="i-heroicons-trophy" class="size-4 shrink-0 text-text-heading" aria-hidden="true" />
                    </div>
                    <div class="flex flex-wrap items-center justify-center gap-2">
                        <div
                            v-for="pill in mobileWdlPills"
                            :key="pill.label"
                            class="flex min-w-10 items-center justify-center gap-0.5 rounded px-1 py-0.5 text-[10px] leading-4"
                            :class="pill.class"
                        >
                            <span class="font-bold">{{ pill.value }}</span>
                            <span class="font-medium">{{ pill.label }}</span>
                        </div>
                    </div>
                </div>

                <div class="flex shrink-0 flex-col items-center justify-between self-stretch">
                    <div
                        class="flex min-h-12 w-12 flex-1 items-center justify-center overflow-hidden rounded-zat-sm bg-surface-overlay p-1"
                    >
                        <Image
                            v-if="champ.winner_logo"
                            :src="mediaBaseUrl + champ.winner_logo"
                            class="size-10 object-contain"
                            :alt="displayTextValue(champ.winner_name)"
                            icon="i-heroicons-user-group"
                        />
                        <UIcon v-else name="i-heroicons-user-group" class="size-6 text-text-caption" />
                    </div>
                    <p class="truncate text-[10px] leading-4 text-text-caption">
                        الفريق الفائز
                    </p>
                </div>
            </div>

            <div
                class="flex items-center justify-center border-t border-surface-tone px-2 py-2"
                aria-hidden="true"
            >
                <span class="flex items-center gap-0.5 text-xs font-bold leading-5 text-text-action underline">
                    المزيد عن البطولة
                    <UIcon name="i-heroicons-arrow-left" class="size-4 shrink-0" />
                </span>
            </div>
        </div>

        <!-- Desktop layout -->
        <div class="hidden sm:flex">
            <div class="relative flex min-w-0 flex-1 flex-col gap-2 p-4">
                <UIcon
                    name="zat:external-website"
                    class="pointer-events-none absolute inset-e-6 top-6 z-10 size-6 text-text-caption"
                    aria-hidden="true"
                />
                <div class="flex h-44 items-center justify-center rounded-zat-sm bg-surface-overlay p-4">
                    <Image
                        v-if="champ.url"
                        :src="mediaBaseUrl + champ.url"
                        :alt="champ.name"
                        icon="i-heroicons-trophy"
                        class="max-h-[136px] max-w-[136px] object-contain"
                    />
                    <UIcon v-else name="i-heroicons-trophy" class="text-5xl text-zat-500" />
                </div>

                <div class="text-center">
                    <h3 class="line-clamp-2 text-xl font-bold leading-10 text-text-heading">
                        {{ displayTextValue(champ.name) }}
                    </h3>
                    <p class="mt-1 flex items-center justify-center gap-1 text-base font-medium text-text-caption">
                        <span>{{ endYear }}</span>
                        <span>/</span>
                        <span>{{ endMonth }}</span>
                    </p>
                </div>
            </div>

            <div
                class="relative flex min-w-0 flex-1 flex-col gap-2 border-e border-surface-tone p-4 shadow-[inset_-4px_0_8px_0_rgba(22,19,19,0.12)] dark:shadow-[inset_-4px_0_8px_0_rgba(0,0,0,0.35)]"
            >
                <div class="grid w-full grid-cols-2 gap-2">
                    <div class="min-w-0 flex-1 text-right">
                        <p class="truncate text-base font-bold leading-7 text-text-heading">
                            {{ displayTextValue(champ.winner_name) }}
                        </p>
                        <p class="text-[10px] font-medium leading-4 text-text-caption">
                            الفريق الفائز
                        </p>
                    </div>
                    <div
                        class="flex size-12 shrink-0 items-center justify-center justify-self-end overflow-hidden rounded-zat-sm bg-surface-overlay"
                    >
                        <Image
                            v-if="champ.winner_logo"
                            :src="mediaBaseUrl + champ.winner_logo"
                            class="size-full object-contain p-1"
                            :alt="displayTextValue(champ.winner_name)"
                            icon="i-heroicons-user-group"
                        />
                        <UIcon v-else name="i-heroicons-user-group" class="size-6 text-text-caption" />
                    </div>
                </div>

                <div
                    class="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch rounded-zat-sm bg-surface-overlay text-center text-text-heading"
                >
                    <template v-for="(stat, index) in wdlStats" :key="stat.label">
                        <div class="flex min-w-12 flex-col gap-1 border-e-3 border-surface-tone2 p-1 last:border-e-0">
                            <p class="text-base leading-7">{{ stat.label }}</p>
                            <p class="font-numbers text-2xl font-bold leading-10">
                                {{ stat.value }}
                            </p>
                        </div>
                        <div v-if="index < wdlStats.length - 1" class="w-0.5 bg-surface-tone" aria-hidden="true" />
                    </template>
                </div>

                <div class="flex flex-col gap-2">
                    <div
                        v-for="row in detailStats"
                        :key="row.label"
                        class="flex items-center justify-start gap-1"
                    >
                        <UIcon :name="row.icon" class="size-6 shrink-0 text-text-subtitle" />
                        <span class="text-base leading-7 text-text-subtitle">{{ row.label }}</span>
                        <span class="font-numbers text-base leading-7 text-text-heading">{{ row.value }}</span>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import type { IRecentChamp } from '~/features/championships/types/IChamp'
import { displayAbnatValue, displayStatValue, displayTextValue } from '~/features/championships/utils/championWinnerStats'

const props = defineProps<{
    champ: IRecentChamp
    mediaBaseUrl: string
}>()

const stats = computed(() => props.champ.winner_stats)

const wdlStats = computed(() => [
    { label: 'خسر', value: displayStatValue(stats.value?.lost) },
    { label: 'تعادل', value: displayStatValue(stats.value?.draw) },
    { label: 'فاز', value: displayStatValue(stats.value?.win) },
])

const mobileWdlPills = computed(() => [
    {
        label: 'خسر',
        value: displayStatValue(stats.value?.lost),
        class: 'bg-[#fef0d7] text-[#c9912a]',
    },
    {
        label: 'تعادل',
        value: displayStatValue(stats.value?.draw),
        class: 'bg-[#dae7fe] text-[#407be1]',
    },
    {
        label: 'فاز',
        value: displayStatValue(stats.value?.win),
        class: 'bg-[#cefce5] text-[#0abf64]',
    },
])

const detailStats = computed(() => [
    { label: 'لعب', value: displayStatValue(stats.value?.play), icon: 'zat:medal-star' },
    { label: 'نقاط', value: displayStatValue(stats.value?.points), icon: 'zat:status-up' },
    { label: 'أبناط', value: displayAbnatValue(stats.value?.abnat), icon: 'zat:chart-square' },
])

const endMonth = computed(() => {
    if (!props.champ.end_at) return '-'
    const month = new Date(props.champ.end_at).getMonth() + 1
    return Number.isNaN(month) ? '-' : String(month)
})

const endYear = computed(() => {
    if (!props.champ.end_at) return '-'
    const year = new Date(props.champ.end_at).getFullYear()
    return Number.isNaN(year) ? '-' : String(year)
})

function goToChamp() {
    navigateTo(`/championships/${props.champ.leagueid}`)
}
</script>
