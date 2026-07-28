<template>
    <img
        v-if="!hasError"
        :src="src"
        :alt="alt"
        :class="imgClass"
        v-bind="nonClassAttrs"
        @error="hasError = true"
    >
    <UIcon
        v-else
        :name="icon"
        :class="fallbackIconClass"
        aria-hidden="true"
    />
</template>

<script setup lang="ts">
defineOptions({
    inheritAttrs: false,
})

const props = defineProps({
    alt: {
        required: true,
        type: String,
    },
    src: {
        required: true,
        type: String,
    },
    icon: {
        required: true,
        type: String,
    },
})

const attrs = useAttrs()
const hasError = ref(false)

const classAttr = computed(() => String(attrs.class ?? ''))

const hasExplicitSize = computed(() =>
    /\b(size-|w-|h-|min-w-|min-h-|max-w-|max-h-)/.test(classAttr.value),
)

const hasObjectFit = computed(() =>
    /\bobject-/.test(classAttr.value),
)

const imgClass = computed(() => [
    'block max-h-full max-w-full',
    !hasExplicitSize.value && 'size-16 md:size-20 lg:size-24',
    !hasObjectFit.value && 'object-contain',
    attrs.class,
])

const nonClassAttrs = computed(() => {
    const { class: _class, ...rest } = attrs
    return rest
})

const fallbackIconClass = computed(() => [
    'text-amber-500',
    hasExplicitSize.value ? 'size-full max-h-full max-w-full p-1' : 'text-[60px]',
    attrs.class,
])
</script>
