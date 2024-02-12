<template>
    <UFormGroup class="form-control" :name="name" size="xl" :label="label" :hint="hint">
        <div :dir="dir">
            <USelectMenu :model-value="modelValue" @update:model-value="updateModelValue" :options="options"
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
defineProps({
    name: { type: String, required: true },
    label: { type: String, required: true },
    modelValue: { required: true, type: [Object, String] as PropType<string | number | unknown[] | Record<string, any> | undefined> },
    options: { required: true, type: Object as PropType<string[] | { [key: string]: any; disabled?: boolean | undefined; }[] | undefined> },
    hint: { type: String },
    dir: { type: String as PropType<'rtl' | 'ltr' | undefined> },
    placeholder: { type: String },
    icon: { type: String },

});
const emit = defineEmits(['update:modelValue'])
const updateModelValue = (e: unknown) => {
    emit('update:modelValue', e);
}

</script>

<style scoped></style>