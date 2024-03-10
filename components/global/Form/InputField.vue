<template>
    <UFormGroup :name="name" size="xl" :label="label" :hint="hint">
        <div :dir="dir">
            <UInput class="" :disabled="disabled ?? false" :value="modelValue" @input="updateModelValue" :type="type"
                :placeholder="placeholder" :icon="icon" />
        </div>
        <template #error="{ error }">
            <span :class="[error ? 'form-control-error' : '']">
                {{ error ? error : '' }}
            </span>
        </template>
    </UFormGroup>
</template>

<script setup lang="ts">
const props = defineProps({
    name: { type: String, required: true },
    type: { type: String, required: true },
    label: { type: String, required: true },
    modelValue: { required: true },
    hint: { type: String },
    icon: { type: String },
    dir: { type: String as PropType<'rtl' | 'ltr' | undefined> },
    placeholder: { type: String },
    disabled: { type: Boolean }
});
const emit = defineEmits(['update:modelValue'])
const updateModelValue = (e: Event) => {
    const elm = e.target as HTMLInputElement;
    if (props.type === "number" && !isNumeric(elm.value)) {
        elm.value = "0"
    }
    emit('update:modelValue', elm.value);
}
const isNumeric = (value: string) => {
    return !isNaN(Number(value));
}
</script>

<style scoped></style>