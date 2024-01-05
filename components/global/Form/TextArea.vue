<template>
    <UFormGroup class="form-control" :name="name" size="xl" :label="label" :hint="hint">
        <div :dir="dir">
            <UTextarea class="w-full" :rows="5" :value="modelValue" @input="updateModelValue" :placeholder="placeholder" />
        </div>
        <template #error="{ error }">
            <span :class="[error ? 'form-control-error' : '']">
                {{ error ? error : '' }}
            </span>
        </template>
    </UFormGroup>
</template>

<script setup lang="ts">
import type { PropType } from 'nuxt/dist/app/compat/capi';
const props = defineProps({
    name: { type: String, required: true },
    label: { type: String, required: true },
    modelValue: { required: true, type: String as PropType<string> },
    hint: { type: String },
    dir: { type: String as PropType<'rtl' | 'ltr' | undefined> },
    placeholder: { type: String },
});
const emit = defineEmits(['update:modelValue'])
const updateModelValue = (e: Event) => {
    const elm = e.target as HTMLInputElement;
    emit('update:modelValue', elm.value);
}

</script>

<style scoped></style>