<template>
    <FetchDataWrapper
        class="w-full"
        :error="getTeamError ? 'تعذر تحميل بيانات الفريق برجاء المحاولة لاحقا.' : null"
        :pending="getTeamPending"
    >
        <template v-if="team">
            <div class="flex w-full flex-col bg-surface-base">
                <TeamPageHeader :team-name="team.name" />
                <TeamDetailHero :team="team" />

                <section
                    class="w-full bg-surface-off-base py-6"
                    aria-label="اعضاء الفريق"
                    dir="rtl"
                >
                    <div class="page-container flex flex-col gap-4">
                        <ChampionshipsSectionDivider title="اعضاء الفريق" />

                        <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
                            <div class="min-w-0 flex-2">
                                <TeamPlayers
                                    :players="team.players"
                                    :coaches="team.coaches"
                                />
                            </div>
                            <div class="w-full shrink-0 flex-3 ">
                                <TeamTransferList
                                    :transfers="team.transfers"
                                    :current-team-name="team.name"
                                >
                                    <template #noTransText>
                                        لم يجري الفريق اي انتقالات حتي الان
                                    </template>
                                </TeamTransferList>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    class="w-full bg-surface-base py-6"
                    aria-label="احصائيات الفريق"
                    dir="rtl"
                >
                    <div class="page-container flex flex-col gap-4">
                        <ChampionshipsSectionDivider title="احصائيات الفريق" />

                        <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
                            <TeamStatistics :statistics="team.statistics"  class="lg:col-span-9"/>
                            <TeamChampList :champs="team.champs" class="lg:col-span-3"/>
                        </div>
                    </div>
                </section>
            </div>
        </template>

        <div
            v-else-if="!getTeamPending"
            class="flex flex-col items-center justify-center py-16"
        >
            <UIcon
                name="i-heroicons-x-circle"
                class="mb-3 size-20 text-text-caption"
            />
            <h4 class="text-center text-lg text-text-body">
                هذا الفريق غير موجود
            </h4>
            <UButton
                to="/teams"
                class="mt-5"
                icon="i-heroicons-user-group"
            >
                فرق زات
            </UButton>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
const route = useRoute()
const url = useRuntimeConfig().public.apiBaseUrl

const {
    error: getTeamError,
    pending: getTeamPending,
    data,
} = await $api.teams.getById(route.params.id as string)

const team = computed(() => data.value?.data)

useHead({
    title: computed(() =>
        team.value?.name ? `فرق زات - ${team.value.name}` : 'فرق زات',
    ),
    meta: computed(() => [
        {
            name: 'description',
            content: team.value?.name
                ? `تعرف على فريق ${team.value.name} - احصائيات الفريق، قائمة اللاعبين، المدربين، والإنجازات في بطولات البلوت.`
                : 'استكشف فرق زات للبلوت - معلومات عن الفرق المشاركة في بطولات البلوت.',
        },
        {
            property: 'og:title',
            content: team.value?.name ? `فرق زات - ${team.value.name}` : 'فرق زات',
        },
        {
            property: 'og:description',
            content: team.value?.name
                ? `تعرف على فريق ${team.value.name} - احصائيات الفريق، قائمة اللاعبين، المدربين، والإنجازات في بطولات البلوت.`
                : 'استكشف فرق زات للبلوت - معلومات عن الفرق المشاركة في بطولات البلوت.',
        },
        {
            property: 'og:image',
            content: team.value ? url + team.value.team_logo : undefined,
        },
    ]),
})
</script>
