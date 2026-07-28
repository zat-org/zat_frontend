<template>
    <FetchDataWrapper
        class="flex w-full grow flex-col justify-start items-stretch"
        :error="error ? 'تعذر تحميل البطولة برجاء المحاولة لاحقا.' : null"
        :pending="pending"
    >
        <template v-if="champ">
            <ChampionshipsTitleBar :champ="champ" />
            <ChampionshipsDetailHero
                v-if="isOverview"
                :champ="champ"
                :summary="summary ?? null"
            />
            <Menubar :champ="champ" />
            <KeepAlive max="4">
                <div class="w-full grow p-4">

                    <NuxtPage :champ="champ" class="w-full grow" />
                </div>
            </KeepAlive>
            <ChampionshipsOverviewMatchesSection
            v-if="isOverview"
                :champ="champ"
            />
        </template>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
const route = useRoute()
const { data: champ, error, pending } = await $api.champions.getById(route.params.id as string)

const { data: summary } = champ.value?.leagueid
    ? await $api.champions.getChampSummaryWinnerByChampId(champ.value.leagueid.toString())
    : { data: ref(null) }

const isOverview = computed(() => {
    const id = String(route.params.id || '')
    const base = `/championships/${id}`
    const path = route.path.replace(/\/+$/, '') || '/'
    return path === base
})

useHead({
    title: computed(() => champ.value ? `بطولات زات - ${champ.value.name}` : 'بطولات زات'),
    meta: computed(() => [
        {
            name: 'description',
            content: champ.value
                ? `تفاصيل بطولة ${champ.value.name} من زات. تابع الفرق المشاركة، جدول المباريات، والنتائج المباشرة.`
                : 'تفاصيل بطولات البلوت من زات',
        },
        {
            property: 'og:title',
            content: champ.value ? `بطولات زات - ${champ.value.name}` : 'بطولات زات',
        },
        {
            property: 'og:description',
            content: champ.value
                ? `تفاصيل بطولة ${champ.value.name} من زات. تابع الفرق المشاركة، جدول المباريات، والنتائج المباشرة.`
                : 'تفاصيل بطولات البلوت من زات',
        },
    ]),
})
</script>
