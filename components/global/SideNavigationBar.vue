<template>
     <div class="mt-3 ms-1.5 font-medium text-sm ">
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
</template>

<script setup lang="ts">
const isSidebarOpen = defineModel()

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
</script>

<style scoped>

</style>