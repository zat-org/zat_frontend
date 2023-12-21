<template>
    <div class="h-full">
        <div class="flex flex-wrap w-full mb-3 md:mb-6">
            <div class=" w-full ">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 ">
                    تقويم زات
                </h1>
                <div class="h-1 w-20 bg-yellow-500 rounded"></div>
            </div>
        </div>
        <VCalendar expanded locale="ar-EG" :first-day-of-week="6" :is-dark="{ selector: ':root', darkClass: 'dark' }"
            title-position="left" :rows="2" :attributes='attrs' />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const attrs = ref([
    {
        key: 'today',
        highlight: true,
        dates: new Date(),
        popover: {
            label: "اليوم",
            visibility: 'hover',
            hideIndicator: true,
        }
    },
    {
        key: "break",
        highlight: 'gray',
        dates: [
            [new Date(2024, 0, 20), new Date(2024, 2, 10)],
            [new Date(2024, 3, 9), new Date(2024, 3, 30)],
            [new Date(2024, 5, 20), new Date(2024, 5, 29)],
            [new Date(2024, 7, 19), new Date(2024, 7, 31)],
            [new Date(2024, 8, 4), new Date(2024, 9, 1)],
        ],
        popover: {
            label: "فترة توقف",
            visibility: 'hover',
            hideIndicator: true,
        }
    },
    {
        key: "kas",
        highlight: 'teal',
        dates: [
            [new Date(2024, 2, 11), new Date(2024, 3, 8)],
        ],
        popover: {
            label: "بطولة الكأس",
            visibility: 'hover',
            hideIndicator: true,
        }
    },
    {
        key: "dawry",
        highlight: 'green',
        dates: [
            [new Date(2024, 4, 1), new Date(2024, 5, 19)],
            [new Date(2024, 5, 30), new Date(2024, 7, 18)],
        ],
        popover: {
            label: "بطولة الدورى",
            visibility: 'hover',
            hideIndicator: true,
        }
    },
    {
        key: "super",
        highlight: 'purple',
        dates: [
            [new Date(2024, 8, 1), new Date(2024, 8, 3)],
        ],
        popover: {
            label: "بطولة السوبر",
            visibility: 'hover',
            hideIndicator: true,
        }
    },
    {
        key: "hezam",
        highlight: 'orange',
        dates: [
            [new Date(2023, 9, 18), new Date(2024, 0, 19)],
            [new Date(2024, 9, 2), new Date(2024, 11, 31)],
        ], popover: {
            label: "بطولة الحزام",
            visibility: 'hover',
            hideIndicator: true,
        }
    },
]);
</script>

<style >
.vc-header {
    grid-template-columns: [title] auto 1fr [next] auto [prev] auto !important;
}
</style>