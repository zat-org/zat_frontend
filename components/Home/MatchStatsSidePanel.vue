<template>
    <aside class="relative z-20 w-10 shrink-0 self-stretch sm:w-14">
        <button type="button"
            class="relative z-30 flex h-full w-10 shrink-0 cursor-pointer items-center justify-center rounded-s-zat-md border-2 border-surface-tone bg-surface-raised text-text-subtitle shadow-zat-sm transition-colors hover:bg-surface-overlay sm:w-14"
            :aria-expanded="open" aria-label="عرض مباريات أخرى" @click="open = !open">
            <UIcon :name="open ? 'i-heroicons-chevron-left' : 'zat:sort'"
                class="size-7 sm:size-8 text-text-subtitle" />
        </button>
        
        <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-x-4"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 translate-x-0"
            leave-to-class="opacity-0 translate-x-4">
            <div v-if="open"
                class="absolute inset-y-0 inset-s-full z-20 flex w-[min(calc(100vw-4rem),280px)] flex-col overflow-hidden rounded-e-zat-md border-2 border-surface-tone border-e-0 bg-surface-raised shadow-zat md:w-[340px]">
                <div class="relative z-10 shrink-0 px-4 pt-4 pb-2">
                    <h3 class="text-right text-lg font-bold text-text-caption">
                        مباريات أخرى
                    </h3>
                </div>

                <div class="absolute inset-x-0 top-14 bottom-14 z-0 overflow-y-auto px-4">
                    <ul v-if="matches.length > 0" class="flex flex-col gap-2 pb-12">
                        <li v-for="match in matches" :key="match.id">
                            <button type="button"
                                class="flex w-full items-center justify-end gap-2 rounded-zat-sm py-2 text-right transition-colors hover:bg-surface-overlay"
                                :class="match.id === selectedId ? 'bg-surface-overlay' : ''" @click="onSelect(match.id)">
                                <span class="min-w-0 flex-1 truncate font-semibold text-base text-text-body">
                                    {{ match.team_1_name }} ضد {{ match.team_2_name }}
                                </span>
                                <span
                                    class="shrink-0 rounded bg-surface-overlay px-2 py-1 font-numbers text-sm text-text-subtitle">
                                    {{ formatMatchDate(match.start_at) }}
                                </span>
                            </button>
                        </li>
                    </ul>
                    <p v-else class="py-4 text-center text-sm text-text-caption">
                        لا توجد مباريات أخرى
                    </p>

                    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-linear-to-b from-transparent to-surface-raised"
                        aria-hidden="true" />
                </div>

                <div class="relative z-10 mt-auto shrink-0 border-t border-surface-tone px-4 py-3 text-center">
                    <UButton v-if="leagueId" :to="`/championships/${leagueId}/matches`" variant="link" color="primary"
                        class="p-0 text-xs font-bold underline">
                        المزيد
                    </UButton>
                </div>
            </div>
        </Transition>
    </aside>
</template>

<script setup lang="ts">
import type { IMatchLessDetails } from '@/Models/IMatchLessDetails'

defineProps<{
    matches: IMatchLessDetails[]
    selectedId: number | null
    leagueId?: number | null
}>()

const emit = defineEmits<{
    select: [id: number]
}>()

const open = defineModel<boolean>('open', { default: false })

function onSelect(id: number) {
    emit('select', id)
}

function formatMatchDate(value: Date | string) {
    const date = new Date(value)
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}/${m}/${d}`
}
</script>
