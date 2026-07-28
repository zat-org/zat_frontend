<template>
    <USlideover v-model:open="isSidebarOpen" side="right" :close="false">
        <template #content>
            <div class="flex flex-col justify-center h-full overflow-y-auto bg-surface-raised text-text-body">
                <div class="flex justify-between items-center px-3 py-2 border-b border-surface-tone">
                    <img
                        width="75"
                        height="75"
                        :src="isDark ? '/images/zat-logo-white.svg' : '/images/zat-logo-black.svg'"
                        alt="zات"
                    />
                    <UButton icon="i-heroicons-x-mark" square variant="ghost" color="neutral" @click="isSidebarOpen = false" />
                </div>
                <div class="grow">
                    <SideNavigationBar v-model="isSidebarOpen" />
                </div>
                <div class="text-center my-5 ps-3">
                    <div class="mb-3" v-if="userStore.isAuthenticated && userStore.user">
                        <div class="flex justify-center items-center ">
                            <UAvatar imgClass="object-contain bg-white p-1" size="2xl" class="me-3" alt="user-image"
                                :src="userStore.user.avatar_url || ''" icon="i-heroicons-user" />
                            <div class="text-sm text-right">
                                <p>يوزر قيدها : <span>{{ userStore.user.username }}@</span></p>
                                <p>جوالك : <span dir="ltr">{{ userStore.user.phone }}</span></p>
                            </div>
                        </div>
                    </div>
                    <UButton v-if="!userStore.isAuthenticated" @click="isLoginFormOpened = true">
                        <img src="/images/qydha_logo.png" class="w-12 -mt-2 " />
                        <span class="flex items-center">عندك قيدها؟! سجل دخول بيوزرك
                            <UIcon class="text-lg ms-1 animate-pulse"
                                name="i-heroicons-cursor-arrow-ripple-16-solid" />
                        </span>
                    </UButton>
                    <UButton v-else @click="userStore.logoutUser()"
                        trailing-icon="i-heroicons-arrow-left-start-on-rectangle-20-solid">
                        تسجيل خروج
                    </UButton>
                    <LoginForm v-model="isLoginFormOpened" />
                </div>
                <USeparator />
                <SocialMediaIcons />
            </div>
        </template>
    </USlideover>
</template>

<script setup lang="ts">

import { useUserStore } from '~/stores/useUserStore';
const userStore = useUserStore()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const isSidebarOpen = defineModel<boolean>('open', { default: false })
const isLoginFormOpened = ref(false);

</script>

<style scoped>

</style>
