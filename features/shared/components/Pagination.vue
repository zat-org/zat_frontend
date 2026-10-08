<template>
    <div class="inline-flex items-center overflow-hidden rounded-zat-sm ring ring-default">
        <UButton
            icon="i-heroicons-chevron-right-20-solid"
            color="neutral"
            variant="ghost"
            size="sm"
            class="rounded-none"
            :disabled="currentPage <= 1"
            @click="emit('goToPage', props.currentPage - 1)"
        />
        <UButton
            :label="currentPage.toString()"
            color="neutral"
            variant="ghost"
            size="sm"
            class="rounded-none pointer-events-none"
        />
        <UButton
            icon="i-heroicons-chevron-left-20-solid"
            color="neutral"
            variant="ghost"
            size="sm"
            class="rounded-none"
            :disabled="availablePages <= currentPage"
            @click="emit('goToPage', props.currentPage + 1)"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    totalItemsCount: {
        required: true,
        type: Number as PropType<number>,
    },
    pageSize: {
        required: true,
        type: Number as PropType<number>,
    },
    currentPage: {
        required: true,
        type: Number as PropType<number>,
    },
})

const availablePages = computed(() => Math.ceil(props.totalItemsCount / props.pageSize))
const emit = defineEmits(['goToPage'])
</script>
