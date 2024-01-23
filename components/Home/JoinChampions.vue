<template>
    <FetchDataWrapper :error="error ? 'تعذر تحميل بطولات المتابعين' : null" :pending="pending">
        <section class="mb-20" v-if="champs && champs.length > 0">
            <SectionHeader title="انضم لبطولات المتابعين" icon="i-heroicons-user-group-solid" />
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <template v-for="(champ, index) in champs" :key="champ.id">
                    <FollowerChampionCard :champion="champ" />
                </template>
            </div>
        </section>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();
const { data, pending, error } = await $api.followersChampions.getAll();
const champs = computed(() => data.value?.data);
</script>

<style scoped></style>