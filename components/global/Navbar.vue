<template>
    <div class="h-20 flex justify-between items-center border-b ">
        <div class="ms-3 w-1/3 ">
            <UButton class="rounded-full transition-transform duration-500 ease-out hover:scale-105 active:scale-95"
                icon="i-heroicons-ellipsis-horizontal-16-solid" size="lg" square variant="outline"
                @click="isSidebarOpen = true" />
        </div>

        <div>
            <ClientOnly>
                <NuxtLink to="/">
                    <img width="75" height="75"
                        :src="colorMode.preference === 'dark' ? '/images/zat-logo-white.svg' : '/images/zat-logo-black.svg'"
                        alt="zat logo" />
                </NuxtLink>
            </ClientOnly>
        </div>
        <div class="me-3 w-1/3 text-left">
            <ClientOnly>
                <UButton class="rounded-full transition-transform duration-1000 ease-out active:rotate-180"
                    :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" size="lg" square
                    variant="outline" @click="isDark = !isDark" aria-label="Theme" />
            </ClientOnly>
        </div>

        <USlideover v-model="isSidebarOpen" :side="'left'">
            <div class="flex flex-col justify-center h-full">
                <div class="flex justify-between items-center px-3 border-b">
                    <img width="75" height="75"
                        :src="useColorMode().preference === 'dark' ? '/images/zat-logo-white.svg' : '/images/zat-logo-black.svg'"
                        alt="zat logo" />
                    <UButton icon="i-heroicons-x-mark" square variant="solid" @click="isSidebarOpen = false" />
                </div>
                <div class="grow">
                    <div class="mt-3 ms-1.5 font-medium	text-sm ">
                        <div v-for="itemGroup in items" class="mb-2">
                            <ULink v-for="link in itemGroup" :exact-query="true" :to="link.to"
                                @click="isSidebarOpen = false" class="ps-3 py-1 flex items-center border-r "
                                active-class="text-primary border-amber-500"
                                inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200  hover:dark:border-gray-300 hover:border-gray-600 dark:border-gray-600 border-gray-200">
                                <UIcon :name="link.icon" class="me-2 text-[17px]" />
                                <span>{{ link.label }}</span>
                            </ULink>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center my-3">
                    <UButton v-for="sma in socialMediaAccounts" target="_blank" :to="sma.href" :key="sma.href"
                        class="rounded-full transition-transform duration-500 ease-out hover:-translate-y-2 mx-1" size="lg"
                        square variant="outline">
                        <template #trailing>
                            <Icon :name="sma.iconName" width="22" height="22" />
                        </template>
                    </UButton>
                </div>
            </div>
        </USlideover>
    </div>
</template>
  
<script setup lang="ts">
const isSidebarOpen = ref(false);

const items = [
    [{
        label: 'الرئيسية',
        icon: 'i-heroicons-home',
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
    },
    {
        label: 'بطولات السوبر',
        icon: 'i-heroicons-trophy-20-solid',
        to: '/championships?type=super'
    },
    {
        label: 'بطولات الحزام',
        icon: 'i-heroicons-banknotes-20-solid',
        to: '/championships?type=hezam'
    },
    {
        label: 'بطولات المتابعين',
        icon: 'i-heroicons-users',
        to: '/join-us'
    }]
    ,
    [{
        label: 'الاخبار',
        icon: 'i-heroicons-megaphone-solid',
        to: '/blogs?pageNum=1'
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
        to: '/jobs?pageNum=1'
    }]
]
let socialMediaAccounts = [
    { iconName: "simple-icons:snapchat", href: "https://www.snapchat.com/add/zat_baloot" },
    { iconName: "mingcute:youtube-fill", href: "https://youtube.com/@zat_baloot?si=vPFZgZSdWQXns47V" },
    { iconName: "ri:twitter-x-fill", href: "https://x.com/zat_baloot" },
    { iconName: "fa-brands:twitch", href: "https://twitch.tv/zat_baloot" },
    { iconName: "lets-icons:insta", href: "https://www.instagram.com/zat_baloot?igsh=OGQ5ZDc2ODk2ZA==" },
];
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