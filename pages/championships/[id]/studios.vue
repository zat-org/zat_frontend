<template>
    <FetchDataWrapper
        :error="error ? 'تعذر تحميل الاستديو التحليلي برجاء المحاولة لاحقا.' : null"
        :pending="pending"
        class="w-full"
    >
        <section
            v-if="studios.length > 0"
            class="flex w-full flex-col items-stretch gap-4 px-5 pb-4 md:flex-row md:flex-wrap md:justify-center md:gap-6 md:px-20"
            dir="rtl"
            aria-label="الاستديو التحليلي"
        >
            <ChampionshipsOverviewStudioCard
                v-for="studio in paginatedStudios"
                :key="studio.id"
                :studio="studio"
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
            v-else-if="studios.length === 0"
            class="flex min-h-50 flex-col items-center justify-center gap-2 py-10 text-lg text-text-caption"
        >
            <UIcon name="i-heroicons-exclamation-circle" class="size-16" />
            <h3>لا يوجد استديو تحليلي حاليا</h3>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import type { IChamp } from '@/Models/IChamp'
import { sortByTime } from '@/utils/CollectionsWithTimeUtils'

const props = defineProps<{ champ: IChamp }>()

const { $api } = useNuxtApp()
const { data, error, pending } = await $api.champions.getChampStudiosByChampId(
    props.champ.leagueid.toString(),
)
const studios = computed(() => {
    const list = data.value?.studios ?? []
    return [...list].sort(sortByTime)
})

const {
    page,
    pageSize,
    paginatedItems: paginatedStudios,
    totalItems,
    showPagination,
} = useClientPagination(studios, 6)

definePageMeta({
    name: 'ChampStudios',
})

useHead({
    title: `الاستديو التحليلي - ${props.champ.name}`,
    meta: [
        {
            name: 'description',
            content: `شاهد الاستديو التحليلي لبطولة ${props.champ.name}. تحليلات المباريات، لقاءات مع اللاعبين والمدربين، ومناقشات فنية.`,
        },
        {
            property: 'og:title',
            content: `الاستديو التحليلي - ${props.champ.name}`,
        },
        {
            property: 'og:description',
            content: `شاهد الاستديو التحليلي لبطولة ${props.champ.name}. تحليلات المباريات، لقاءات مع اللاعبين والمدربين، ومناقشات فنية.`,
        },
    ],
})
</script>
