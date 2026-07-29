<template>
    <div class="nav-mobile-menu flex h-full min-h-0 flex-col bg-surface-off-base shadow-zat">
        <header class="nav-mobile-menu-header flex shrink-0 items-center justify-between px-4 pt-6 pb-4">
            <h2 class="text-xl font-bold leading-8 text-text-body">
                القائمة
            </h2>
            <button
                type="button"
                class="nav-mobile-menu-close flex size-6 items-center justify-center text-text-body transition-opacity hover:opacity-70"
                aria-label="إغلاق القائمة"
                @click="emit('close')"
            >
                <UIcon name="i-heroicons-x-mark-20-solid" class="size-6" />
            </button>
        </header>

        <div class="nav-mobile-menu-scroll flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 pb-6">
            <section class="nav-sidebar-partition">
                <h3 class="nav-sidebar-partition-title">
                    البطولات
                </h3>

                <div class="flex w-full max-w-[311px] flex-col">
                    <div
                        class="flex w-full flex-col overflow-hidden"
                        :class="tournamentsOpen ? 'rounded-2xl bg-white shadow-zat-sm' : ''"
                    >
                        <NavbarSidebarTile
                            label="قائمة البطولات"
                            icon="zat:cup"
                            leading-icon="zat:arrow-down"
                            :leading-icon-class="tournamentsOpen ? 'rotate-180' : ''"
                            class="nav-sidebar-dropdown-trigger"
                            @click="tournamentsOpen = !tournamentsOpen"
                        />

                        <div v-show="tournamentsOpen" class="nav-sidebar-dropdown-panel">
                            <NavbarSidebarTile
                                v-for="link in tournamentLinks"
                                :key="link.to"
                                :label="link.label"
                                :to="link.to"
                                :icon="link.icon"
                                @click="emit('close')"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <NavbarSidebarTile
                v-for="link in primaryLinks"
                :key="link.label"
                :label="link.label"
                :to="link.to"
                :href="link.href"
                :target="link.target"
                :icon="link.icon"
                class="max-w-[311px] self-center"
                @click="emit('close')"
            />

            <section class="nav-sidebar-partition">
                <h3 class="nav-sidebar-partition-title">
                    تطبيق قيدها
                </h3>

                <div class="flex w-full max-w-[311px] flex-col gap-2">
                    <div
                        v-if="userStore.isAuthenticated && userStore.user"
                        class="mb-1 flex items-center justify-end gap-3 px-1"
                    >
                        <UAvatar
                            img-class="object-contain bg-white p-1"
                            size="lg"
                            alt="user-image"
                            :src="userStore.user.avatar_url || ''"
                            icon="i-heroicons-user"
                        />
                        <div class="text-right text-sm text-text-body">
                            <p class="font-bold">{{ userStore.user.username }}@</p>
                            <p dir="ltr" class="text-text-subtitle">{{ userStore.user.phone }}</p>
                        </div>
                    </div>

                    <NavbarSidebarTile
                        v-if="!userStore.isAuthenticated"
                        label="سجل مع قيدها الان"
                        icon="zat:profile"
                        leading-icon="i-heroicons-arrow-left-20-solid"
                        @click="openLogin"
                    />

                    <NavbarSidebarTile
                        v-else
                        label="تسجيل خروج"
                        icon="zat:profile"
                        leading-icon="i-heroicons-arrow-left-20-solid"
                        @click="logout"
                    />

                    <NavbarSidebarTile
                        label="تحميل التطبيق"
                        :href="GOOGLE_PLAY_URL"
                        target="_blank"
                        icon="zat:bag"
                        leading-icon="i-heroicons-arrow-left-20-solid"
                        @click="emit('close')"
                    />
                </div>
            </section>

            <footer class="nav-mobile-menu-footer mt-auto flex flex-col items-end gap-2 pt-4">
                <img
                    src="/images/zat-logo-black.svg"
                    alt="زات"
                    width="62"
                    height="36"
                    class="h-9 w-auto"
                />
                <div class="flex flex-row-reverse items-center gap-4">
                    <NuxtLink
                        v-for="social in socialLinks"
                        :key="social.href"
                        :to="social.href"
                        target="_blank"
                        external
                        class="nav-mobile-menu-social"
                        :aria-label="social.label"
                        @click="emit('close')"
                    >
                        <UIcon :name="social.icon" class="size-4" />
                    </NuxtLink>
                </div>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/useUserStore'

const emit = defineEmits<{ close: [], 'open-login': [] }>()

const userStore = useUserStore()
const tournamentsOpen = ref(false)

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.qydha.app'

const tournamentLinks = [
    { label: 'جميع البطولات', to: '/championships', icon: 'zat:cup' },
    { label: 'البطولة القادمة', to: '/championships/upcoming', icon: 'zat:calendar' },
    { label: 'البطولات السابقة', to: '/championships/done', icon: 'zat:menu-board' },
    { label: 'بطولة الكأس', to: '/championships/cup', icon: 'zat:cup' },
    { label: 'بطولة السوبر', to: '/championships/super', icon: 'zat:status-up' },
    { label: 'بطولة الحزام', to: '/championships/hezam', icon: 'zat:medal-star' },
    { label: 'بطولة الجمهور', to: '/join-us', icon: 'zat:medal-star' },
]

const primaryLinks = [
    { label: 'اللاعبين', to: '/#players', icon: 'zat:profile' },
    { label: 'الفرق', to: '/teams', icon: 'zat:people' },
    {
        label: 'تعلم اللعبة',
        href: 'https://www.youtube.com/@zat_baloot',
        target: '_blank',
        icon: 'zat:teacher',
    },
    { label: 'الاخبار', to: '/blogs?pageNum=1', icon: 'zat:menu-board' },
    { label: 'الوظائف', to: '/jobs?pageNum=1', icon: 'zat:menu-board' },
]

const socialLinks = [
    { icon: 'zat:instagram', href: 'https://www.instagram.com/zat_baloot', label: 'Instagram' },
    { icon: 'zat:whatsapp', href: 'https://wa.me/966545970009', label: 'WhatsApp' },
    { icon: 'zat:facebook', href: 'https://www.facebook.com/zatbaloot', label: 'Facebook' },
    { icon: 'zat:youtube', href: 'https://youtube.com/@zat_baloot', label: 'YouTube' },
    { icon: 'zat:twitch', href: 'https://twitch.tv/zat_baloot', label: 'Twitch' },
]

function openLogin() {
    emit('open-login')
    emit('close')
}

function logout() {
    userStore.logoutUser()
    emit('close')
}
</script>
