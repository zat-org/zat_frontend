<template>
    <FetchDataWrapper class="relative w-full md:w-5/6 lg:w2/3 mx-auto" :error="getTeamError ? '' : null"
        :pending="getTeamPending">
        <template v-if="team">
            <div class="flex flex-col justify-center items-center my-5 space-y-5">
                <h2 class="font-semibold text-2xl">فريق {{ team.name }}</h2>
                <UAvatar size="3xl"
                    :ui="{ rounded: 'rounded-lg object-contain object-center shadow-lg', size: { '3xl': 'w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32' } }"
                    :src="url + team.team_logo" icon="i-heroicons-users" :alt="team.name" />
                <section class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-10 w-full">
                    <TeamBasicInfo class="md:col-span-2" v-bind:team="team" />
                    <section class="w-full">
                        <UDivider class="mb-3" label=" الفريق" />
                        <TeamPlayers :players="team.players" :coaches="team.coaches" />
                    </section>

                    <section class="w-full">
                        <UDivider class="mb-3" label="بطولات الفريق" />
                        <TeamChampList v-bind:champs="team.champs" />
                    </section>

                    <section class="w-full">
                        <UDivider class="mb-3" label="انتقالات الاعبين" />
                        <TeamTransferList v-bind:transfers="team.transfers" :currentTeamName="team.name">
                            <template #noTransText>
                                لم يجري الفريق اي انتقالات حتي الان
                            </template>
                        </TeamTransferList>
                    </section>
                    <section class="w-full">
                        <UDivider class="mb-3" label="احصائيات الفريق" />
                        <div class="divider my-5"> </div>
                        <TeamStatistics v-bind:statistics="team.statistics" />
                    </section>
                </section>
            </div>
            <BackBtn />
        </template>
        <div v-else class="flex flex-col justify-center items-center mt-10">
            <Icon name="line-md:close-small" size="100" />
            <h4 class="text-center">هذا الفريق غير موجود</h4>
            <UButton to="/teams" class="mt-5" icon="i-heroicons-users"> فرق زات</UButton>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">

const { $api } = useNuxtApp();
const route = useRoute();
const url = useRuntimeConfig().public.apiBaseUrl;
const { error: getTeamError, pending: getTeamPending, data } = await $api.teams.getById(route.params.id as string);
const team = computed(() => data.value?.data);
useHead({
    title: team.value?.name ? `فرق زات - ${team.value?.name}` : 'فرق زات',
    meta: computed(() => [
        {
            name: 'description',
            content: team.value?.name ? 
                `تعرف على فريق ${team.value.name} - احصائيات الفريق، قائمة اللاعبين، المدربين، والإنجازات في بطولات البلوت.` :
                'استكشف فرق زات للبلوت - معلومات عن الفرق المشاركة في بطولات البلوت.'
        },
        {
            property: 'og:title',
            content: team.value?.name ? `فرق زات - ${team.value.name}` : 'فرق زات'
        },
        {
            property: 'og:description',
            content: team.value?.name ? 
                `تعرف على فريق ${team.value.name} - احصائيات الفريق، قائمة اللاعبين، المدربين، والإنجازات في بطولات البلوت.` :
                'استكشف فرق زات للبلوت - معلومات عن الفرق المشاركة في بطولات البلوت.'
        },
        {
            property: 'og:image',
            content: team.value ? url + team.value.team_logo : undefined
        }
    ])
})

</script>

<style scoped></style>