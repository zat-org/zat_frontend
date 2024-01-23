<template>
    <FetchDataWrapper class="mx-auto w-full lg:w-5/6 py-10"
        :error="error ? 'تعذر تحميل البيانات برجاء المحاولة لاحقا.' : null" :pending="pending">

        <SectionHeader title="فرق زات" icon="i-heroicons-user-group-solid" />
        <div class="list-grid mx-2" v-if="teams && teams.length > 0">
            <TeamLessDetails v-for="team in teams" :key="team.id" :team="team" />
        </div>
        <div v-else class="text-zinc-700 dark:text-slate-50 text-lg h-50 flex flex-col justify-center items-center py-10">
            <Icon name="line-md:alert-circle" class="block text-9xl" />
            <h3>لا يوجد فرق حاليا</h3>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">

const { $api } = useNuxtApp();
const { data, pending, error } = await $api.teams.getAll();
const teams = computed(() => data.value?.teams);
useHead({
    title: `فرق زات`,
})
</script>

<style scoped></style>