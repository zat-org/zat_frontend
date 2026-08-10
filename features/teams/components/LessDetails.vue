<template>
    <NuxtLink
        :to="`/teams/${team.id}`"
        class="group relative mx-auto block h-58 w-48.25 shrink-0"
        :aria-label="`فريق ${team.name}`"
    >
        <div class="absolute inset-x-0 top-2 h-52.5 w-full">
            <img
                :src="emblemBg"
                alt=""
                class="pointer-events-none absolute left-1/2 top-0.75 h-49.5 w-40.5 -translate-x-1/2 transition-transform duration-300 ease-out group-hover:-translate-x-1/2 group-hover:-translate-y-1 group-hover:scale-[1.03]"
                aria-hidden="true"
            >
            <img
                :src="unionDecor"
                alt=""
                class="pointer-events-none absolute left-1/2 top-16 h-22.25 w-33 -translate-x-1/2 transition-transform duration-300 ease-out group-hover:-translate-x-1/2 group-hover:-translate-y-1 group-hover:scale-[1.03]"
                aria-hidden="true"
            >
            <div class="absolute left-1/2 top-8 flex size-24 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-surface-overlay transition-transform duration-300 ease-out group-hover:-translate-x-1/2 group-hover:-translate-y-2 group-hover:scale-105">
                <Image
                    v-if="team.team_logo"
                    :src="mediaBaseUrl + team.team_logo"
                    :alt="team.name"
                    icon="i-heroicons-user-group"
                    class="size-18.75 object-contain"
                />
                <UIcon
                    v-else
                    name="i-heroicons-user-group"
                    class="size-10 text-text-caption"
                />
            </div>
        </div>

        <div class="absolute left-1/2 top-43.5 z-10 flex -translate-x-1/2 items-center justify-center px-5 py-1 transition-transform duration-300 ease-out group-hover:-translate-x-1/2 group-hover:-translate-y-2 group-hover:scale-105">
            <img
                :src="nameBg"
                alt=""
                class="pointer-events-none absolute inset-0 h-[110%] w-full scale-x-250 scale-y-150"
                aria-hidden="true"
            >
            <p class="relative z-10 truncate text-center text-xl font-bold leading-9 text-white">
                {{ team.name }}
            </p>
        </div>

        <p
            v-if="showWins"
            class="absolute inset-x-0 -bottom-3 flex items-center justify-center gap-1 text-xs leading-6 opacity-0 translate-y-1 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
        >
            <span class="text-text-subtitle">بطولات</span>
            <span class="font-numbers font-bold text-text-heading">{{ winsDisplay }}</span>
            <span class="text-text-subtitle">فاز</span>
        </p>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { ITeamLessDetails } from '~/features/teams/types/ITeam'
import emblemBg from '~/assets/images/teams/team-card-emblem.svg'
import unionDecor from '~/assets/images/teams/team-card-union.svg'
import nameBg from '~/assets/images/teams/team-card-name-bg.svg'

const props = defineProps<{
    team: ITeamLessDetails
}>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl

const winsCount = computed(() => {
    const raw = Number(props.team.winning_count)
    return Number.isFinite(raw) ? Math.max(0, raw) : 0
})

const showWins = computed(() => winsCount.value > 0)

const winsDisplay = computed(() => String(winsCount.value).padStart(2, '0'))
</script>
