<template>
    <FetchDataWrapper class="w-full mx-10 lg:w-5/6 py-3 lg:py-10"
        :error="error ? 'تعذر تحميل البيانات برجاء المحاولة لاحقا.' : null" :pending="pending">
        <SectionHeader title="بطولات زات" icon="i-heroicons-trophy" />
        <div class="list-grid">
            <template v-if="champs && champs.length > 0" v-for="champ in champs">
                <ChampionCard :champion="champ" />
            </template>
            <div v-else class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center">
                <Icon name="line-md:alert-circle" class="block text-9xl" />
                <h3>لا توجد بطولات حاليا</h3>
            </div>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
useHead({
    title: `بطولات زات`,
})
const route = useRoute()
const indicator = useLoadingIndicator();
const { $api } = useNuxtApp();
const champType = computed(() => route.query.type as string);
const { data, pending, error } = await $api.champions.getAll(champType, { watch: [champType] });
const champs = computed(() => data.value?.champs);
watch(pending, (newValue) => {
    if (newValue)
        indicator.start();
    else
        indicator.finish();
})
</script>

<style scoped></style>