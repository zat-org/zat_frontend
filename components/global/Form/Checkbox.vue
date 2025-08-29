<template>
    <UFormGroup class="" size="xl" :name="name">
        <div :dir="dir">
            <UCheckbox :label="label" :checked="modelValue" @change="updateModelValue" />
        </div>
        <template #error="{ error }">
            <span :class="[error ? 'form-control-error rtl:pl-8 ltr:pr-8' : '']">
                {{ error ? error : '' }}
            </span>
        </template>
    </UFormGroup>
</template>

<script setup lang="ts">
const props = defineProps({
    name: { type: String, required: true },
    label: { type: String, required: true },
    modelValue: { required: true, type: Boolean as PropType<boolean | undefined> },
    dir: { type: String as PropType<'rtl' | 'ltr' | undefined> },
});
const emit = defineEmits(['update:modelValue'])
const updateModelValue = (e: Event) => {
    const value = (e.target as HTMLInputElement).checked;

    emit('update:modelValue', value);
}

</script>

<style scoped></style>