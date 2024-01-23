<template>
    <div class="text-gray-900 dark:text-slate-50 body-font container mx-auto my-5 ">
        <FetchDataWrapper :error="error ? 'تعذر تحميل البيانات برجاء المحاولة مرة اخري لاحقا.' : null" :pending="pending">
            <section class="mb-20" v-if="champions && champions.length > 0">
                <div class="flex flex-wrap w-full mb-3 md:mb-6">
                    <div class="lg:w-1/2 w-full ">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 ">
                            <UIcon name="i-heroicons-trophy" class="text-amber-500 text-[30px]" />
                            بطولات المتابعين
                        </h1>
                        <div class="h-1 w-32 bg-yellow-500 rounded"></div>
                    </div>
                </div>
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