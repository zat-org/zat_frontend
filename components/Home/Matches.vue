<template>
    <FetchDataWrapper :error="error ? 'تعذر تحميل المباريات' : null" :pending="pending">
        <section class="mb-8 " v-if="matches && matches.length > 0">
            <SectionHeader :title="champName === null ? ' احدث المباريات ' : `مباريات ${champName}`"
                icon="i-heroicons-fire-16-solid" />
            <MatchList :matches="matches" />
        </section>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();
const { data, pending, error } = await $api.matches.getUpcoming();
const matches = computed(() => data.value?.matches);
const champName = computed(() => data.value?.name);
</script>

<style scoped></style>