<template>
    <div class="form-control">
        <span class="label">{{ props.label }}</span>
        <template v-for="op, index in options" :key="index">
            <label class="flex items-center my-1">
                <VeeField :name="name" type="radio" class="radio mx-2 dark:radio-info" :value="op.value" />
                {{ op.displayValue }}
            </label>
        </template>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'nuxt/dist/app/compat/capi';
import { SelectOption } from "@/Models/FormTypes"
const props = defineProps({
    name: { type: String, required: true },
    label: { type: String, required: true },
    options: { type: Object as PropType<SelectOption[]>, required: true },
    rules: { type: Object },
});

</script>

<style scoped></style>