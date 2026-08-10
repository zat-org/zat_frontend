<template>
    <div
        v-if="champs.length"
        class="flex flex-col gap-4 overflow-hidden rounded-zat-md border-2 border-surface-tone2 bg-surface-raised h-fit "
    >
        <div class="bg-nav-bar px-4 pb-4 pt-6">
            <h3 class="text-xl font-bold leading-9 text-text-on-action">
                بطولات الفريق
            </h3>
        </div>
        <div class="flex flex-col gap-4 px-4 pb-4">
            <TeamChamp
                v-for="champ in champs"
                :key="champ.id"
                :champ="champ"
            />
        </div>
    </div>
    <div
        v-else
        class="flex flex-col items-center justify-center gap-2 rounded-zat-md border border-surface-tone2 bg-surface-raised px-4 py-10 text-text-subtitle"
    >
        <UIcon
            name="i-heroicons-trophy"
            class="size-12"
        />
        <p class="text-center">
            لم يفز الفريق بأى بطولات حتي الان
        </p>
    </div>
</template>

<script setup lang="ts">
import type { IChampLessDetails } from '~/features/teams/types/ITeam'

defineProps<{
    champs: IChampLessDetails[]
}>()
</script>
