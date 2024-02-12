<template>
    <ul v-if="avialaleNavigation"
        :class="`bg-zinc-100 dark:bg-slate-700 flex my-5 px-5  justify-center items-center rounded-xl `">
        <template v-for="link in avialaleNavigation" :key="link.href">
            <li class="flex flex-col items-center relative mx-0.5">
                <NuxtLink :to="link.href" exact-active-class="text-amber-500 -translate-y-5 active"
                    class="h-10 w-10 flex justify-center items-center transition-all relative top-0 rounded-full bg-zinc-100 dark:bg-slate-700 duration-200">
                    <Icon :name="link.icon" class="text-2xl" />
                </NuxtLink>
                <span
                    class="text-[0.7rem] bg-amber-500 text-white px-1 rounded-full  absolute z-[2] pt-[0.05rem] -bottom-2 transition-all opacity-0 duration-100">
                    {{
                        link.name
                    }}
                </span>
            </li>
        </template>
    </ul>
</template>

<style scoped>
a.active~span {
    @apply -translate-y-4 opacity-100
}
</style>

<script setup lang="ts">
import ChampType from "@/Models/ChampType";

import type { IChamp } from "@/Models/IChamp"
const props = defineProps({
    champ: {
        required: true,
        type: Object as PropType<IChamp>
    }
});
const route = useRoute();
const navigation = [
    { name: 'القوانين', icon: "octicon:law-24", href: `/championships/${route.params.id}/laws`, availableAt: [ChampType.CUP, ChampType.LEAGUE, ChampType.SUPER, ChampType.HEZAM] },
    { name: 'الاحصائيات', icon: "wpf:statistics", href: `/championships/${route.params.id}/statistics`, availableAt: [ChampType.CUP, ChampType.LEAGUE, ChampType.SUPER, ChampType.HEZAM], },
    { name: 'المباريات', icon: "game-icons:card-random", href: `/championships/${route.params.id}/matches`, availableAt: [ChampType.CUP, ChampType.LEAGUE, ChampType.SUPER, ChampType.HEZAM], },
    { name: 'الرئيسة', icon: "teenyicons:home-outline", href: `/championships/${route.params.id}/`, availableAt: [ChampType.CUP, ChampType.LEAGUE, ChampType.SUPER, ChampType.HEZAM], },
    { name: 'التحليل', icon: "fluent-emoji-high-contrast:studio-microphone", href: `/championships/${route.params.id}/studios`, availableAt: [ChampType.CUP, ChampType.LEAGUE, ChampType.SUPER, ChampType.HEZAM], },
    { name: 'الجدول', icon: "fa:table", href: `/championships/${route.params.id}/table`, availableAt: [ChampType.LEAGUE, ChampType.HEZAM], },
    { name: 'الفرق', icon: "fluent:people-team-24-filled", href: `/championships/${route.params.id}/teams`, availableAt: [ChampType.CUP, ChampType.LEAGUE, ChampType.SUPER, ChampType.HEZAM], },
]
const champType = computed(() => props.champ.type as ChampType);

const avialaleNavigation = computed(() => {
    return navigation.filter(link => props.champ && props.champ.type ? link.availableAt.includes(champType.value) : true)
})
</script>
