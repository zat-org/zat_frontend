<template>
    <FetchDataWrapper class="relative md:w-5/6 lg:w2/3 mx-auto"
        :error="error ? 'تعذر تحميل بيانات البطولة برجاء المحاولة مرة اخرى.' : null" :pending="pending">
        <div v-if="champion">
            <h2 class="text-center text-2xl my-5 dark:text-slate-50"> استمارة الالتحاق ب{{ champion.attributes.name }}
            </h2>
            <FollowerChampionApplyForm :champion="champion" />
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
const route = useRoute();
useHead({
    title: `انضم لبطولات زات للبلوت`,
})

const { $api } = useNuxtApp();
const { error, pending, data } = await $api.followersChampions.getById(route.params.id as string);
const champion = computed(() => data.value?.data);
</script>

<style scoped></style>