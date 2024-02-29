<template>
    <object type="image/png" :data="src" :aria-label="alt"
        class="size-16 md:size-20 lg:size-24 flex justify-center items-center rounded-lg">
        <UIcon :name="icon" class="text-[60px] text-amber-500" />
    </object>
</template>

<script setup lang="ts">
defineProps({
    alt: {
        required: true, type: String
    },
    src: {
        required: true, type: String
    },

    icon: {
        required: true, type: String
    }
})
</script>

<style scoped></style>