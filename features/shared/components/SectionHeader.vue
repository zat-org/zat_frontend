<template>
    <div class="flex justify-between items-center mb-8">
        <slot />
        <div class="w-fit">
            <div class="mb-2 flex items-center justify-end gap-3">
                <h2 class="font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight" :class="light ? 'text-text-on-action' : 'text-text-heading'">
                    {{ title }}
                </h2>
                <UIcon v-if="icon" :name="icon" class="text-3xl sm:text-4xl text-zat-500 shrink-0" />
            </div>
            <span class="h-1 w-full bg-zat-500 rounded block"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: { required: true, type: String },
    icon: { required: false, type: String, default: '' },
    light: { type: Boolean, default: false },
})
</script>
