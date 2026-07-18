<template>
    <UHeader v-model:open="isHeaderOpen" title="زات" to="/" toggle-side="left" mode="slideover">
        <template #title>
            <ClientOnly>
                <img src="/images/zat-logo-white.svg" alt="زات" class="h-auto" width="83" height="48" />
                <template #fallback>
                    <img src="/images/zat-logo-white.svg" alt="زات" class="h-auto" width="83" height="48" />
                </template>
            </ClientOnly>
        </template>

        <template #right>
            <ClientOnly>
                <UButton square variant="solid" color="white" class="theme-toggle-btn"
                    :aria-label="isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'" @click="toggleTheme">
                    <UIcon :name="isDark ? 'zat:sun' : 'zat:moon'" class="size-5 text-black" />
                </UButton>
                <template #fallback>
                    <UButton square variant="solid" color="neutral" disabled aria-hidden="true" />
                </template>
            </ClientOnly>
        </template>

        <UNavigationMenu :items="items" variant="link" color="neutral" content-orientation="horizontal"
            class="nav-menu hidden md:flex grow"
            :ui="{
                viewportWrapper: 'nav-dropdown-viewport-wrapper !bg-white dark:!bg-white',
                viewport: 'nav-dropdown-viewport !bg-white dark:!bg-white',
                content: 'nav-dropdown-viewport-content !bg-white dark:!bg-white',
            }">
            <template #teams-content="{ item }">
                <NavbarDropdownContent :item="item" />
            </template>

            <template #tournaments-content="{ item }">
                <NavbarDropdownContent :item="item" />
            </template>
        </UNavigationMenu>

        <template #body>
            <UNavigationMenu orientation="vertical" :items="items" variant="link" color="neutral" class="-mx-2.5" />

            <div class="mt-6 pt-4 border-t border-surface-tone">
                <NavbarAccountSection @close="isHeaderOpen = false" />
            </div>
        </template>
    </UHeader>
</template>

<script setup lang="ts">
const { items } = useSiteNavItems()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
const isHeaderOpen = ref(false)
</script>
