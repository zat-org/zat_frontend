<template>
    <div class="flex items-center justify-center" dir="ltr" aria-label="العد التنازلي للمباراة">
        <div
            v-for="(unit, index) in units"
            :key="unit.label"
            class="flex items-center"
        >
            <div class="flex flex-col items-center gap-0.5 px-2">
                <span class="text-xs font-bold text-text-subtitle">{{ unit.label }}</span>
                <span class="font-numbers text-3xl font-bold leading-[56px] text-text-action tabular-nums">
                    {{ unit.value }}
                </span>
            </div>
            <span
                v-if="index < units.length - 1"
                class="-mb-4 font-numbers text-3xl font-bold leading-[56px] text-text-action"
                aria-hidden="true"
            >
                :
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    days: string | number
    hours: string | number
    minutes: string | number
}>()

function pad(value: string | number) {
    if (value === '--') {
        return value
    }
    return String(value).padStart(2, '0')
}

const units = computed(() => [
    { label: 'يوماً', value: pad(props.days) },
    { label: 'ساعة', value: pad(props.hours) },
    { label: 'دقيقة', value: pad(props.minutes) },
])
</script>
