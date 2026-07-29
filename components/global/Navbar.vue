<template>
    <UHeader
        v-model:open="isHeaderOpen"
        title="زات"
        to="/"
        toggle-side="left"
        mode="slideover"
        :menu="mobileMenuProps"
    >
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

        <template #content="{ close }">
            <NavbarMobileMenu
                @close="closeSidebar(close)"
                @open-login="openLoginForm"
            />
        </template>
    </UHeader>

    <LoginForm v-model="isLoginFormOpened" />
</template>

<script setup lang="ts">
const { items } = useSiteNavItems()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
const isHeaderOpen = ref(false)
const isLoginFormOpened = ref(false)

const mobileMenuProps = {
    side: 'right' as const,
    ui: {
        content: 'max-w-[343px] w-[min(343px,100vw)] bg-surface-off-base p-0 shadow-zat ring-0',
        header: 'hidden',
        body: 'p-0',
    },
}

function closeSidebar(close?: () => void) {
    close?.()
    isHeaderOpen.value = false
}

function openLoginForm() {
    isLoginFormOpened.value = true
}
</script>
