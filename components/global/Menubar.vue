<template>
    <ul v-if="avialaleNavigation"
        :class="`bg-zinc-100 dark:bg-slate-700 flex my-5 px-5  justify-center items-center rounded-xl `">
        <template v-for="link in avialaleNavigation" :key="link.href">
            <li class="flex flex-col items-center relative mx-0.5">
                <NuxtLink :to="link.href" exact-active-class="text-[#ed1c24] -translate-y-5 active"
                    class="h-10 w-10 flex justify-center items-center transition-all relative top-0 rounded-full bg-zinc-100 dark:bg-slate-700 duration-200">
                    <Icon :name="link.icon" class="text-2xl" />
                </NuxtLink>
                <span
                    class="text-[0.7rem] bg-[#ed1c24] text-white px-1 rounded-full  absolute z-[2] py-[0.05rem] -bottom-2 transition-all opacity-0 duration-100">
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
import LeagueType from "@/Models/ChampType";

const props = defineProps(["champ"])
const route = useRoute();
const navigation = [
    { name: 'القوانين', icon: "octicon:law-24", href: `/championships/${route.params.id}/laws`, availableAt: [LeagueType.cup, LeagueType.league, LeagueType.super, LeagueType.hezam] },
    { name: 'الاحصائيات', icon: "wpf:statistics", href: `/championships/${route.params.id}/statistics`, availableAt: [LeagueType.cup, LeagueType.league, LeagueType.super, LeagueType.hezam], },
    { name: 'المباريات', icon: "game-icons:card-random", href: `/championships/${route.params.id}/matches`, availableAt: [LeagueType.cup, LeagueType.league, LeagueType.super, LeagueType.hezam], },
    { name: 'الرئيسة', icon: "teenyicons:home-outline", href: `/championships/${route.params.id}/`, availableAt: [LeagueType.cup, LeagueType.league, LeagueType.super, LeagueType.hezam], },
    { name: 'التحليل', icon: "fluent-emoji-high-contrast:studio-microphone", href: `/championships/${route.params.id}/studios`, availableAt: [LeagueType.cup, LeagueType.league, LeagueType.super, LeagueType.hezam], },
    { name: 'الجدول', icon: "fa:table", href: `/championships/${route.params.id}/table`, availableAt: [LeagueType.league, LeagueType.hezam], },
    { name: 'الفرق', icon: "fluent:people-team-24-filled", href: `/championships/${route.params.id}/teams`, availableAt: [LeagueType.cup, LeagueType.league, LeagueType.super, LeagueType.hezam], },
]
const avialaleNavigation = computed(() => {
    return navigation.filter(link => props.champ && props.champ.type ? link.availableAt.includes(LeagueType[props.champ.type] as unknown as LeagueType) : true)
})
</script>
