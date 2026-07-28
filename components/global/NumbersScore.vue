<template>
    <div
        class="flex items-center gap-6 sm:gap-14 font-numbers font-bold tabular-nums text-3xl sm:text-[40px] leading-tight sm:leading-[64px] text-text-action"
    
        :aria-label="ariaLabel"
    >
        <span>{{ left }}</span>
        <span>{{ right }}</span>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    left: string | number
    right: string | number
    ariaLabel?: string
}>(), {
    ariaLabel: 'النتيجة النهائية',
})
</script>
