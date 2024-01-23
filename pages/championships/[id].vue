<template>
    <FetchDataWrapper class="flex flex-col justify-center items-center text-zinc-700 dark:text-slate-50"
        :error="error ? 'تعذر تحميل البطولة برجاء المحاولة لاحقا.' : null" :pending="pending">
        <Menubar :champ="champ" />
        <KeepAlive max="4" class="w-full md:w-5/6">
            <NuxtPage :champ="champ" />
        </KeepAlive>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();
const route = useRoute()
const { data: champ, error, pending } = await $api.champions.getById(route.params.id as string);
</script>

<style scoped></style>