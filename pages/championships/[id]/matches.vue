<template>
    <FetchDataWrapper
        :error="error ? 'تعذر تحميل المباريات برجاء المحاولة لاحقا.' : null"
        :pending="pending"
        class="w-full"
    >
        <section
            v-if="matches.length > 0"
            class="flex w-full flex-col items-stretch gap-4 px-5 pb-4 md:flex-row md:flex-wrap md:justify-center md:gap-6 md:px-20"
            dir="rtl"
            aria-label="المباريات"
        >
            <ChampionshipsOverviewMatchCard
                v-for="match in paginatedMatches"
                :key="match.id"
                :match="match"
                :champ-id="champ.leagueid"
                wide
                class="w-full md:w-[calc(50%-12px)] lg:max-w-130"
            />
        </section>

        <div
            v-if="showPagination"
            class="flex justify-center border-t border-surface-tone2 px-3 py-4"
        >
            <UPagination
                v-model:page="page"
                :page-count="pageSize"
                :total="totalItems"
            />
        </div>

        <div
            v-else-if="matches.length === 0"
            class="flex min-h-50 flex-col items-center justify-center gap-2 py-10 text-lg text-text-caption"
        >
            <UIcon name="i-heroicons-exclamation-circle" class="size-16" />
            <h3>لا توجد مباريات حاليا</h3>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import type { IChamp } from '@/Models/IChamp'
import { sortByTime } from '@/utils/CollectionsWithTimeUtils'

const props = defineProps<{ champ: IChamp }>()

const { $api } = useNuxtApp()
const { data, error, pending } = await $api.champions.getChampMatchesByChampId(
    props.champ.leagueid.toString(),
)
const matches = computed(() => {
    const list = data.value?.matches ?? []
    return [...list].sort(sortByTime)
})

const {
    page,
    pageSize,
    paginatedItems: paginatedMatches,
    totalItems,
    showPagination,
} = useClientPagination(matches, 6)

definePageMeta({
    name: 'leagueMatches',
})

useHead({
    title: `المباريات - ${props.champ.name}`,
    meta: [
        {
            name: 'description',
            content: `جدول مباريات بطولة ${props.champ.name}. تابع نتائج وتفاصيل جميع المباريات في البطولة.`,
        },
        {
            property: 'og:title',
            content: `المباريات - ${props.champ.name}`,
        },
        {
            property: 'og:description',
            content: `جدول مباريات بطولة ${props.champ.name}. تابع نتائج وتفاصيل جميع المباريات في البطولة.`,
        },
    ],
})
</script>
