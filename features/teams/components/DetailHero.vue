<template>
    <section
        class="relative w-full overflow-hidden bg-surface-base py-6"
        aria-label="معلومات الفريق"
        dir="rtl"
    >
        <img
            v-if="team.team_logo"
            :src="mediaBaseUrl + team.team_logo"
            alt=""
            class="pointer-events-none absolute left-1/2 top-[-148px] size-[min(441px,80vw)] -translate-x-1/2 opacity-25 blur-[46px]"
            aria-hidden="true"
        >
        <img
            :src="heroWave"
            alt=""
            class="pointer-events-none absolute left-1/2 top-1/2 hidden w-[min(630px,70vw)] -translate-x-1/2 -translate-y-1/2 opacity-40 lg:block"
            aria-hidden="true"
        >

        <div class="page-container relative z-10 flex flex-col items-center gap-2">
            <div class="relative size-53 overflow-hidden rounded-full bg-surface-overlay">
                <img
                    :src="logoUnion"
                    alt=""
                    class="pointer-events-none absolute left-[13px] top-[47px] h-[149px] w-[186px]"
                    aria-hidden="true"
                >
                <div class="absolute left-10 top-5 flex size-[133px] items-center justify-center">
                    <Image
                        v-if="team.team_logo"
                        :src="mediaBaseUrl + team.team_logo"
                        :alt="team.name"
                        icon="i-heroicons-user-group"
                        class="size-full object-contain drop-shadow-[0_4px_32px_rgba(22,19,19,0.25)]"
                    />
                    <UIcon
                        v-else
                        name="i-heroicons-user-group"
                        class="size-16 text-text-caption"
                    />
                </div>
            </div>

            <div class="flex w-full flex-col items-center gap-2">
                <div class="flex flex-col items-center">
                    <p class="text-xs font-semibold leading-6 text-text-caption">
                        الفريق
                    </p>
                    <h1 class="text-center text-3xl font-bold leading-12 text-text-body sm:text-4xl sm:leading-16">
                        {{ team.name }}
                    </h1>
                </div>

                <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-base leading-9 text-text-subtitle sm:text-xl sm:leading-9">
                    <p class="flex items-center gap-0.5">
                        <span>شارك في</span>
                        <span class="font-numbers font-bold text-text-body">{{ champsCount }}</span>
                        <span>بطولات</span>
                    </p>
                    <span class="text-text-body" aria-hidden="true">•</span>
                    <p class="flex items-center gap-0.5">
                        <span>فاز بـ</span>
                        <span class="font-numbers font-bold text-text-heading">{{ winsDisplay }}</span>
                        <span>بطولة</span>
                        <img
                            :src="trophyIcon"
                            alt=""
                            class="ms-1 size-6"
                            aria-hidden="true"
                        >
                    </p>
                    <span class="text-text-body" aria-hidden="true">•</span>
                    <p class="flex items-center gap-0.5">
                        <span>تأسس منذ</span>
                        <span class="font-numbers font-bold text-text-body">{{ yearsSinceFounded }}</span>
                        <span>أعوام</span>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { ITeamFullDetails } from '~/features/teams/types/ITeam'
import logoUnion from '~/assets/images/teams/team-detail-logo-union.svg'
import heroWave from '~/assets/images/teams/team-detail-wave.svg'
import trophyIcon from '~/assets/images/teams/trophy-icon.svg'

const props = defineProps<{
    team: ITeamFullDetails
}>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl

const champsCount = computed(() => props.team.champs?.length ?? 0)

const winsCount = computed(() => {
    const raw = Number(props.team.winning_count)
    return Number.isFinite(raw) ? Math.max(0, raw) : 0
})

const winsDisplay = computed(() => String(winsCount.value))

const yearsSinceFounded = computed(() => {
    if (!props.team.founded_in) return '0'
    const founded = new Date(props.team.founded_in)
    if (Number.isNaN(founded.getTime())) return '0'
    const years = Math.max(0, new Date().getFullYear() - founded.getFullYear())
    return String(years)
})
</script>
