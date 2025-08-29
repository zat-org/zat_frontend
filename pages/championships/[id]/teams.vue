<template>
    <FetchDataWrapper :error="error ? ' تعذر تحميل البيانات برجاء المحاولة لاحقا.' : null" :pending="pending"
        class="flex flex-col justify-center overflow-hidden">
        <div class="h-fit px-5 md:px-14" v-if="teams && teams.length > 0" :key="teams.length">
            <swiper-container class="w-full h-full" effect="slide" :loop="true" :slides-per-view="1" :slides-per-group="1" :space-between="10"
                :keyboard="{ enabled: true }" :pagination="true" :mousewheel="true">

                <swiper-slide v-for="team in teams" :key="team.id">
                    <ChampionTeamCard :team="team" />
                </swiper-slide>
            </swiper-container>
        </div>
        <div v-else class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center py-10">
            <Icon name="line-md:alert-circle" class="block text-9xl" />
            <h3>لا توجد فرق حاليا</h3>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts" >
import type { IChamp } from "@/Models/IChamp"
const props = defineProps<{ champ: IChamp }>();
const { $api } = useNuxtApp();
const { data, error, pending } = await $api.champions.getChampTeamsByChampId(props.champ.leagueid.toString());
const teams = computed(() => data.value?.teams);
useHead({
    title: `الفرق المشاركة - ${props.champ.name}`,
    meta: [
        {
            name: 'description',
            content: `تعرف على الفرق المشاركة في بطولة ${props.champ.name}. قائمة كاملة بجميع الفرق المتنافسة في البطولة.`
        },
        {
            property: 'og:title',
            content: `الفرق المشاركة - ${props.champ.name}`
        },
        {
            property: 'og:description',
            content: `تعرف على الفرق المشاركة في بطولة ${props.champ.name}. قائمة كاملة بجميع الفرق المتنافسة في البطولة.`
        }
    ]
})
</script>

<style scoped></style>