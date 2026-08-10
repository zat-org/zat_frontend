<template>
    <div class="overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-raised">
        <div class="bg-nav-bar px-4 py-6">
            <h3 class="text-center text-xl font-bold leading-9 text-text-on-action">
                احصائيات
            </h3>
        </div>

        <div
            v-for="(row, index) in rows"
            :key="row.label"
            class="flex items-center justify-between  gap-4 px-28 py-2"
            :class="index % 2 === 0 ? 'bg-surface-overlay' : 'bg-surface-raised'"
        >
        <p class=" text-base text-start leading-9 text-text-body sm:text-xl ">
            {{ row.label }}
        </p>
        <p class="font-numbers text-xl text-center font-medium leading-9 text-text-body">
            {{ row.value }}
        </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ITeamStatistics } from '~/features/teams/types/ITeam'

const props = defineProps<{
    statistics: ITeamStatistics
}>()

const rows = computed(() =>
    Object.entries(props.statistics ?? {}).map(([label, value]) => ({
        label,
        value,
    })),
)
</script>
