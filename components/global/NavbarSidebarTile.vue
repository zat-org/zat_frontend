<template>
    <NuxtLink
        v-if="to"
        :to="to"
        :target="target"
        class="nav-sidebar-tile group"
        @click="emit('click')"
    >
        <NavbarSidebarTileInner
            :label="label"
            :icon="icon"
            :leading-icon="leadingIcon"
            :leading-icon-class="leadingIconClass"
        />
    </NuxtLink>

    <a
        v-else-if="href"
        :href="href"
        :target="target"
        class="nav-sidebar-tile group"
        rel="noopener noreferrer"
        @click="emit('click')"
    >
        <NavbarSidebarTileInner
            :label="label"
            :icon="icon"
            :leading-icon="leadingIcon"
            :leading-icon-class="leadingIconClass"
        />
    </a>

    <button
        v-else
        type="button"
        class="nav-sidebar-tile group"
        @click="emit('click')"
    >
        <NavbarSidebarTileInner
            :label="label"
            :icon="icon"
            :leading-icon="leadingIcon"
            :leading-icon-class="leadingIconClass"
        />
    </button>
</template>

<script setup lang="ts">
defineProps<{
    label: string
    to?: string
    href?: string
    target?: string
    icon?: string
    leadingIcon?: string
    leadingIconClass?: string
}>()

const emit = defineEmits<{ click: [] }>()
</script>
