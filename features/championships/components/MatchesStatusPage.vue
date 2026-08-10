<template>
    <section
        class="w-full bg-surface-base"
        :aria-label="pageTitle"
        dir="rtl"
    >
        <!-- Title bar -->
        <div
            class="flex items-center justify-between gap-4 bg-surface-secondary px-4 pb-4 pt-6 sm:px-8 lg:px-[var(--spacing-page)]"
        >
            <h1 class="min-w-0 flex-1 truncate text-right text-xl font-bold leading-9 text-text-on-action">
                {{ pageTitle }}
            </h1>

            <div
                class="inline-flex shrink-0 overflow-hidden rounded"
                role="group"
                aria-label="طريقة العرض"
            >
                <button
                    type="button"
                    class="flex items-center border border-white p-2 transition-colors"
                    :class="viewMode === 'list'
                        ? 'bg-surface-raised text-text-body'
                        : 'bg-transparent text-text-on-action'"
                    :aria-pressed="viewMode === 'list'"
                    aria-label="عرض القائمة"
                    @click="viewMode = 'list'"
                >
                    <Icon name="zat:view-list" class="size-6" />
                </button>
                <button
                    type="button"
                    class="flex items-center border border-white border-s-0 p-2 transition-colors"
                    :class="viewMode === 'cards'
                        ? 'bg-surface-raised text-text-body'
                        : 'bg-transparent text-text-on-action'"
                    :aria-pressed="viewMode === 'cards'"
                    aria-label="عرض البطاقات"
                    @click="viewMode = 'cards'"
                >
                    <Icon name="zat:view-compact" class="size-6" />
                </button>
            </div>
        </div>

        <!-- Type tabs -->
        <div
            class="flex h-[52px] w-full items-center gap-4 overflow-x-auto border-b-2 border-surface-primary bg-nav-bar px-4 pt-4 sm:gap-6 sm:px-8 lg:px-[var(--spacing-page)]"
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

        <!-- List view -->
        <div
            v-if="viewMode === 'list'"
            class="page-container py-4 sm:py-6"
        >
            <FetchDataWrapper
                :error="historyError ? 'تعذر تحميل المباريات برجاء المحاولة لاحقا.' : null"
                :pending="historyPending"
            >
                <ChampionshipsMatchHistoryList
                    :champs="champs"
                    :media-base-url="mediaBaseUrl"
                    :status="status"
                    :empty-message="emptyListMessage"
                    variant="page"
                />
            </FetchDataWrapper>
        </div>

        <!-- Cards view -->
        <div
            v-else
            class="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-8 lg:px-10"
        >
            <FetchDataWrapper
                :error="cardsError ? 'تعذر تحميل البطولات برجاء المحاولة لاحقا.' : null"
                :pending="cardsPending"
            >
                <div
                    v-if="cardChamps.length > 0"
                    class="flex flex-wrap content-start items-start justify-center gap-6"
                >
                    <ChampionshipsTournamentCard
                        v-for="champ in cardChamps"
                        :key="champ.leagueid"
                        :champion="champ"
                        :media-base-url="mediaBaseUrl"
                    />
                </div>
                <div
                    v-else
                    class="flex min-h-50 flex-col items-center justify-center py-16 text-lg text-text-subtitle"
                >
                    <UIcon name="line-md:alert-circle" class="mb-2 block text-7xl" />
                    <p>{{ emptyCardsMessage }}</p>
                </div>
            </FetchDataWrapper>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { IMatchHistoryChamp, IMatchHistoryParams, MatchHistoryStatus } from '~/features/matches/types/IMatchHistory'
import { CHAMPIONSHIP_TYPE_CARDS } from '~/features/championships/utils/championshipTypes'

const props = defineProps<{
    /** previous = done matches page; upcoming = upcoming matches page */
    status: MatchHistoryStatus
}>()

const typeTabs = ['league', 'cup', 'super', 'hezam', 'followers']
    .map(label => CHAMPIONSHIP_TYPE_CARDS.find(card => card.label === label)!)
    .map(card => ({ label: card.label, title: card.title }))

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl
const { $api } = useNuxtApp()

const isUpcoming = computed(() => props.status === 'upcoming')

const pageTitle = computed(() =>
    isUpcoming.value ? 'المباريات القادمة' : 'المباريات السابقة',
)

const viewMode = ref<'list' | 'cards'>('list')
const typeTab = ref('league')

const historyParams = computed<IMatchHistoryParams>(() => ({
    type: typeTab.value === 'followers' ? 'league' : typeTab.value,
    status: props.status,
}))

const {
    data: historyData,
    pending: historyPending,
    error: historyError,
} = await $api.matches.getHistory(historyParams)

const cardsType = computed(() => (isUpcoming.value ? 'upcoming' : 'done'))
const {
    data: cardsData,
    pending: cardsPending,
    error: cardsError,
} = await $api.champions.getAll(cardsType)

const champs = computed<IMatchHistoryChamp[]>(() => {
    if (typeTab.value === 'followers') return []
    return (historyData.value?.champs ?? []).filter(champ =>
        (champ.groups ?? []).some(group => group.matches.length > 0),
    )
})

const cardChamps = computed(() => {
    if (typeTab.value === 'followers') return []
    return (cardsData.value?.champs ?? []).filter(champ => String(champ.type) === typeTab.value)
})

const emptyListMessage = computed(() => {
    if (typeTab.value === 'followers') {
        return 'بطولات المتابعين عبر صفحة الانضمام'
    }
    return isUpcoming.value
        ? 'لا توجد مباريات قادمة لهذا النوع'
        : 'لا توجد مباريات سابقة لهذا النوع'
})

const emptyCardsMessage = computed(() =>
    typeTab.value === 'followers'
        ? 'بطولات المتابعين عبر صفحة الانضمام'
        : 'لا توجد بطولات حاليا',
)

function typeTabClass(label: string) {
    const active = typeTab.value === label
    return active
        ? 'border-white font-bold text-text-on-action'
        : 'border-transparent font-normal text-text-on-action/90 hover:text-text-on-action'
}

useHead({
    title: () => `${pageTitle.value} - زات`,
    meta: [
        {
            name: 'description',
            content: () => isUpcoming.value
                ? 'تابع المباريات القادمة من بطولات زات للبلوت الاحترافي.'
                : 'تابع نتائج المباريات السابقة من بطولات زات للبلوت الاحترافي.',
        },
    ],
})
</script>
