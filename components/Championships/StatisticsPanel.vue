<template>
    <article class="overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-raised"
        aria-label="الاحصائيات" dir="rtl">
        <header class="flex h-17 items-center justify-end gap-2 bg-[#343232] px-4" dir="ltr">
            <div class="min-w-48">
                <USelectMenu
                    v-model="selectedId"
                    :items="options"
                    value-key="id"
                    label-key="label"
                    :search-input="{ placeholder: 'بحث...' }"
                    trailing-icon="i-heroicons-chevron-down-20-solid"
                    color="neutral"
                    variant="outline"
                    size="sm"
                    class="stat-metric-select w-full"
                    :ui="{ content: 'min-w-60 max-h-80' }"
                />
            </div>
            <span class="text-base font-semibold leading-7 text-white" aria-hidden="true">•</span>
            <p class="text-base leading-7 text-[#D0D0D0]">
                الاحصائيات
            </p>
        </header>

        <div class="bg-surface-off-base p-4 sm:px-10 sm:py-4">
            <div class="flex items-stretch gap-4 rounded-zat-sm border border-surface-tone2 bg-surface-off-base/50 p-4"
                dir="ltr">
                <ul class="flex shrink-0 flex-col justify-between gap-2 py-4" dir="rtl">
                    <li v-for="row in rows" :key="row.name" class="flex h-6 items-center justify-start gap-2">
                        <div
                            class="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-zat-full bg-surface-raised">
                            <Image v-if="row.logo" :src="mediaBaseUrl + row.logo" :alt="row.name"
                                icon="i-heroicons-user-group" class="size-6 object-contain" />
                            <UIcon v-else name="i-heroicons-user-group" class="size-3.5 text-text-caption" />
                        </div>
                        <span class="truncate text-xs font-semibold leading-6 text-text-body">
                            {{ row.name }}
                        </span>

                    </li>
                </ul>

                <div class="relative min-w-0 flex-1 py-4">
                    <div class="pointer-events-none absolute inset-x-0 inset-y-4 border-b border-l border-surface-tone2"
                        aria-hidden="true" />
                    <ul class="relative z-10 flex flex-col justify-between gap-2">
                        <li v-for="row in rows" :key="`${row.name}-bar`" class="flex h-6 items-center justify-between gap-5">
                            <div class="flex min-w-0 w-[95%] items-center gap-2">
                                <div class="h-2 shrink-0 rounded-full transition-[width] duration-300"
                                    :class="row.isTop ? 'bg-[#E2A330]' : 'bg-[#B9B9B9]'"
                                    :style="{ width: `max(${row.percent}%, 0.5rem)` }" />
                                <span class="shrink-0 font-numbers text-xs font-semibold leading-6"
                                    :class="row.isTop ? 'text-[#E2A330]' : 'text-text-caption'">
                                    {{ row.value }}
                                </span>
                                <div class="h-2 min-w-2 flex-1 rounded-full bg-[#E8E8E8]" />
                            </div>
                            <img :src="starIcon" alt="" class="size-6 shrink-0"
                                :class="row.isTop ? 'stat-star-top' : 'stat-star-muted'" aria-hidden="true">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import type { IStatisticViewData } from '@/Models/StatisticOption'
import type { IStatistics } from '@/Models/IStatistics'
import starIcon from '~/assets/images/championships/stat-star.svg'

const props = defineProps<{
    teams: IStatistics[]
    options: IStatisticViewData[]
    logosByName?: Record<string, string>
}>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl

const selected = defineModel<IStatisticViewData>('selected', { required: true })

const selectedId = computed({
    get: () => selected.value?.id,
    set: (id: IStatisticViewData['id'] | undefined) => {
        const next = props.options.find(option => option.id === id)
        if (next) selected.value = next
    },
})

const rows = computed(() => {
    const metricId = selected.value?.id
    if (!metricId) return []

    const values = props.teams.map((team) => {
        const raw = team[metricId]
        const value = typeof raw === 'number' ? raw : Number(raw) || 0
        return {
            name: team.name,
            value,
            logo: props.logosByName?.[team.name] ?? '',
        }
    })

    const max = Math.max(...values.map(v => v.value), 0)

    return values.map(row => ({
        ...row,
        percent: max > 0 ? (row.value / max) * 100 : 0,
        isTop: max > 0 && row.value === max,
    }))
})
</script>

<style scoped>
.stat-metric-select :deep(button) {
    height: 40px;
    min-width: 10rem;
    border: 2px solid #ffffff;
    border-radius: 8px;
    background: transparent;
    color: #ffffff;
    box-shadow: none;
    padding-inline: 0.5rem;
}

.stat-metric-select :deep(button span) {
    color: #ffffff;
}

.stat-star-muted {
    opacity: 0.35;
    filter: grayscale(1);
}

.stat-star-top {
    filter: invert(64%) sepia(72%) saturate(480%) hue-rotate(5deg) brightness(95%) contrast(90%);
}
</style>
