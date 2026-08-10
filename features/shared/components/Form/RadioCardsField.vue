<template>
    <URadioGroup :name="name" :ui="uiRadioGroup" :uiRadio="uiRadio" v-model="selected" required :options="options">
        <template #legend>
            <slot name="legend"></slot>
        </template>

        <template #label="{ option }">
            <slot name="card" v-bind="{ option, isSelected: selected === option.value }">{{ option.label }}</slot>
        </template>
    </URadioGroup>
</template>

<script setup lang="ts">
defineProps<{
    options: { value: any, label: any }[],
    name: string
}>();
const selected = defineModel();
const uiRadioGroup = {
    fieldset: 'flex w-full flex-wrap flex-row justify-evenly',
    legend: 'w-full mb-3 text-center text-md'
}
const uiRadio = {
    container: "hidden"
}
</script>

<style scoped></style>