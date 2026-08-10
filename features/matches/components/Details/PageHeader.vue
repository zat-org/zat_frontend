<template>
    <header
        v-if="champ"
        class="w-full border-b border-surface-tone2 bg-surface-raised"
        aria-label="شريط عنوان المباراة"
        dir="rtl"
    >
        <div class="page-container flex items-center justify-between gap-4 py-4">
            <div class="flex min-w-0 items-center gap-2">
                <NuxtLink
                    :to="`/championships/${champ.leagueid}`"
                    class="flex size-8 shrink-0 items-center justify-center rounded-zat-full text-text-body transition-opacity hover:opacity-70"
                    aria-label="العودة إلى البطولة"
                >
                    <UIcon
                        name="i-heroicons-chevron-right-20-solid"
                        class="size-8"
                    />
                </NuxtLink>

                <span
                    class="hidden h-8 w-0.5 shrink-0 bg-surface-tone2 sm:block"
                    aria-hidden="true"
                />

                <div class="flex min-w-0 items-center gap-2">
                    <img
                        v-if="typeEmblem"
                        :src="typeEmblem"
                        alt=""
                        class="size-8 shrink-0 object-contain drop-shadow-[0_2px_16px_rgba(22,19,19,0.25)]"
                        aria-hidden="true"
                    >
                    <UIcon
                        v-else
                        name="i-heroicons-trophy"
                        class="size-8 shrink-0 text-text-caption"
                        aria-hidden="true"
                    />

                    <p class="hidden shrink-0 text-base font-bold leading-7 text-text-subtitle sm:block">
                        {{ typePageTitle }}
                    </p>

                    <img
                        :src="breadcrumbChevron"
                        alt=""
                        class="hidden size-8 shrink-0 sm:block"
                        aria-hidden="true"
                    >

                    <NuxtLink
                        :to="`/championships/${champ.leagueid}`"
                        class="truncate text-base font-bold leading-7 text-text-body transition-opacity hover:opacity-70"
                    >
                        {{ champ.name }}
                    </NuxtLink>
                </div>
            </div>

            <div class="flex shrink-0 items-center gap-2">
                <span
                    class="rounded-zat-sm px-4 py-0.5 text-base leading-7"
                    :class="statusClass"
                >
                    {{ statusLabel }}
                </span>
                <time
                    v-if="displayDate"
                    class="hidden font-numbers text-base leading-7 text-text-subtitle sm:block"
                    :datetime="displayDateIso"
                >
                    {{ displayDate }}
                </time>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import LeagueState from '~/features/championships/types/ChampState'
import type { IChamp } from '~/features/championships/types/IChamp'
import {
    getChampionshipTypeConfig,
    getChampionshipTypePageTitle,
} from '~/features/championships/utils/championshipTypes'
import breadcrumbChevron from '~/assets/images/championships/titlebar-back-arrow.svg'

const props = defineProps<{
    champ: IChamp | null
}>()

const typeConfig = computed(() =>
    props.champ ? getChampionshipTypeConfig(props.champ.type) : null,
)

const typePageTitle = computed(() =>
    props.champ ? getChampionshipTypePageTitle(props.champ.type) : '',
)

const typeEmblem = computed(() => typeConfig.value?.emblem ?? '')

const statusLabel = computed(() => {
    if (!props.champ) return ''
    if (props.champ.state === LeagueState.live) return 'جارية'
    if (props.champ.state === LeagueState.upcoming) return 'قادمة'
    return 'انتهت'
})

const statusClass = computed(() => {
    if (!props.champ) return ''
    if (props.champ.state === LeagueState.live) {
        return 'bg-zat-500/15 text-zat-500'
    }
    if (props.champ.state === LeagueState.upcoming) {
        return 'bg-surface-off-base text-text-subtitle'
    }
    return 'bg-[#FEF0D7] text-[#E2A330]'
})

const dateSource = computed(() => {
    if (!props.champ) return null
    if (props.champ.state === LeagueState.upcoming) return props.champ.start_at
    return props.champ.end_at || props.champ.start_at
})

const displayDateIso = computed(() => {
    const raw = dateSource.value
    if (!raw) return undefined
    const date = new Date(raw)
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
})

const displayDate = computed(() => {
    const raw = dateSource.value
    if (!raw) return ''
    const date = new Date(raw)
    if (Number.isNaN(date.getTime())) return ''
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
})
</script>
