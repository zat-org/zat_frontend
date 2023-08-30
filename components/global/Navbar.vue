<template>
    <div dir="rtl" class="navbar bg-base-100 shadow rounded-lg">
        <div class="navbar-start">
            <details class="dropdown dark:shadow-white z-50 " :open="IsOpened">
                <summary class="btn btn-ghost btn-circle" @click.prevent="toggleNav">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" transform="scale(-1,1)" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </summary>
                <ul class="menu menu-md dropdown-content mt-3 z-[1] p-2 pb-1 shadow bg-base-100 rounded-box w-52">
                    <template v-for="item in navigation" :key="item.name">
                        <NuxtLink v-if="item.links.length === 0" :to="item.href" @click.prevent="handleRoute(item.href)"
                            class=" text-gray-700 hover:bg-gray-700 mb-1 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                            exactActiveClass="bg-gray-200 text-gray-700" ariaCurrentValue="page">{{ item.name }}
                        </NuxtLink>
                        <div v-else>
                            <details tabindex="0" class="collapse rounded-md">
                                <summary class="">
                                    <NuxtLink
                                        class="text-gray-700 hover:bg-gray-700 mb-1 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center justify-between "
                                        exactActiveClass="bg-gray-200 text-gray-700" ariaCurrentValue="page"
                                        style="user-select: none;">
                                        <span>
                                            {{ item.name }}
                                        </span>
                                        <span>
                                            <Icon name="ep:arrow-down" />
                                        </span>
                                    </NuxtLink>
                                </summary>
                                <ul class="collapse-content ">
                                    <NuxtLink v-for="item2 in item.links" :to="item2.href"
                                        @click.prevent="handleRoute(item2.href)"
                                        class="block text-gray-700 hover:bg-gray-700 mb-1 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
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
                <div class="font-family-aref h-8 w-16 -mt-4  font-bold text-4xl flex   justify-center items-center">
                    <span class=" text-black relative">سام
                        <span class=" text-[#f7b032] absolute top-[0rem] left-[0.07rem]">سام</span>
                    </span>
                </div>
            </NuxtLink>
        </div>
        <div class="navbar-end">

        </div>
    </div>
</template>
  
<script setup>
const router = useRouter()
const navigation = [
    { name: 'الرئيسية', href: '/', links: [] },

    {
        name: 'البطولات', href: '/championships', links: [
            { name: "دوري", href: "/championships?type=league" },
            { name: "كأس", href: "/championships?type=cup" },
            { name: "سوبر", href: "/championships?type=super" }
        ]
    },
    { name: 'الاخبار', href: '/blogs', links: [] },

    { name: 'الفرق', href: '/teams', links: [] },
    { name: 'الحكام', href: '/referees', links: [] },



    { name: 'من نحن', href: '/about-us', links: [] },
    { name: 'اتصل بنا', href: '/contact-us', links: [] },
]
const IsOpened = ref(false)
const IsDark = ref(false)

const handleRoute = (path) => {
    router.push(path);
    toggleNav()
}

const toggleNav = () => {
    IsOpened.value = !IsOpened.value
}


</script>
<style scoped>
.font-family-aref {
    font-family: 'Aref Ruqaa', serif;
}
</style>