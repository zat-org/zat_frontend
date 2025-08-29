<template>
    <FetchDataWrapper class="w-full flex flex-col grow justify-start items-center"
        :error="error ? 'تعذر تحميل البطولة برجاء المحاولة لاحقا.' : null" :pending="pending">
        <template v-if="champ">
            <Menubar :champ="champ" />
            <KeepAlive max="4">
                <NuxtPage :champ="champ" class="grow w-full md:w-2/3 xl:w-1/2 mx-7 " />
            </KeepAlive>
        </template>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();
const route = useRoute()
const { data: champ, error, pending } = await $api.champions.getById(route.params.id as string);

useHead({
    title: computed(() => champ.value ? `بطولات زات - ${champ.value.name}` : 'بطولات زات'),
    meta: computed(() => [
        { 
            name: 'description', 
            content: champ.value ? 
                `تفاصيل بطولة ${champ.value.name} من زات. تابع الفرق المشاركة، جدول المباريات، والنتائج المباشرة.` : 
                'تفاصيل بطولات البلوت من زات'
        },
        { 
            property: 'og:title', 
            content: champ.value ? `بطولات زات - ${champ.value.name}` : 'بطولات زات'
        },
        { 
            property: 'og:description', 
            content: champ.value ? 
                `تفاصيل بطولة ${champ.value.name} من زات. تابع الفرق المشاركة، جدول المباريات، والنتائج المباشرة.` : 
                'تفاصيل بطولات البلوت من زات'
        }
    ])
});
</script>

<style scoped></style>