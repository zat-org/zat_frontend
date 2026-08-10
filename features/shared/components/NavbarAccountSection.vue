<template>
    <div class="text-center">
        <div v-if="userStore.isAuthenticated && userStore.user" class="mb-4">
            <div class="flex justify-center items-center gap-3">
                <UAvatar
                    img-class="object-contain bg-white p-1"
                    size="2xl"
                    alt="user-image"
                    :src="userStore.user.avatar_url || ''"
                    icon="i-heroicons-user"
                />
                <div class="text-sm text-right">
                    <p>يوزر قيدها: <span>{{ userStore.user.username }}@</span></p>
                    <p>جوالك: <span dir="ltr">{{ userStore.user.phone }}</span></p>
                </div>
            </div>
        </div>

        <UButton
            v-if="!userStore.isAuthenticated"
            to="/qydha"
            block
            @click="emit('close')"
        >
            <img src="/images/qydha_logo.png" class="w-12 -mt-2" alt="" />
            <span class="flex items-center">
                عندك قيدها؟! سجل دخول بيوزرك
                <UIcon class="text-lg ms-1 animate-pulse" name="i-heroicons-cursor-arrow-ripple-16-solid" />
            </span>
        </UButton>

        <UButton
            v-else
            type="button"
            block
            variant="outline"
            color="neutral"
            trailing-icon="i-heroicons-arrow-left-start-on-rectangle-20-solid"
            @click="logout"
        >
            تسجيل خروج
        </UButton>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/useUserStore'

const emit = defineEmits<{
    close: []
}>()
const userStore = useUserStore()

function logout() {
    userStore.logoutUser()
    emit('close')
}
</script>
