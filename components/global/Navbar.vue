<template>
    <div
        class="navbar  border-b border-b-slate-800 dark:border-b-slate-100 bg-white  dark:bg-slate-800 dark:text-slate-50  ">
        <div class="navbar-start">
            <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
                <UButton color="gray" variant="ghost"
                    class="rounded-full  w-12 h-12 flex justify-center items-center hover:dark:bg-slate-300 hover:dark:text-slate-800 hover:bg-slate-700 hover:text-slate-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" transform="scale(-1,1)" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </UButton>
                <template #item="{ item }">
                    <span class="truncate">{{ item.label }}</span>
                    <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                </template>
            </UDropdown>
        </div>

        <div class="navbar-center">
            <NuxtLink to="/">
                <img width="75" height="75"
                    :src="useColorMode().preference === 'dark' ? '/images/zat-logo-white.svg' : '/images/zat-logo-black.svg'"
                    alt="zat logo" />
            </NuxtLink>
        </div>


        <div class="navbar-end">
            <ClientOnly>
                <UButton
                    class="swap swap-rotate hover:dark:bg-slate-300 hover:dark:text-slate-800 hover:bg-slate-700 hover:text-slate-100 rounded-full w-12 h-12 "
                    :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="gray" variant="ghost"
                    aria-label="Theme" @click="isDark = !isDark" />

                <template #fallback>
                    <div class="w-8 h-8" />
                </template>
            </ClientOnly>
        </div>
    </div>
</template>
  
<script setup lang="ts">
const items = [
    [{
        label: 'الرئيسية',
        icon: 'i-heroicons-home',
        shortcuts: ['H'],
        to: "/"
    }],
    [{
        label: 'بطولات الدوري',
        icon: 'i-heroicons-table-cells',
        to: '/championships?type=league'
    },
    {
        label: 'بطولات الكأس',
        icon: 'i-heroicons-trophy',
        to: '/championships?type=cup'
    }, {
        label: 'بطولات السوبر',
        icon: 'i-heroicons-trophy-20-solid',
        to: '/championships?type=super'
    }, {
        label: 'بطولات الحزام',
        icon: 'i-heroicons-banknotes-20-solid',
        to: '/championships?type=hezam'
    },
    {
        label: 'بطولات المتابعين',
        icon: 'i-heroicons-users',
        to: '/join-us'
    }
    ],
    [{
        label: 'الاخبار',
        icon: 'i-heroicons-megaphone-solid',
        to: '/blogs'
    },
    {
        label: 'الفرق',
        icon: 'i-heroicons-user-group',
        to: '/teams'
    },
    {
        label: 'الحكام',
        icon: 'i-heroicons-scale',
        to: '/referees'
    }],
    [{
        label: 'من نحن',
        icon: 'i-heroicons-building-library',
        to: '/about-us'
    },
    {
        label: 'اتصل بنا',
        icon: 'i-heroicons-chat-bubble-oval-left-ellipsis-solid',
        to: '/contact-us'
    },
    {
        label: 'وظائف زات',
        icon: 'i-heroicons-briefcase',
        to: '/jobs'
    },]
]

const colorMode = useColorMode()

const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})


</script>
<style scoped></style>