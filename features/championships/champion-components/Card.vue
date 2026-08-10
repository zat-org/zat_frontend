<template>
    <UCard :ui="ui" class="shadow-xl relative z-0 w-full overflow-hidden bg-surface-overlay clickable"
        @click="$router.push(`/championships/${champion.leagueid}`)">
        <template #default>
            <div class="flex">
                <UChip size="2xl" :ui="{ background: 'h-[35px] w-[35px] ', position: { 'top-right': 'top-1 right-1' } }">
                    <div class="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-raised">
                        <object type="image/png" :data="url + champion.url" :aria-label="champion.name"
                            class="object-center w-28 flex justify-center items-center">
                            <UIcon name="i-heroicons-trophy" class="text-[75px] text-amber-500" />
                        </object>
                    </div>
                    <template #content>
                        <div class="text-white text-[35px] flex justify-center items-center">
                            <template v-if="champion.state === LeagueState.done">
                                <UIcon name="i-heroicons-check-badge" />
                            </template>
                            <template v-else-if="champion.state === LeagueState.upcoming">
                                <UIcon name="i-heroicons-clock" />
                            </template>
                            <template v-else-if="champion.state === LeagueState.live">
                                <UIcon name="i-heroicons-fire-16-solid" />
                            </template>
                        </div>
                    </template>
                </UChip>
                <div class="ms-5 space-y-2 grow ">
                    <h2 class="font-semibold text-lg">{{ champion.name }}</h2>
                    <p class="text-sm line-clamp-4 ">{{ champion.description }}</p>
                </div>
            </div>
            <UIcon name="i-heroicons-trophy"
                class="absolute text-[220px]  text-gray-400 dark:text-gray-600 -top-4 -left-16 z-[-1]" />
        </template>
    </UCard>
</template>

<script setup lang="ts">
import type { IChamp } from '~/features/championships/types/IChamp';
import LeagueState from '~/features/championships/types/ChampState';

defineProps({
    champion: {
        required: true,
        type: Object as PropType<IChamp>
    }
})
const url = useRuntimeConfig().public.apiBaseUrl;
const ui = {
    size: {
        "3xl": "h-44 w-44"
    }
}
</script>

<style scoped></style>