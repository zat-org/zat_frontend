<template>
    <FetchDataWrapper
        :error="error ? 'تعذر تحميل المباريات برجاء المحاولة لاحقا.' : null"
        :pending="pending"
        class="min-w-0 flex-1"
    >
        <section
            class="flex h-full max-h-[720px] w-full flex-col overflow-hidden rounded-zat-md border-2 border-surface-tone2 bg-surface-raised xl:max-h-[760px]"
            aria-label="سجل المباريات"
        >
            <!-- Time tabs -->
            <div class="flex w-full shrink-0 items-center bg-surface-secondary px-4 pb-4 pt-6 sm:px-6">
                <div class="flex flex-1 items-center gap-6">
                    <button
                        type="button"
                        class="flex h-9 items-center justify-center border-b-2 text-xl leading-9 transition-colors"
                        :class="timeTabClass('upcoming')"
                        @click="timeTab = 'upcoming'"
                    >
                        المباريات القادمة
                    </button>
                    <button
                        type="button"
                        class="flex h-9 items-center justify-center border-b-2 text-xl leading-9 transition-colors"
                        :class="timeTabClass('previous')"
                        @click="timeTab = 'previous'"
                    >
                        المباريات السابقة
                    </button>
                </div>
            </div>

            <!-- Type tabs -->
            <div
                class="flex h-[52px] w-full shrink-0 items-center gap-4 overflow-x-auto border-b-2 border-surface-primary bg-[#343232] px-4 pt-4 sm:gap-6 sm:px-6"
            >
                <button
                    v-for="tab in typeTabs"
                    :key="tab.label"
                    type="button"
                    class="flex h-full shrink-0 items-center justify-center border-b-4 text-xl leading-9 whitespace-nowrap transition-colors"
                    :class="typeTabClass(tab.label)"
                    @click="typeTab = tab.label"
                >
                    {{ tab.title }}
                </button>
            </div>

            <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                <ChampionshipsMatchHistoryList
                    :champs="champs"
                    :media-base-url="mediaBaseUrl"
                    :status="timeTab"
                    :empty-message="emptyMessage"
                    variant="panel"
                />
            </div>

            <div class="flex h-20 w-full shrink-0 items-center justify-center border-t border-surface-tone2 px-4">
                <NuxtLink
                    :to="moreLink"
                    class="inline-flex items-center justify-center border-b border-text-action px-0.5 text-xl font-bold leading-9 text-text-action transition-opacity hover:opacity-80"
                >
                    عرض المزيد
                </NuxtLink>
            </div>
        </section>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import type { IMatchHistoryChamp, IMatchHistoryParams } from '@/Models/IMatchHistory'
import { CHAMPIONSHIP_TYPE_CARDS } from '~/utils/championshipTypes'

const MATCH_LIMIT = 6

const typeTabs = [...CHAMPIONSHIP_TYPE_CARDS]
    .reverse()
    .map(card => ({ label: card.label, title: card.title }))

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl
const { $api } = useNuxtApp()

const timeTab = ref<'previous' | 'upcoming'>('previous')
const typeTab = ref('league')

const historyParams = computed<IMatchHistoryParams>(() => ({
    type: typeTab.value === 'followers' ? 'league' : typeTab.value,
    status: timeTab.value,
    limit: MATCH_LIMIT,
}))

const { data, pending, error } = await $api.matches.getHistory(historyParams)

const champs = computed<IMatchHistoryChamp[]>(() => {
    if (typeTab.value === 'followers') {
        return []
    }
    return (data.value?.champs ?? []).filter(champ =>
        (champ.groups ?? []).some(group => group.matches.length > 0),
    )
})

const emptyMessage = computed(() => {
    if (typeTab.value === 'followers') {
        return 'بطولات المتابعين عبر صفحة الانضمام'
    }
    return timeTab.value === 'previous'
        ? 'لا توجد مباريات سابقة لهذا النوع'
        : 'لا توجد مباريات قادمة لهذا النوع'
})

const moreLink = computed(() =>
    timeTab.value === 'previous'
        ? '/championships/done'
        : '/championships/upcoming',
)

function timeTabClass(tab: 'previous' | 'upcoming') {
    const active = timeTab.value === tab
    return active
        ? 'border-white font-bold text-text-on-action'
        : 'border-transparent font-normal text-text-on-action/90 hover:text-text-on-action'
}

function typeTabClass(label: string) {
    const active = typeTab.value === label
    return active
        ? 'border-white font-bold text-text-on-action'
        : 'border-transparent font-normal text-text-on-action/90 hover:text-text-on-action'
}
</script>
