<template>
    <div v-if="match" class="min-w-0 flex-1 overflow-hidden">
        <button type="button"
            class=" w-full  gap-2 bg-surface-raised px-4 py-3 rounded-t-xl text-right transition-colors hover:bg-surface-overlay/40 grid  grid-cols-2  md:grid-cols-3 sm:gap-3 "
            :aria-expanded="open" @click="open = !open">
                <span
                    class="shrink-0 rounded-zat-sm bg-surface-overlay px-3 py-2 text-sm w-fit font-bold text-text-subtitle sm:px-4 sm:text-xl">
                    المباراة السابقة
                </span>

                <h2 class="text-center text-lg font-bold text-text-subtitle sm:text-xl md:text-2xl w-fit  justify-self-center row-start-2    col-span-2 md:col-span-1 md:row-start-1 md:col-start-2   ">
                    {{ match.name|| tournamentName || 'دوري زات' }}
                </h2>


                <UButton v-if="leagueId" :to="`/championships/${leagueId}/matches`" variant="ghost" color="primary"
                    class="shrink-0 p-0 text-sm font-bold text-text-action sm:text-base justify-self-end" trailing-icon="i-heroicons-arrow-left"
                    @click.stop>
                    المزيد
                </UButton>
                
        </button>

        <div
            class="grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none"
            :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        >
            <div class="min-h-0 overflow-hidden">
                <div class="@container relative overflow-visible bg-surface-base p-4 dark:bg-surface-raised/50 sm:p-6">
                    <MatchVsWatermark tone="strong" />

                    <div class="relative z-10">
                        <div
                            class="mx-auto grid w-full grid-cols-1 items-center gap-4 @[200px]:grid-cols-3 @md:gap-4 "
                        >
                            <div class="flex min-w-0 flex-col items-center gap-2 ">
                                <Image
                                    :src="logoBaseUrl + match.team_1_logo"
                                    class="size-14 rounded-full bg-surface-overlay object-contain p-1 @-[400px]:size-16 @-[560px]:size-20"
                                    :alt="match.team_1_name"
                                    icon="i-heroicons-user-group"
                                />
                                <p class="w-full truncate text-center text-sm font-bold text-text-heading @-[400px]:text-base @-[560px]:text-xl">
                                    {{ match.team_1_name }}
                                </p>
                            </div>

                            <div class="flex flex-col items-center gap-1 @-[400px]:gap-2">
                                <NumbersScore class=" grid @max-[200px]:grid-cols-1  grid-cols-2 gap-2 " :left="match.team_1_score ?? 0" :right="match.team_2_score ?? 0" />
                                <p class="@max-[200px]:hidden  block text-xs font-medium text-text-caption @-[400px]:text-sm @-[560px]:text-base">النتيجة النهائية</p>
                            </div>

                            <div class="flex min-w-0 flex-col items-center gap-2 @-[400px]:gap-3">
                                <Image
                                    :src="logoBaseUrl + match.team_2_logo"
                                    class="size-14 rounded-full bg-surface-overlay object-contain p-1 @-[400px]:size-16 @-[560px]:size-20"
                                    :alt="match.team_2_name"
                                    icon="i-heroicons-user-group"
                                />
                                <p class="w-full truncate text-center text-sm font-bold text-text-heading @-[400px]:text-base @-[560px]:text-xl">
                                    {{ match.team_2_name }}
                                </p>
                            </div>
                        </div>

                        <div
                            class="   mt-4 flex flex-wrap items-center lg:justify-center justify-between    gap-6 px-2 sm:mt-0 sm:gap-8 sm:px-6 md:gap-12"
                            aria-label="إحصائيات المباراة"
                        >
                            <div class="flex items-center gap-1">
                                <span class="text-sm font-medium text-text-subtitle sm:text-base">الأبناط</span>
                                <span class="text-lg font-bold leading-10 text-text-body sm:text-xl">{{ matchStats.abnat }}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <span class="text-sm font-medium text-text-subtitle sm:text-base">النقاط</span>
                                <span class="text-lg font-bold leading-10 text-text-body sm:text-xl">{{ matchStats.points }}</span>
                            </div>
                            <div class="flex items-center gap-0.5">
                                <span class="text-lg font-bold leading-10 text-text-body sm:text-xl">{{ matchStats.duration }}</span>
                                <span class="text-xs font-medium text-text-subtitle">دقيقة</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IMatchLessDetails } from '~/features/matches/types/IMatchLessDetails'

defineProps<{
    match: IMatchLessDetails
    tournamentName?: string
    leagueId?: number | null
    matchStats: { duration: number, points: number, abnat: number }
    logoBaseUrl: string
}>()

const open = defineModel<boolean>('open', { default: true })
</script>
