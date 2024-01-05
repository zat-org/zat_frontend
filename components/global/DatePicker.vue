<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from 'v-calendar'

const props = defineProps({
    modelValue: {
        type: Date,
        default: null
    }
})

const emit = defineEmits(['update:model-value', 'close'])

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const date = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:model-value', value)
        emit('close')
    }
})
const masks = {
    title: 'M / YYYY',
    navMonths: 'M',
    input: 'YYYY-MM-DD',
}

</script>

<template>
    
    <VCalendarDatePicker v-model="date" transparent borderless :is-dark="isDark" title-position="left" :masks="masks"
        trim-weeks locale="ar-EG" :first-day-of-week="6">
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
    </VCalendarDatePicker>
</template>