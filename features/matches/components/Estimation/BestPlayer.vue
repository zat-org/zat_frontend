<template>
    <UFormField name="bestPlayerId" class="w-full">
        <div class="flex flex-wrap justify-center gap-2">
            <button
                v-for="player in bestPlayerOptions"
                :key="player.id"
                type="button"
                class="group relative flex w-28 flex-col items-center rounded-lg p-1 transition-colors hover:bg-surface-off-base"
                :class="bestPlayerId === player.id ? 'bg-surface-off-base ring-2 ring-zat-500' : ''"
                @click="bestPlayerId = player.id"
            >
                <div class="relative mb-1 size-14 overflow-hidden rounded-lg bg-surface-overlay">
                    <Image
                        v-if="player.image"
                        :src="`${url}${player.image}`"
                        :alt="player.name"
                        icon="i-heroicons-user"
                        class="size-full object-cover object-top"
                    />
                    <div v-else class="flex size-full items-center justify-center">
                        <UIcon name="i-heroicons-user" class="size-6 text-text-caption" />
                    </div>
                    <img
                        :src="rolePlayerIcon"
                        alt=""
                        class="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-3 w-auto"
                        aria-hidden="true"
                    >
                </div>
                <span class="w-full truncate text-center text-xs font-semibold leading-6 text-text-heading">
                    {{ player.name }}
                </span>
            </button>
        </div>
    </UFormField>
</template>

<script setup lang="ts">
import type { Person } from '~/features/matches/types/IMatchFullDetails'
import rolePlayerIcon from '~/assets/images/matches/role-player.svg'

defineProps<{
    bestPlayerOptions: Person[]
}>()

const bestPlayerId = defineModel('bestPlayerId', { required: true, type: Number })
const url = useRuntimeConfig().public.apiBaseUrl
</script>
