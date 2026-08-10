<template>
    <FetchDataWrapper
        :error="error ? 'تعذر تحميل الاستديو التحليلي برجاء المحاولة لاحقا.' : null"
        :pending="pending"
        class="flex flex-col"
    >
        <div class="page-container flex w-full flex-col gap-4 py-2">
            <template v-if="sortedStudios.length > 0">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <ChampionshipsOverviewStudioCard
                        v-for="studio in pagedStudios"
                        :key="studio.id"
                        :studio="studio"
                    />
                </div>

                <div
                    v-if="totalPages > 1"
                    class="flex justify-center pt-2"
                >
                    <Pagination
                        :page-size="pageSize"
                        :total-items-count="sortedStudios.length"
                        :current-page="currentPage"
                        @go-to-page="goToPage"
                    />
                </div>
            </template>

            <div
                v-else
                class="flex min-h-40 flex-col items-center justify-center gap-2 py-10 text-lg text-text-caption"
            >
                <Icon
                    name="line-md:alert-circle"
                    class="block text-9xl"
                />
                <h3>لا يوجد استديو تحليلي حاليا</h3>
            </div>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import type { IChamp } from '~/features/championships/types/IChamp'
import type { IStudio } from '~/features/championships/types/IStudio'
import { sortByTime } from '~/features/matches/utils/CollectionsWithTimeUtils'

const props = defineProps<{ champ: IChamp }>()

const { $api } = useNuxtApp()
const { data, error, pending } = await $api.champions.getChampStudiosByChampId(
    props.champ.leagueid.toString(),
)

const pageSize = 10
const currentPage = ref(1)

const sortedStudios = computed(() =>
    [...(data.value?.studios ?? [])].sort(sortByTime) as IStudio[],
)

const totalPages = computed(() =>
    Math.max(1, Math.ceil(sortedStudios.value.length / pageSize)),
)

const pagedStudios = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return sortedStudios.value.slice(start, start + pageSize)
})

watch(sortedStudios, () => {
    if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value
    }
})

function goToPage(page: number) {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
}

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
