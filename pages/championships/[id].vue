<template>
    <FetchDataWrapper class="w-full flex flex-col grow justify-start items-center"
        :error="error ? 'تعذر تحميل البطولة برجاء المحاولة لاحقا.' : null" :pending="pending">
        <template v-if="champ">
            <Menubar :champ="champ" />
            <KeepAlive max="4" class="w-full grow md:w-5/6">
                <NuxtPage :champ="champ" />
            </KeepAlive>
        </template>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();
const route = useRoute()
const { data: champ, error, pending } = await $api.champions.getById(route.params.id as string);
</script>

<style scoped></style>