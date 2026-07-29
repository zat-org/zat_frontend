<template>
    <FetchDataWrapper
        :error="error ? 'تعذر تحميل البيانات برجاء المحاولة لاحقا.' : null"
        :pending="pending"
        class="w-full"
    >
        <section
            v-if="teams && teams.length > 0"
            class="flex w-full flex-col items-stretch gap-4 px-5 pb-4 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-6 md:px-20"
            dir="rtl"
            aria-label="الفرق المشاركة"
        >
            <ChampionTeamCard
                v-for="team in teams"
                :key="team.id"
                :team="team"
                class="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:max-w-102.5"
            />
        </section>

        <div
            v-else
            class="flex min-h-50 flex-col items-center justify-center gap-2 py-10 text-lg text-text-caption"
        >
            <UIcon name="i-heroicons-exclamation-circle" class="size-16" />
            <h3>لا توجد فرق حاليا</h3>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import type { IChamp } from '@/Models/IChamp'

const props = defineProps<{ champ: IChamp }>()

const { $api } = useNuxtApp()
const { data, error, pending } = await $api.champions.getChampTeamsByChampId(
    props.champ.leagueid.toString(),
)
const teams = computed(() => data.value?.teams)

useHead({
    title: `الفرق المشاركة - ${props.champ.name}`,
    meta: [
        {
            name: 'description',
            content: `تعرف على الفرق المشاركة في بطولة ${props.champ.name}. قائمة كاملة بجميع الفرق المتنافسة في البطولة.`,
        },
        {
            property: 'og:title',
            content: `الفرق المشاركة - ${props.champ.name}`,
        },
        {
            property: 'og:description',
            content: `تعرف على الفرق المشاركة في بطولة ${props.champ.name}. قائمة كاملة بجميع الفرق المتنافسة في البطولة.`,
        },
    ],
})
</script>
