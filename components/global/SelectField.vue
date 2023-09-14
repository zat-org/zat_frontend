<template>
    <div class="form-control">
        <label :for="name" class="label">{{ props.label }}</label>

        <select @blur="handleBlur"
            :class="['select rtl:bg-select dark:bg-slate-600', { 'select-error': (meta.touched || meta.dirty) && !meta.valid, 'select-success': (meta.touched || meta.dirty) && meta.valid }]"
            v-model="value" :name="props.name" :id="props.name" :dir="props.dir || 'rtl'">
            <option :value="props.placeholder.value" disabled selected>{{ placeholder.displayValue }}</option>
            <option v-for="op in options" :key="op.value" :value="op.value">{{ op.displayValue }}</option>
        </select>

        <label v-show="errorMessage" class="text-xs text-red-500 mt-1"> {{ errorMessage }}</label>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'nuxt/dist/app/compat/capi';
import { SelectOption } from "@/Models/FormTypes"
const props = defineProps({
    name: { type: String, required: true },
    label: { type: String, required: true },
    options: { type: Object as PropType<SelectOption[]>, required: true },
    placeholder: { type: Object as PropType<SelectOption>, required: true },
    rules: { type: Object },
    dir: { type: String },
});
const { value, errorMessage, meta, handleBlur } = useField(props.name, props.rules, { initialValue: props.placeholder.value });
</script>

<style scoped>
.select-error {
    @apply bg-red-50 text-slate-800;
}

.select-success {
    @apply bg-green-50 text-slate-800;
}
</style>