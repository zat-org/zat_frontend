<template>
    <NuxtPage
        v-if="isStandaloneChild"
        class="w-full grow"
    />

    <FetchDataWrapper
        v-else
        class="flex w-full grow flex-col justify-start items-stretch"
        :error="error ? 'تعذر تحميل البطولة برجاء المحاولة لاحقا.' : null"
        :pending="pending"
    >
        <template v-if="champ">
            <ChampionshipsTitleBar :champ="champ" />
            <ChampionshipsDetailHero
                :champ="champ"
                :summary="summary ?? null"
            />
            <Menubar :champ="champ" />
            <KeepAlive max="4">
                <div class="w-full grow p-4">
                    <NuxtPage
                        :champ="champ"
                        class="w-full grow"
                    />
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

const isMatchDetail = computed(() => {
    const id = String(route.params.id || '')
    const mid = String(route.params.mid || '')
    if (!id || !mid) return false
    const path = route.path.replace(/\/+$/, '') || '/'
    return path === `/championships/${id}/match/${mid}`
})

const isLiveTable = computed(() => {
    const id = String(route.params.id || '')
    if (!id) return false
    const path = route.path.replace(/\/+$/, '') || '/'
    return path === `/championships/${id}/table/live`
})

const isLiveMatchStats = computed(() => {
    const id = String(route.params.id || '')
    const mid = String(route.params.mid || '')
    if (!id || !mid) return false
    const path = route.path.replace(/\/+$/, '') || '/'
    return path === `/championships/${id}/match/${mid}/stats/live`
})

const isStandaloneChild = computed(
    () => isMatchDetail.value || isLiveTable.value || isLiveMatchStats.value,
)

const { data: champ, error, pending } = await $api.champions.getById(route.params.id as string)

const { data: summary } = champ.value?.leagueid && !isStandaloneChild.value
    ? await $api.champions.getChampSummaryWinnerByChampId(champ.value.leagueid.toString())
    : { data: ref(null) }

const isOverview = computed(() => {
    const id = String(route.params.id || '')
    const base = `/championships/${id}`
    const path = route.path.replace(/\/+$/, '') || '/'
    return path === base
})

useHead({
    title: computed(() => {
        if (isStandaloneChild.value) return undefined
        return champ.value ? `بطولات زات - ${champ.value.name}` : 'بطولات زات'
    }),
    meta: computed(() => {
        if (isStandaloneChild.value) return []
        return [
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
        ]
    }),
})
</script>
