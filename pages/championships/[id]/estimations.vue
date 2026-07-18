<template>
    <FetchDataWrapper :error="error ? 'تعذر تحميل التوقعات برجاء المحاولة لاحقا.' : null" :pending="pending"
        class="flex flex-col">
        <UTable :data="rows" :columns="columns" :loading="pending">
            <template #index-cell="{ row }">
                <p class="text-center">
                    # {{ row.original.index }}
                </p>
            </template>
            <template #username-cell="{ row }">
                <div class="flex items-center justify-center ">
                    <p>{{ row.original.username }}@</p>
                    <UAvatar icon="i-heroicons-user" class="ms-2" :src="row.original.avatar_url"
                        imgClass="object-cover object-top" />
                </div>
            </template>
            <template #sum-cell="{ row }">
                <p class="text-center font-bold">
                    {{ row.original.sum }}
                </p>
            </template>
        </UTable>
        <div class="flex justify-center px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
            <UPagination v-if="estimationResults" v-model:page="page" :page-count="pageCount"
                :total="estimationResults.length" />
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import type { IChamp } from "@/Models/IChamp"
import { useUserStore } from '~/stores/useUserStore';

const props = defineProps({
    champ: {
        required: true,
        type: Object as PropType<IChamp>
    }
});

const userStore = useUserStore()

const { $api } = useNuxtApp();
const { data, error, pending } = await $api.estimation.getEstimationTableByChampId(props.champ.leagueid);
const estimationResults = computed(() => data.value?.data.map((elm, index) => { return { ...elm, index: index + 1, class: elm.id === userStore.user?.id ? "bg-amber-100" : "" } }));
const page = ref(1)
const pageCount = 7
const userRow = computed(() => {
    if (userStore.isAuthenticated && estimationResults) {
        return estimationResults.value?.find(row => row.id === userStore.user!.id)
    }
    return undefined
})
const rows = computed(() => {
    let pageRows = estimationResults.value?.slice((page.value - 1) * pageCount, (page.value) * pageCount)
    if (userStore.isAuthenticated) {
        let isExistedInThisPage = pageRows?.find((row) => row.id === userStore.user?.id)
        if (userRow.value && !isExistedInThisPage) {
            pageRows?.unshift(userRow.value)
            pageRows?.pop()
        }
    }
    return pageRows
})
const columns = [{
    accessorKey: 'index',
    header: 'الترتيب'
}, {
    accessorKey: 'username',
    header: 'اسم المستخدم'
}, {
    accessorKey: 'sum',
    header: 'النقاط'
}]
definePageMeta({
    name: "champEstimations"
})

useHead({
    title: `التوقعات - ${props.champ.name}`,
    meta: [
        {
            name: 'description',
            content: `توقعات نتائج مباريات بطولة ${props.champ.name}. شارك في التوقعات، تابع ترتيب المتوقعين، واربح النقاط.`
        },
        {
            property: 'og:title',
            content: `التوقعات - ${props.champ.name}`
        },
        {
            property: 'og:description',
            content: `توقعات نتائج مباريات بطولة ${props.champ.name}. شارك في التوقعات، تابع ترتيب المتوقعين، واربح النقاط.`
        }
    ]
})
</script>

<style scoped></style>