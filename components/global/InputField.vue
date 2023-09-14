<template>
    <div class="form-control">
        <label :for="name" class="label">{{ props.label }}</label>
        <input :type="type" @input="handleChange" @blur="handleBlur"
            :class="['input dark:text-slate-50 dark:bg-slate-600', { 'input-error': (meta.touched || meta.dirty) && !meta.valid, 'input-success': (meta.touched || meta.dirty) && meta.valid }]"
            v-model="value" :name="props.name" :id="props.name" :dir="props.dir || 'rtl'" :placeholder="placeholder || ''">
        <label v-show="errorMessage" class="text-xs text-red-500 mt-1"> {{ errorMessage }}</label>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    name: { type: String, required: true },
    type: { type: String, required: true },
    label: { type: String, required: true },
    rules: { type: Object },
    dir: { type: String },
    placeholder: { type: String },
});
const { value, errorMessage, meta, handleBlur } = useField(props.name, props.rules);
const handleChange = (e: Event) => {
    if (props.type === "number") {
        let el = e.target as HTMLInputElement;
        if (el.value === '') {
            value.value = 0;
        }
    }
}
</script>

<style scoped>
.input-error {
    @apply bg-red-50 text-slate-800;
}

.input-success {
    @apply bg-green-50 text-slate-800;
}
</style>