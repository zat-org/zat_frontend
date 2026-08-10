<template>
    <div v-if="match" class="overflow-hidden rounded-b-zat-md border-t-2 border-surface-tone">
        <button type="button"
            class="flex w-full  gap-3 bg-surface-raised px-4 py-3 text-right transition-colors hover:bg-surface-overlay/40 sm:flex-row sm:items-center justify-between sm:gap-3"
            :aria-expanded="open" @click="open = !open">
            <span
                class="shrink-0 self-start rounded-zat-sm bg-zat-500/15 px-3 py-2 text-sm font-bold text-text-action sm:px-4 sm:text-xl">
                المباراة القادمة
            </span>

            <div class="flex shrink-0 items-center justify-center gap-2 sm:gap-4">
                <UIcon name="i-heroicons-chevron-up" class=" hidden lg:block size-5 text-text-body transition-transform duration-200"
                    :class="open ? '' : 'rotate-180'" />
                <ClientOnly>
                    <NumbersTimer :hours="countdown.hours" :minutes="countdown.minutes" :seconds="countdown.seconds"
                        :size="timerSize" />
                    <template #fallback>
                        <NumbersTimer hours="--" minutes="--" seconds="--" size="sm" />
                    </template>
                </ClientOnly>
                <UIcon name="i-heroicons-chevron-up" class="size-5 text-text-body transition-transform duration-200"
                    :class="open ? '' : 'rotate-180'" />
            </div>

            <div class="hidden lg:flex min-w-0 w-full items-center justify-center gap-2 text-text-body sm:w-auto sm:justify-end">
                <span class="truncate font-bold text-sm sm:text-base md:text-xl">{{ match.team_1_name }}</span>
                <span class="shrink-0 font-medium text-sm sm:text-base md:text-xl">ضد</span>
                <span class="truncate font-bold text-sm sm:text-base md:text-xl">{{ match.team_2_name }}</span>
            </div>
        </button>

        <div
            class="grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none"
            :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        >
            <div class="min-h-0 overflow-hidden">
                <div class="@container relative overflow-hidden bg-surface-base p-4 pt-2">
                    <div
                        class="pointer-events-none absolute inset-0 overflow-hidden opacity-100 dark:opacity-40"
                        aria-hidden="true"
                    >
                        <div
                            class="absolute top-1/2 -left-52 size-100 -translate-y-1/2 sm:-left-40 sm:size-[320px]"
                            style="background: radial-gradient(circle, rgba(237, 28, 36, 0.38) 0%, rgba(237, 28, 36, 0.14) 42%, transparent 72%)"
                        />
                        <div
                            class="absolute top-1/2 -right-40 size-100 -translate-y-1/2 sm:size-[320px]"
                            style="background: radial-gradient(circle, rgba(90, 149, 251, 0.36) 0%, rgba(90, 149, 251, 0.12) 42%, transparent 72%)"
                        />
                        <MatchVsWatermark tone="strong" />
                    </div>

                    <div class="relative z-10 flex flex-col items-center gap-4">
                        <div class="flex w-full items-center justify-between gap-2">
                            <NuxtLink
                                :to="matchHref"
                                class="flex size-8 items-center justify-center rounded-zat-full text-text-body transition-opacity hover:opacity-70"
                                :aria-label="`تفاصيل مباراة ${match.team_1_name} ضد ${match.team_2_name}`"
                                @click.stop
                            >
                                <UIcon
                                    name="zat:external-website"
                                    class="size-8"
                                />
                            </NuxtLink>

                            <p class="min-w-0 flex-1 truncate text-center text-xl font-bold text-text-subtitle sm:text-2xl">
                                {{ match.tournament_name || tournamentName }}
                            </p>

                            <span
                                class="size-8 shrink-0"
                                aria-hidden="true"
                            />
                        </div>

                        <div class="flex w-full max-w-xl items-center justify-center gap-6 sm:gap-8">
                            <div class="flex w-24 flex-col items-center gap-2 sm:w-[104px]">
                                <Image
                                    :src="logoBaseUrl + match.team_1_logo"
                                    class="size-20 bg-surface-overlay rounded-full object-contain p-1 sm:size-[104px]"
                                    :alt="match.team_1_name"
                                    icon="i-heroicons-user-group"
                                />
                                <p class="w-full truncate text-center text-lg font-bold text-text-heading sm:text-2xl">
                                    {{ match.team_1_name }}
                                </p>
                            </div>

                            <MatchCountdownBlocks
                                :days="countdown.days"
                                :hours="countdown.blockHours"
                                :minutes="countdown.minutes"
                            />

                            <div class="flex w-24 flex-col items-center gap-2 sm:w-[104px]">
                                <Image
                                    :src="logoBaseUrl + match.team_2_logo"
                                    class="size-20 bg-surface-overlay rounded-full object-contain p-1 sm:size-[104px]"
                                    :alt="match.team_2_name"
                                    icon="i-heroicons-user-group"
                                />
                                <p class="w-full truncate text-center text-lg font-bold text-text-heading sm:text-2xl">
                                    {{ match.team_2_name }}
                                </p>
                            </div>
                        </div>

                        <div
                            v-if="hasEstimationWindow"
                            class="relative z-10 flex justify-center"
                            @click.stop
                        >
                            <MatchCardEstimation
                                :match="match"
                                :champ-id="match.league_id"
                                tone="light"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IMatchLessDetails } from '~/features/matches/types/IMatchLessDetails'

const props = defineProps<{
    match: IMatchLessDetails
    tournamentName?: string
    countdown: {
        days: string | number
        blockHours: string | number
        hours: string | number
        minutes: string | number
        seconds: string | number
    }
    logoBaseUrl: string
}>()

const open = defineModel<boolean>('open', { default: false })

const matchHref = computed(
    () => `/championships/${props.match.league_id}/match/${props.match.id}`,
)

const hasEstimationWindow = computed(() =>
    Boolean(props.match.start_estimations && props.match.end_estimations),
)

const isSmUp = useMediaQuery('(min-width: 640px)')
const timerSize = computed(() => (isSmUp.value ? 'md' : 'sm') as 'sm' | 'md')
</script>
