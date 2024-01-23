<template>
    <div>
        <UButtonGroup size="sm" orientation="horizontal">
            <UButton icon="i-heroicons-chevron-right-20-solid" color="gray"
                @click=" $emit('goToPage', props.currentPage - 1)" :disabled="currentPage <= 1" />
            <UButton :label="currentPage.toString()" />
            <UButton icon="i-heroicons-chevron-left-20-solid" color="gray"
                @click=" $emit('goToPage', props.currentPage + 1)" :disabled="availablePages <= currentPage" />
        </UButtonGroup>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    totalItemsCount: {
        required: true,
        type: Number as PropType<number>
    },
    pageSize: {
        required: true,
        type: Number as PropType<number>
    },
    currentPage: {
        required: true,
        type: Number as PropType<number>
    }
});
const availablePages = computed(() => Math.ceil(props.totalItemsCount / props.pageSize));
const emit = defineEmits(["goToPage"])

</script>

<style scoped></style>