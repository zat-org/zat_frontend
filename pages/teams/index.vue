<template>
    <FetchDataWrapper :error="error ? 'تعذر تحميل البيانات برجاء المحاولة لاحقا.' : null" :pending="pending">
        <div class="w-full my-3 md:mb-6">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 flex justify-start items-center">
                <UIcon name="i-heroicons-user-group-solid" class="me-2 text-amber-500 text-4xl" />
                فرق زات
            </h1>
            <div class="h-1 w-32 bg-amber-500 rounded"></div>
        </div>
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