<template>
    <main class="relative md:w-5/6 lg:w2/3 mx-auto">
        <FetchDataWrapper
            :error="error ? 'تعذر تحميل بيانات البطولة برجاء المحاولة مرة اخرى.' : null" 
            :pending="pending">
            <article v-if="champion">
                <header>
                    <h1 class="text-center text-2xl my-5 dark:text-slate-50">
                        استمارة الالتحاق ب{{ champion.attributes.name }}
                    </h1>
                </header>
                <section>
                    <FollowerChampionApplyForm :champion="champion" />
                </section>
            </article>
        </FetchDataWrapper>
    </main>
</template>

<script setup lang="ts">
const route = useRoute();

const { $api } = useNuxtApp();
const { error, pending, data } = await $api.followersChampions.getById(route.params.id as string);
const champion = computed(() => data.value?.data);
useHead({
    title: champion.value ? `انضم لبطولة ${champion.value.attributes.name}` : 'انضم لبطولات زات للبلوت',
    meta: computed(() => [
        {
            name: 'description',
            content: champion.value ? 
                `التحق ببطولة ${champion.value.attributes.name}. املأ استمارة المشاركة وانضم إلى أقوى بطولات البلوت في المملكة.` :
                'انضم إلى بطولات زات للبلوت. شارك في أقوى بطولات البلوت في المملكة.'
        },
        {
            property: 'og:title',
            content: champion.value ? `انضم لبطولة ${champion.value.attributes.name}` : 'انضم لبطولات زات للبلوت'
        },
        {
            property: 'og:description',
            content: champion.value ? 
                `التحق ببطولة ${champion.value.attributes.name}. املأ استمارة المشاركة وانضم إلى أقوى بطولات البلوت في المملكة.` :
                'انضم إلى بطولات زات للبلوت. شارك في أقوى بطولات البلوت في المملكة.'
        }
    ])
})
</script>

<style scoped></style>