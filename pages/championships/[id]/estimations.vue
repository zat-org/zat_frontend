<template>
    <FetchDataWrapper
        :error="error ? 'تعذر تحميل التوقعات برجاء المحاولة لاحقا.' : null"
        :pending="pending"
        class="w-full page-container "
    >
        <article
            class="relative flex w-full flex-col overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-raised"
            aria-label="توقع النقاط"
            dir="rtl"
        >
            <header class="flex h-17 shrink-0 items-center bg-nav-bar px-6">
                <h2 class="text-base font-bold leading-7 text-white">
                    توقع النقاط
                </h2>
            </header>

            <div
                v-if="rows.length"
                class="flex flex-col gap-2 px-4 py-2 min-h-[30vh]"
            >
                <div
                    v-for="row in rows"
                    :key="row.id"
                    class="flex items-center justify-between gap-2 rounded-zat-sm px-1 py-0.5"
                    :class="row.isCurrentUser ? 'bg-[rgba(252,196,93,0.15)]' : ''"
                >
                    <div class="flex min-w-0 flex-1 items-center justify-start gap-2">
                        <span class="shrink-0 font-numbers text-base leading-7 text-text-body">
                            #{{ row.index }}
                        </span>
                        <UAvatar
                            v-if="row.avatar_url"
                            :src="row.avatar_url"
                            icon="i-heroicons-user"
                            size="xs"
                            :ui="{ root: 'shrink-0', image: 'object-cover object-top' }"
                        />
                        <p class="truncate text-base leading-7 text-text-body">
                            @{{ row.username }}
                        </p>
                    </div>
                    <span
                        class="flex shrink-0 items-center justify-center rounded-zat-sm bg-[rgba(252,196,93,0.25)] px-2 py-0.5 font-numbers text-base font-bold leading-7 text-text-body"
                    >
                        {{ row.sum }}
                    </span>
                </div>
            </div>

            <div
                v-else-if="!pending"
                class="flex min-h-32 items-center justify-center px-4 py-6 text-base text-text-caption"
            >
                لا توجد توقعات حالياً
            </div>

            <div
                v-if="estimationResults.length > pageSize"
                class="mt-auto flex items-center justify-center border-t border-surface-tone2 py-3"
            >
                <UPagination
                    v-model:page="page"
                    :items-per-page="pageSize"
                    :total="estimationResults.length"
                />
            </div>
        </article>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import type { IChamp } from '~/features/championships/types/IChamp'
import { useUserStore } from '~/stores/useUserStore'

const props = defineProps<{
    champ: IChamp
}>()

const userStore = useUserStore()
const { $api } = useNuxtApp()

const { data, error, pending } = await $api.estimation.getEstimationTableByChampId(props.champ.leagueid)

const estimationResults = computed(() =>
    (data.value?.data ?? []).map((elm, index) => ({
        ...elm,
        index: index + 1,
        isCurrentUser: elm.id === userStore.user?.id,
    })),
)

const page = ref(1)
const pageSize = 10

const userRow = computed(() => {
    if (!userStore.isAuthenticated) return undefined
    return estimationResults.value.find(row => row.isCurrentUser)
})

const rows = computed(() => {
    const pageRows = estimationResults.value.slice(
        (page.value - 1) * pageSize,
        page.value * pageSize,
    )

    if (!userStore.isAuthenticated || !userRow.value) return pageRows

    const existsOnPage = pageRows.some(row => row.isCurrentUser)
    if (existsOnPage) return pageRows

    return [userRow.value, ...pageRows.slice(0, pageSize - 1)]
})

definePageMeta({
    name: 'champEstimations',
})

useHead({
    title: `التوقعات - ${props.champ.name}`,
    meta: [
        {
            name: 'description',
            content: `توقعات نتائج مباريات بطولة ${props.champ.name}. شارك في التوقعات، تابع ترتيب المتوقعين، واربح النقاط.`,
        },
        {
            property: 'og:title',
            content: `التوقعات - ${props.champ.name}`,
        },
        {
            property: 'og:description',
            content: `توقعات نتائج مباريات بطولة ${props.champ.name}. شارك في التوقعات، تابع ترتيب المتوقعين، واربح النقاط.`,
        },
    ],
})
</script>
