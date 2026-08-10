<template>
    <component
        :is="rootComponent"
        v-bind="rootAttrs"
        class="relative inline-flex items-center justify-center transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        :class="sizeClasses.base"
        :aria-label="ariaLabel || label"
        :disabled="isNativeButton ? disabled : undefined"
        :aria-disabled="disabled || undefined"
    >
        <span
            class="pointer-events-none absolute inset-0 size-full [&>svg]:size-full"
            :class="resolvedColorClass"
            aria-hidden="true"
            v-html="btnBg"
        />
        <span
            class="relative z-10 px-0.5 text-center font-bold text-white"
            :class="[sizeClasses.label, labelClass]"
        >
            {{ label }}
        </span>
        <UIcon
            v-if="icon"
            :name="icon"
            class="relative z-10 shrink-0 text-white"
            :class="[sizeClasses.icon, labelClass]"
        />
    </component>
</template>

<script setup lang="ts">
import btnBg from '~/assets/images/shared/app-button-bg.svg?raw'

type AppButtonSize = 'sm' | 'md' | 'lg'
type AppButtonVariant = 'primary' | 'secondary'

const props = withDefaults(defineProps<{
    label: string
    href?: string
    to?: string
    icon?: string
    ariaLabel?: string
    target?: string
    rel?: string
    size?: AppButtonSize
    variant?: AppButtonVariant
    colorClass?: string
    labelClass?: string
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
}>(), {
    href: undefined,
    to: undefined,
    icon: undefined,
    ariaLabel: undefined,
    target: '_blank',
    rel: 'noopener noreferrer',
    size: 'sm',
    variant: 'secondary',
    colorClass: undefined,
    labelClass: 'text-white',
    disabled: false,
    type: 'button',
})

const NuxtLink = resolveComponent('NuxtLink')

const sizeMap: Record<AppButtonSize, { base: string, label: string, icon: string }> = {
    sm: {
        base: 'h-10 gap-2 px-2',
        label: 'text-xs leading-6',
        icon: 'size-4',
    },
    md: {
        base: 'h-12 gap-2 px-3',
        label: 'text-sm leading-7',
        icon: 'size-5',
    },
    lg: {
        base: 'h-14 gap-2 px-4',
        label: 'text-xl leading-9',
        icon: 'size-5',
    },
}

const variantColorClass: Record<AppButtonVariant, string> = {
    primary: 'text-zat-500',
    secondary: 'text-surface-secondary',
}

const sizeClasses = computed(() => sizeMap[props.size])
const resolvedColorClass = computed(() => props.colorClass || variantColorClass[props.variant])
const isNativeButton = computed(() => !props.href && !props.to)

const rootComponent = computed(() => {
    if (props.disabled && (props.href || props.to))
        return 'span'
    if (props.href)
        return 'a'
    if (props.to)
        return NuxtLink
    return 'button'
})

const rootAttrs = computed(() => {
    if (props.disabled && (props.href || props.to))
        return { role: 'link', 'aria-disabled': true }

    if (props.href) {
        return {
            href: props.href,
            target: props.target,
            rel: props.rel,
        }
    }

    if (props.to) {
        return { to: props.to }
    }

    return { type: props.type }
})
</script>
