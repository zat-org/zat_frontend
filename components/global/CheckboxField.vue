<template>
    <div class="form-control">
        <label class="label cursor-pointer justify-start items-start dark:text-slate-50">
            <input :name="name" v-model="value" type="checkbox" @blur="handleBlur" :class="['checkbox mx-2 dark:border-slate-50', {
                'checkbox-error dark:border-red-400': errorMessage && meta.touched,
                'checkbox-success dark:border-green-400': !errorMessage && meta.touched,

            }]" />
            <span class="text-sm">{{ label }}</span>
        </label>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    name: { type: String, required: true },
    label: { type: String, required: true },
    rules: { type: Object },
});
const { value, errorMessage, meta, handleBlur } = useField(props.name, props.rules, {
    initialValue: false
});

</script>

<style scoped></style>