<template>
    <div class="mx-auto w-full lg:w-5/6 py-10">
        <FetchDataWrapper :error="error ? 'تعذر تحميل البيانات برجاء المحاولة مرة اخري لاحقا.' : null" :pending="pending">
            <section class="mb-20" v-if="champions && champions.length > 0">
                <SectionHeader title="بطولات المتابعين" icon="i-heroicons-trophy" />
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    <template v-for="champ in champions" :key="champ.id">
                        <FollowerChampionCard :champion="champ" />
                    </template>
                </div>
            </section>
            <div v-else
                class="text-zinc-700 dark:text-slate-50 text-lg h-50 flex flex-col justify-center items-center py-10">
                <Icon name="line-md:alert-circle" class="block text-9xl" />
                <h3>لا يوجد بطولات للمتابعين حاليا</h3>
            </div>
        </FetchDataWrapper>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: `انضم لبطولات زات للبلوت`,
})

const { $api } = useNuxtApp();
const { error: error, pending: pending, data } = await $api.followersChampions.getAll();
const champions = computed(() => data.value?.data);

</script>

<style scoped></style>