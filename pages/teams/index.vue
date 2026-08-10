<template>
    <div class="flex w-full flex-col bg-surface-base">
        <TeamPageHeader />
        <TeamPageHero />

        <FetchDataWrapper
            class="w-full"
            :error="error ? 'تعذر تحميل البيانات برجاء المحاولة لاحقا.' : null"
            :pending="pending"
        >
            <section
                class="w-full bg-surface-base py-6"
                aria-label="قائمة الفرق"
                dir="rtl"
            >
                <div
                    v-if="teams?.length"
                    class="page-container flex flex-wrap justify-center gap-6"
                >
                    <TeamLessDetails
                        v-for="team in teams"
                        :key="team.id"
                        :team="team"
                    />
                </div>
                <div
                    v-else
                    class="flex h-50 flex-col items-center justify-center py-10 text-lg text-text-subtitle"
                >
                    <UIcon
                        name="i-heroicons-exclamation-circle"
                        class="mb-2 size-16"
                    />
                    <h3>لا يوجد فرق حاليا</h3>
                </div>
            </section>
        </FetchDataWrapper>
    </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
const { data, pending, error } = await $api.teams.getAll()
const teams = computed(() => data.value?.teams)
const url = useRuntimeConfig().public.apiBaseUrl

useHead({
    title: 'فرق زات',
})

useSchemaOrg([
    defineWebPage({
        '@type': 'CollectionPage',
        name: 'فرق زات',
        description: 'مجموعة فرق زات',
    }),
    defineItemList({
        itemListElement: teams.value?.map((team, index) =>
            defineListItem({
                name: `${team.name}`,
                image: `${url}${team.team_logo}`,
                position: index + 1,
                url: `/teams`,
            }),
        ),
    }),
])
</script>
