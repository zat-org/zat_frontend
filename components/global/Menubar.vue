<template>
    <ul class="bg-zinc-100 grid grid-cols-7 my-5 px-5 gap-2 place-items-center rounded-xl">
        <template v-for="link in navigation" :key="link.href">
            <li class="flex flex-col items-center relative">
                <NuxtLink :to="link.href" exact-active-class="text-amber-400 -translate-y-5 active"
                    class="h-10 w-10 flex justify-center items-center transition-all relative top-0 rounded-full bg-zinc-100 duration-200">
                    <Icon :name="link.icon" class="text-2xl" />
                </NuxtLink>
                <span
                    class="text-[0.7rem] bg-amber-400 text-white px-1 rounded-full  absolute z-[2] py-[0.05rem] -bottom-2 transition-all opacity-0 duration-100">
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
const route = useRoute();
const navigation = [
    { name: 'القوانين', icon: "octicon:law-24", href: `/championships/${route.params.id}/laws` },
    { name: 'الاحصائيات', icon: "wpf:statistics", href: `/championships/${route.params.id}/statistics` },
    { name: 'المباريات', icon: "game-icons:card-random", href: `/championships/${route.params.id}/matches` },
    { name: 'الرئيسة', icon: "teenyicons:home-outline", href: `/championships/${route.params.id}/` },
    { name: 'التحليل', icon: "fluent-emoji-high-contrast:studio-microphone", href: `/championships/${route.params.id}/studios` },
    { name: 'الجدول', icon: "fa:table", href: `/championships/${route.params.id}/table` },
    { name: 'الفرق', icon: "fluent:people-team-24-filled", href: `/championships/${route.params.id}/teams` },
]
</script>
