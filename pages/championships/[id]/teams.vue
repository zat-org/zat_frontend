<template>
    <FetchDataWrapper :error="error ? ' تعذر تحميل البيانات برجاء المحاولة لاحقا.' : null" :pending="pending"
        class="flex flex-col justify-center overflow-hidden">
        <div class="h-96 px-5 md:px-14" v-if="teams && teams.length > 0">
            <swiper-container class="w-full h-full" effect="cards" :centerInsufficientSlides="true" :loop="true"
                :slides-per-view="1" :space-between="10" :keyboard="{ enabled: true }" :pagination="true"
                :mousewheel="true">
                <swiper-slide v-for="team in teams" :key="team.id"
                    class="w-full bg-zinc-100 dark:bg-slate-600 rounded-xl shadow-lg p-4 flex flex-col justify-start items-center space-y-2 relative overflow-hidden">
                    <UButton :to="`/teams/${team.id}`" class="absolute h-12 w-12 rounded-full -top-3 -left-3 ">
                        <UIcon name="i-heroicons-arrow-up-left-16-solid" class="text-xl absolute bottom-2.5 right-2.5" />
                    </UButton>
                    <h4 class="font-bold text-lg">
                        فريق {{ team.name }}
                    </h4>
                    <div class="w-32 h-32 rounded-xl overflow-hidden bg-white flex justify-center items-center">
                        <object type="image/png" :data="url + team.team_logo" :aria-label="team.name"
                            class="object-center w-28 flex justify-center items-center">
                            <UIcon name="i-heroicons-users" class="text-[75px] text-amber-500" />
                        </object>
                    </div>
                    <TeamPlayers v-bind:players="team.players" />
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

const url = useRuntimeConfig().public.apiBaseUrl;

const { $api } = useNuxtApp();
const { data, error, pending } = await $api.champions.getChampTeamsByChampId(props.champ.leagueid.toString());
const teams = computed(() => data.value?.teams);
useHead({
    title: `الفرق المشاركة - ${props.champ.name} `,
})
</script>

<style scoped>
.carousel__slide {
    padding: 5px;
}

.carousel__viewport {
    perspective: 2000px;
}

.carousel__track {
    transform-style: preserve-3d;
}

.carousel__slide--sliding {
    transition: 0.5s;
}

.carousel__slide {
    opacity: 0.9;
    transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active~.carousel__slide {
    transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
    opacity: 1;
    transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
    opacity: 1;
    transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
    opacity: 1;
    transform: rotateY(0) scale(1);
}
</style>