<template>
    <div class="h-full px-2 xl:px-10">
        <SectionHeader title="تقويم زات" icon="i-heroicons-calendar-days" />

        <VCalendar expanded locale="ar-EG" :masks="masks" :first-day-of-week="6" title-position="left" :rows="2"
            :attributes='attrs'>
            <template #header-prev-button>
                <Icon name="iconamoon:arrow-right-2-bold" />

            </template>
            <template #header-next-button>
                <Icon name="iconamoon:arrow-left-2-bold" />
            </template>
            <template #nav-prev-button>
                <Icon name="iconamoon:arrow-right-2-bold" />

            </template>
            <template #nav-next-button>
                <Icon name="iconamoon:arrow-left-2-bold" />
            </template>

        </VCalendar>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 mt-3 ml-3">
            <div v-for="attr in data" class="flex justify-start items-center ">
                <span class="h-5 w-5 inline-block rounded-full mr-3 " :class="attr.color"></span>
                {{ attr.label }}
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
const masks = {
    title: 'M / YYYY',
    navMonths: 'M'
}
const data = [
    {
        key: "break",
        label: "فترة توقف",
        color: "bg-[#475569]"
    },
    {
        key: "kas",
        label: "بطولة الكأس",
        color: "bg-[#ef4444]"
    },
    {
        key: "dawry",
        label: "بطولة الدورى",
        color: "bg-[#0d9488]"
    },
    {
        key: "super",
        label: "بطولة السوبر",
        color: "bg-[#9333ea]"

    },
    {
        key: "hezam",
        label: "بطولة الحزام",
        color: "bg-[#ea580c]"
    }
]
const attrs = [
    {
        key: 'today',
        bar: true,
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
            [new Date(2025, 0, 6), new Date(2025, 1, 28)],
            [new Date(2025, 2, 30), new Date(2025, 4, 3)],
            [new Date(2025, 5, 23), new Date(2025, 6, 1)],
            [new Date(2025, 7, 21), new Date(2025, 8, 2)],
            [new Date(2025, 8, 6), new Date(2025, 8, 30)],
        ],
        popover: {
            label: "فترة توقف",
            visibility: 'hover',
            hideIndicator: true,
        }
    },
    {
        key: "kas",
        highlight: 'red',
        dates: [
            [new Date(2024, 2, 11), new Date(2024, 3, 8)],
            [new Date(2025, 2, 1), new Date(2025, 2, 29)],
        ],
        popover: {
            label: "بطولة الكأس",
            visibility: 'hover',
            hideIndicator: true,
        }
    },
    {
        key: "dawry",
        highlight: 'teal',
        dates: [
            [new Date(2024, 4, 1), new Date(2024, 5, 19)],
            [new Date(2024, 5, 30), new Date(2024, 7, 18)],
            [new Date(2025, 4, 4), new Date(2025, 5, 22)],
            [new Date(2025, 6, 2), new Date(2025, 7, 20)],
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
            [new Date(2025, 8, 3), new Date(2025, 8, 5)],
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
            [new Date(2024, 9, 2), new Date(2025, 0, 5)],
            [new Date(2025, 9, 1), new Date(2025, 11, 31)],
        ],
        popover: {
            label: "بطولة الحزام",
            visibility: 'hover',
            hideIndicator: true,
        }
    },
]
</script>

<style ></style>