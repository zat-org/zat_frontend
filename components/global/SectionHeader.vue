<template>
    <div class=" flex justify-between items-center">
        <div class="w-fit mb-5">
            <div class="mb-2 flex items-center">
                <UIcon :name="icon" class="text-[45px] me-2 text-primary-600 dark:text-primary-400" />
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-medium">{{ title }}</h1>
            </div>
            <span class="h-1 w-full bg-primary-600 dark:bg-primary-400 rounded block"></span>
        </div>
        <slot name="default"></slot>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: { required: true, type: String },
    icon: { required: true, type: String },
})
</script>

<style scoped></style>