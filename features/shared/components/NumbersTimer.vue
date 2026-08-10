<template>
    <div
        class="inline-flex items-center font-numbers font-bold tabular-nums text-text-action"
        :class="sizeClasses"
        dir="ltr"
        :aria-label="ariaLabel"
    >
        <span>{{ paddedHours }}</span>
        <span aria-hidden="true">:</span>
        <span>{{ paddedMinutes }}</span>
        <span aria-hidden="true">:</span>
        <span>{{ paddedSeconds }}</span>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    hours: string | number
    minutes: string | number
    seconds: string | number
    size?: 'sm' | 'md' | 'lg'
    ariaLabel?: string
}>(), {
    size: 'sm',
    ariaLabel: 'العد التنازلي',
})

const sizeClasses = computed(() => {
    switch (props.size) {
        case 'lg':
            return 'gap-14 text-[40px] leading-[64px]'
        case 'md':
            return 'gap-1 text-2xl leading-[48px] text-text-body'
        default:
            return 'gap-2 text-xl sm:text-2xl'
    }
})

const paddedHours = computed(() => formatPart(props.hours))
const paddedMinutes = computed(() => formatPart(props.minutes))
const paddedSeconds = computed(() => formatPart(props.seconds))

function formatPart(value: string | number) {
    if (value === '--') {
        return value
    }
    return String(value).padStart(2, '0')
}
</script>
