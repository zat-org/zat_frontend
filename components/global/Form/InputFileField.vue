<template>
    <UFormGroup class="form-control" :name="name" size="xl" :label="label" :hint="hint">

        <div :dir="dir" class="flex ">
            <input type="file" hidden ref="fileInput" @change="handleFileSelection" @keypress="">

            <UInput class="w-full" type="text" readonly ref="textInput" :value="filename" :placeholder="placeholder"
                :icon="icon" :ui="{ icon: { trailing: { pointer: '' } } }" @click.prevent="handleClickOfTextInputField"
                @keypress.prevent="handleClickOfTextInputField">
            </UInput>
            <UButton v-show="modelValue" variant="outline" class="ms-2" @click="handleCancelSelection">
                <UIcon name="i-heroicons-x-mark-16-solid" class="text-xl" />
            </UButton>

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

const fileInput = ref<null | HTMLInputElement>(null)
const textInput = ref<null | any>(null)
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    name: { type: String, required: true },
    label: { type: String, required: true },
    modelValue: { required: true, type: [Object, null] as PropType<File | null> },
    hint: { type: String },
    icon: { type: String },
    dir: { type: Object as PropType<"rtl" | "ltr"> },
    placeholder: { type: String },
});

const filename = computed(() => {
    if (!props.modelValue) return "";
    return props.modelValue.name
})


const handleClickOfTextInputField = (): void => {
    if (!fileInput.value) return;
    fileInput.value.click();
}

const handleFileSelection = (e: Event): void => {
    const elm = e.target as HTMLInputElement;
    if (elm.files && elm.files.length >= 1) {
        let selectedFile = elm.files[0];
        emit('update:modelValue', selectedFile);
    }
    textInput.value?.input.blur();
}
const handleCancelSelection = () => {
    if (props.modelValue) {
        emit('update:modelValue', null);
    }
    textInput.value?.input.focus();

    textInput.value?.input.blur();
}
</script>

<style scoped></style>