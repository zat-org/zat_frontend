<template>
    <div
        class="navbar bg-base-100 border-b border-b-slate-800 dark:border-b-slate-100   dark:bg-slate-800 dark:text-slate-50  ">
        <div class="navbar-start">
            <details class="dropdown dropdown-hover	 z-50 " :open="IsOpened">
                <summary class="btn btn-ghost btn-circle hover:dark:bg-slate-300 hover:dark:text-slate-800"
                    @click.prevent="toggleNav">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" transform="scale(-1,1)" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </summary>
                    <ul class="menu menu-md dropdown-content mt-3 z-[1] p-2 pb-1 shadow rounded-box w-52
                      dark:text-slate-50 dark:bg-slate-700 bg-slate-200 shadow-slate-500">
                        <template v-for="item in navigation" :key="item.name">
                            <NuxtLink v-if="item.links.length === 0" :to="item.href" @click.prevent="handleRoute(item.href)"
                                class=" text-gray-700 hover:bg-gray-600 mb-1 dark:text-slate-50 hover:text-white rounded-md px-3 py-2 text-sm font-medium "
                                exactActiveClass="bg-gray-200 text-gray-700 dark:text-slate-700 dark:hover:text-slate-50"
                                ariaCurrentValue="page">{{
                                    item.name }}
                            </NuxtLink>
                            <div v-else>
                                <details tabindex="0" class="collapse rounded-md">
                                    <summary>
                                        <p class="text-gray-700 dark:text-slate-50 hover:bg-gray-600 mb-1 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center justify-between "
                                            ariaCurrentValue="page" style="user-select: none;">
                                            <span>
                                                {{ item.name }}
                                            </span>
                                            <span>
                                                <Icon name="ep:arrow-down" />
                                            </span>
                                        </p>
                                    </summary>
                                    <ul class="collapse-content ">
                                        <NuxtLink v-for="item2 in item.links" :to="item2.href"
                                            @click.prevent="handleRoute(item2.href)"
                                            class="block text-gray-700 hover:bg-gray-600 mb-1 dark:text-slate-50 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                            ariaCurrentValue="page">{{ item2.name }}
                                        </NuxtLink>
                                    </ul>
                                </details>
                            </div>
                        </template>
                    </ul>

            </details>
        </div>
        <div class="navbar-center">
            <NuxtLink to="/">
                <img width="75" height="75"
                    :src="useColorMode().preference === 'dark' ? '/images/zat-logo-white.svg' : '/images/zat-logo-black.svg'"
                    alt="zat logo" />
            </NuxtLink>
        </div>
        <div class="navbar-end">
            <label for="toggleColorMode"
                class="swap swap-rotate hover:dark:bg-slate-300 hover:dark:text-slate-800 hover:bg-slate-700 hover:text-slate-100 rounded-full w-10 h-10">

                <!-- this hidden checkbox controls the state -->
                <input type="checkbox" :value="useColorMode().preference === 'dark'" @change.prevent="handleToggleColorMode"
                    id="toggleColorMode" />

                <!-- sun icon -->
                <svg class="swap-on fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                <!-- moon icon -->
                <svg class="swap-off fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>

            </label>
        </div>
    </div>
</template>
  
<script setup lang="ts">
const router = useRouter()
const navigation = [
    { name: 'الرئيسية', href: '/', links: [] },

    {
        name: 'البطولات', href: '/championships', links: [
            { name: "دوري", href: "/championships?type=league" },
            { name: "كأس", href: "/championships?type=cup" },
            { name: "سوبر", href: "/championships?type=super" },
            { name: "حزام", href: "/championships?type=hezam" }
        ]
    },
    { name: 'الاخبار', href: '/blogs', links: [] },

    { name: 'الفرق', href: '/teams', links: [] },
    { name: 'الحكام', href: '/referees', links: [] },



    { name: 'من نحن', href: '/about-us', links: [] },

    { name: 'اتصل بنا', href: '/contact-us', links: [] },
    { name: 'البطولات المتاحة', href: '/join-us', links: [] },

]
const IsOpened = ref(false)


const handleRoute = (path: string) => {
    router.push(path);
    toggleNav()
}

const toggleNav = () => {
    IsOpened.value = !IsOpened.value
}

const handleToggleColorMode = () => {
    useColorMode().preference = useColorMode().preference === 'dark' ? 'light' : 'dark';
}



</script>
<style scoped>
.font-family-aref {
    font-family: 'Aref Ruqaa', serif;
}
</style>