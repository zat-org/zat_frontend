<template>
    <UCard v-if="champ" :ui="{ base: 'shadow-xl w-full', body: { padding: 'p-0' } }">
        <div class="w-full h-44 flex justify-center items-center dark:bg-white bg-gray-100 rounded-t-lg md:rounded-lg">
            <object type="image/png" :data="url + champ.league_logo" :aria-label="champ.name"
                class="object-center flex justify-center h-40 items-center">
                <UIcon name="i-heroicons-trophy" class="text-[75px] text-amber-500" />
            </object>
        </div>
        <div class="p-5 space-y-5 text-center">
            <h2 class="text-2xl">{{ champ.name }}</h2>
            <p class="text-md "> {{ champ.description }}</p>

            <div class="flex justify-around">
                <div class="p-0 flex items-center">
                    <UIcon name="i-heroicons-calendar-days-solid" class="text-amber-500 text-[35px] me-3" />
                    <div class="text-sm">
                        <p> بداية البطولة</p>
                        <p>{{ new Date(champ.start_at).toLocaleDateString("ar-eg") }}</p>
                    </div>
                </div>
                <div class="p-0 flex items-center">
                    <UIcon name="i-heroicons-calendar-days-solid" class="text-amber-500 text-[35px] me-3" />
                    <div class="text-sm">
                        <p> نهاية البطولة</p>
                        <p>{{ new Date(champ.end_at).toLocaleDateString("ar-eg") }}</p>
                    </div>
                </div>

            </div>

            <div class="stat p-0 flex flex-col justify-center items-center space-y-2">
                <template v-if="champ.state === LeagueState.done">
                    <p class="font-semibold"> الفائز فريق {{ champ.winner_name }}</p>
                    <div class="flex justify-center items-center">
                        <Icon name="fluent-emoji:1st-place-medal" size="30" class="mx-3" />
                        <div class="avatar avatar-contain">
                            <object type="image/png" :data="url + champ.winner_logo" :aria-label="champ.winner_name!"
                                class="object-center w-28 flex justify-center items-center rounded-lg">
                                <UIcon name="i-heroicons-user-group" class="text-[75px] text-amber-500" />
                            </object>
                        </div>
                        <Icon name="fluent-emoji:1st-place-medal" size="30" class="mx-3" />
                    </div>
                </template>
                <template v-else-if="champ.state === LeagueState.upcoming">
                    <Icon name="fluent-emoji:fire" size="50" />
                    <p class="font-semibold">تبدأ قريبا كن متيقظا</p>
                </template>
                <template v-else-if="champ.state === LeagueState.live">
                    <Icon name="fluent-emoji:crossed-swords" class="text-4xl" />
                    <p class="font-semibold">يجري الان وفي انتظار حسم اللقب</p>
                </template>
            </div>

        </div>
    </UCard>
</template>

<script setup lang="ts">
import LeagueState from "@/Models/ChampState";
import type { IChamp } from "@/Models/IChamp"

const url = useRuntimeConfig().public.apiBaseUrl;
const props = defineProps({
    champ: {
        required: true,
        type: Object as PropType<IChamp>
    }
});

useHead({
    title: `${props.champ.name} `,
})

</script>

<style scoped></style>