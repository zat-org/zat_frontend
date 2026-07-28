<template>
    <div
        v-if="champs.length > 0"
        :class="listClass"
    >
        <div
            v-for="champ in champs"
            :key="champ.id"
            class="border-b border-[#d0d0d0] last:border-b-0"
        >
            <button
                type="button"
                class="flex w-full items-center justify-between gap-4 px-4 py-4 text-right transition-colors sm:px-6"
                :class="headerClass"
                :aria-expanded="isOpen(champ.id)"
                @click="toggle(champ.id)"
            >
                <h3 class="min-w-0 flex-1 truncate text-xl font-bold leading-10 text-text-body">
                    {{ champ.name }}
                </h3>
                <div class="flex shrink-0 items-center gap-2">
                    <UBadge
                        :label="statusLabel(champ.state)"
                        :color="statusColor(champ.state)"
                        variant="soft"
                        size="lg"
                        class="rounded-zat-sm px-4 text-xl font-normal leading-9"
                    />
                    <UIcon
                        name="i-heroicons-chevron-down-20-solid"
                        class="size-5 text-text-subtitle transition-transform duration-300"
                        :class="isOpen(champ.id) ? 'rotate-180' : ''"
                        aria-hidden="true"
                    />
                </div>
            </button>

            <div
                class="grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none"
                :class="isOpen(champ.id) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
            >
                <div class="min-h-0 overflow-hidden">
                    <template v-for="group in champ.groups" :key="`${champ.id}-${group.name}`">
                        <div
                            class="flex items-center border-t border-[#d0d0d0] px-4 py-1 sm:px-6"
                            :class="groupHeaderClass"
                        >
                            <p class="w-full truncate text-right text-base font-bold leading-7 text-text-body">
                                {{ group.name }}
                            </p>
                        </div>
                        <ChampionshipsMatchHistoryRow
                            v-for="match in group.matches"
                            :key="match.id"
                            :match="match"
                            :champ-id="champ.id"
                            :media-base-url="mediaBaseUrl"
                            :upcoming="isUpcoming"
                        />
                    </template>
                </div>
            </div>
        </div>
    </div>

    <div
        v-else
        class="flex min-h-50 flex-col items-center justify-center gap-2 px-4 py-12 text-text-subtitle"
        :class="emptyClass"
    >
        <UIcon name="line-md:alert-circle" class="text-5xl" />
        <p>{{ emptyMessage }}</p>
    </div>
</template>

<script setup lang="ts">
import LeagueState from '@/Models/ChampState'
import MatchState from '@/Models/MatchState'
import type { IMatchHistoryChamp } from '@/Models/IMatchHistory'
import type { MatchHistoryStatus } from '@/Models/IMatchHistory'

const props = withDefaults(defineProps<{
    champs: IMatchHistoryChamp[]
    mediaBaseUrl: string
    status: MatchHistoryStatus
    emptyMessage: string
    /** panel = embedded MatchHistory card; page = full-page list */
    variant?: 'panel' | 'page'
}>(), {
    variant: 'panel',
})

const openChampId = ref<number | null>(null)

const isUpcoming = computed(() => props.status === 'upcoming')

const listClass = computed(() =>
    props.variant === 'page'
        ? 'overflow-hidden rounded-zat-md border-2 border-surface-tone2 bg-surface-raised'
        : undefined,
)

const headerClass = computed(() =>
    props.variant === 'page'
        ? 'bg-surface-overlay hover:bg-surface-overlay/80'
        : 'bg-surface-base hover:bg-surface-overlay/50',
)

const groupHeaderClass = computed(() => {
    if (isUpcoming.value) return 'bg-surface-warning'
    return props.variant === 'page' ? 'bg-surface-overlay' : 'bg-surface-base'
})

const emptyClass = computed(() =>
    props.variant === 'page'
        ? 'rounded-zat-md border-2 border-surface-tone2 bg-surface-raised py-16'
        : undefined,
)

watch(
    () => props.champs,
    (list) => {
        if (!list.length) {
            openChampId.value = null
            return
        }
        const stillOpen = list.some(champ => champ.id === openChampId.value)
        if (!stillOpen) {
            openChampId.value = list[0]!.id
        }
    },
    { immediate: true },
)

function isOpen(id: number) {
    return openChampId.value === id
}

function toggle(id: number) {
    openChampId.value = openChampId.value === id ? null : id
}

function statusLabel(state: IMatchHistoryChamp['state']) {
    if (state === LeagueState.live) return MatchState.Live
    if (state === LeagueState.done) return MatchState.Done
    if (state === LeagueState.upcoming) return 'قادمة'
    return isUpcoming.value ? 'قادمة' : MatchState.Done
}

function statusColor(state: IMatchHistoryChamp['state']): 'neutral' | 'error' | 'info' {
    if (state === LeagueState.live) return 'error'
    if (state === LeagueState.done) return 'neutral'
    if (state === LeagueState.upcoming) return 'info'
    return isUpcoming.value ? 'info' : 'neutral'
}
</script>
