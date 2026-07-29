<template>
    <span aria-hidden="true" class="nav-sidebar-tile-blur" />

    <span v-if="leadingIcon" class="nav-sidebar-tile-leading shrink-0">
        <UIcon
            :name="leadingIcon"
            class="size-6 text-text-caption transition-transform duration-200"
            :class="leadingIconClass"
        />
    </span>

    <span class="nav-sidebar-tile-label min-w-0 flex-1 text-right">
        {{ label }}
    </span>

    <span v-if="icon" class="nav-sidebar-tile-icon shrink-0">
        <UIcon :name="icon" class="size-6 text-text-body" />
    </span>
</template>

<script setup lang="ts">
defineProps<{
    label: string
    icon?: string
    leadingIcon?: string
    leadingIconClass?: string
}>()
</script>
