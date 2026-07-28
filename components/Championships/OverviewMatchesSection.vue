<template>
    <section
        class="w-full bg-[#F8F8F6] py-6"
        aria-label="المباريات"
        dir="rtl"
    >
        <div class="page-container flex flex-col gap-4">
            <ChampionshipsSectionDivider title="المباريات" />

            <FetchDataWrapper
                :error="sectionError"
                :pending="pending"
            >
                <div
                    v-if="!pending"
                    class="flex flex-col gap-6 lg:flex-row lg:items-stretch"
                >
                    <div class="flex min-w-0 flex-1 flex-col gap-4">
                        <template v-if="previewMatches.length">
                            <ChampionshipsOverviewMatchCard
                                v-for="match in previewMatches"
                                :key="match.id"
                                :match="match"
                                :champ-id="champ.leagueid"
                            />
                        </template>
                        <div
                            v-else
                            class="flex min-h-40 flex-1 items-center justify-center rounded-zat-md border border-surface-tone2 bg-surface-off-base px-4 text-base text-text-caption"
                        >
                            لا توجد مباريات حالياً
                        </div>

                        <NuxtLink
                            :to="`/championships/${champ.leagueid}/matches`"
                            class="inline-flex h-20 items-center justify-center text-xl font-bold leading-9 text-text-action underline transition-opacity hover:opacity-80"
                        >
                            عرض المزيد
                        </NuxtLink>
                    </div>

                    <div class="flex w-full flex-col gap-4 lg:max-w-102 lg:shrink-0">
                        <template v-if="previewStudios.length">
                            <ChampionshipsOverviewStudioCard
                                v-for="studio in previewStudios"
                                :key="studio.id"
                                :studio="studio"
                            />
                        </template>
                        <div
                            v-else
                            class="flex min-h-40 flex-1 items-center justify-center rounded-zat-md border border-surface-tone2 bg-surface-off-base px-4 text-base text-text-caption"
                        >
                            لا يوجد تحليل حالياً
                        </div>

                        <NuxtLink
                            :to="`/championships/${champ.leagueid}/studios`"
                            class="inline-flex h-20 items-center justify-center text-xl font-bold leading-9 text-text-action underline transition-opacity hover:opacity-80"
                        >
                            عرض المزيد
                        </NuxtLink>
                    </div>
                </div>
            </FetchDataWrapper>
        </div>
    </section>
</template>

<script setup lang="ts">
import MatchState from '@/Models/MatchState'
import type { IChamp } from '@/Models/IChamp'
import type { IMatchLessDetails } from '@/Models/IMatchLessDetails'
import type { IStudio } from '@/Models/IStudio'

const props = defineProps<{
    champ: IChamp
}>()

const { $api } = useNuxtApp()

const [
    { data: matchesData, error: matchesError, pending: matchesPending },
    { data: studiosData, error: studiosError, pending: studiosPending },
] = await Promise.all([
    $api.champions.getChampMatchesByChampId(props.champ.leagueid.toString()),
    $api.champions.getChampStudiosByChampId(props.champ.leagueid.toString()),
])

const pending = computed(() => matchesPending.value || studiosPending.value)

const sectionError = computed(() => {
    if (matchesError.value || studiosError.value) {
        return 'تعذر تحميل المباريات برجاء المحاولة لاحقاً.'
    }
    return null
})

const previewMatches = computed(() => {
    const matches = matchesData.value?.matches ?? []
    const done = matches.filter(match => match.state === MatchState.Done)
    const pool = done.length > 0 ? done : matches
    return [...pool]
        .sort((a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime())
        .slice(0, 2) as IMatchLessDetails[]
})

const previewStudios = computed(() => {
    const studios = studiosData.value?.studios ?? []
    return [...studios]
        .sort((a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime())
        .slice(0, 2) as IStudio[]
})
</script>
