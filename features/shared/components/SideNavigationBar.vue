<template>
    <nav
        class="flex flex-col gap-2"
        aria-label="قائمة الموقع"
        dir="rtl"
    >
        <section class="flex flex-col items-stretch gap-4 border-y-2 border-surface-tone2 py-4">
            <h3 class="w-full text-right text-base font-bold leading-6 text-text-subtitle">
                البطولات
            </h3>

            <div class="w-full">
                <button
                    type="button"
                    class="relative flex w-full items-center justify-between gap-2 overflow-hidden rounded-lg border px-2 py-1 transition-colors"
                    :class="tournamentsOpen
                        ? 'border-surface-secondary bg-surface-off-base'
                        : 'border-[#D0D0D0] bg-surface-off-base'"
                    :aria-expanded="tournamentsOpen"
                    @click="tournamentsOpen = !tournamentsOpen"
                >
                    <span
                        class="pointer-events-none absolute -top-18 end-1/4 size-47.5 rounded-full bg-surface-off-base blur-md"
                        aria-hidden="true"
                    />
                    <div class="relative z-10 flex min-w-0 flex-1 items-center justify-between gap-2">
                        <div class="flex min-w-0 items-center gap-2">
                            <UIcon
                                name="zat:cup"
                                class="size-6 shrink-0 text-text-body"
                            />
                            <span class="truncate text-sm font-bold leading-[22px] text-text-body">
                                قائمة البطولات
                            </span>
                        </div>
                        <UIcon
                            name="zat:arrow-down"
                            class="size-6 shrink-0 text-text-body transition-transform duration-200"
                            :class="tournamentsOpen ? 'rotate-180' : ''"
                        />
                    </div>
                </button>

                <div
                    class="grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none"
                    :class="tournamentsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
                >
                    <div class="min-h-0 overflow-hidden">
                        <div class="mt-2 flex flex-col gap-2 rounded-zat-md bg-surface-raised p-2">
                            <NuxtLink
                                v-for="item in tournamentItems"
                                :key="item.to"
                                :to="item.to"
                                class="relative flex items-center justify-between gap-2 overflow-hidden rounded-lg border border-surface-secondary bg-surface-off-base px-2 py-1 transition-opacity hover:opacity-80"
                                @click="emitNavigate"
                            >
                                <span
                                    class="pointer-events-none absolute -top-18 end-1/4 size-47.5 rounded-full bg-surface-off-base blur-md"
                                    aria-hidden="true"
                                />
                                <div class="relative z-10 flex min-w-0 items-center gap-2">
                                    <UIcon
                                        :name="item.icon"
                                        class="size-6 shrink-0 text-text-body"
                                    />
                                    <span class="truncate text-sm font-bold leading-[22px] text-text-body">
                                        {{ item.label }}
                                    </span>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <NuxtLink
            v-for="item in mainItems"
            :key="item.to"
            :to="item.to"
            class="relative flex items-center justify-between gap-2 overflow-hidden rounded-lg border border-[#D0D0D0] bg-surface-off-base px-2 py-1 transition-opacity hover:opacity-80"
            @click="emitNavigate"
        >
            <span
                class="pointer-events-none absolute -top-18 end-1/4 size-47.5 rounded-full bg-surface-off-base blur-md"
                aria-hidden="true"
            />
            <div class="relative z-10 flex min-w-0 items-center gap-2">
                <UIcon
                    :name="item.icon"
                    class="size-6 shrink-0 text-text-body"
                />
                <span class="truncate text-sm font-bold leading-[22px] text-text-body">
                    {{ item.label }}
                </span>
            </div>
        </NuxtLink>

        <section class="flex flex-col items-stretch gap-4 border-y-2 border-surface-tone2 py-4">
            <h3 class="w-full text-right text-base font-bold leading-6 text-text-subtitle">
                تطبيق قيدها
            </h3>

            <template v-if="userStore.isAuthenticated && userStore.user">
                <div class="relative flex items-center justify-between gap-2 overflow-hidden rounded-lg border border-[#D0D0D0] bg-surface-off-base px-2 py-2">
                    <div class="relative z-10 flex min-w-0 items-center gap-2">
                        <UAvatar
                            :src="userStore.user.avatar_url || undefined"
                            icon="i-heroicons-user"
                            size="sm"
                            :ui="{ image: 'object-cover object-top' }"
                        />
                        <div class="min-w-0 text-right text-sm leading-[22px] text-text-body">
                            <p class="truncate font-bold">
                                @{{ userStore.user.username }}
                            </p>
                            <p
                                class="truncate text-xs text-text-subtitle"
                                dir="ltr"
                            >
                                {{ userStore.user.phone }}
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    class="relative flex w-full items-center justify-between gap-2 overflow-hidden rounded-lg border border-[#D0D0D0] bg-surface-off-base px-2 py-1 transition-opacity hover:opacity-80"
                    @click="logout"
                >
                    <div class="relative z-10 flex min-w-0 flex-1 items-center justify-between gap-2">
                        <div class="flex min-w-0 items-center gap-2">
                            <UIcon
                                name="zat:profile"
                                class="size-6 shrink-0 text-text-body"
                            />
                            <span class="truncate text-sm font-bold leading-[22px] text-text-body">
                                تسجيل خروج
                            </span>
                        </div>
                        <UIcon
                            name="zat:arrow-left-line"
                            class="size-6 shrink-0 text-text-body"
                        />
                    </div>
                </button>
            </template>

            <NuxtLink
                v-else
                to="/qydha"
                class="relative flex items-center justify-between gap-2 overflow-hidden rounded-lg border border-[#D0D0D0] bg-surface-off-base px-2 py-1 transition-opacity hover:opacity-80"
                @click="emitNavigate"
            >
                <div class="relative z-10 flex min-w-0 flex-1 items-center justify-between gap-2">
                    <div class="flex min-w-0 items-center gap-2">
                        <UIcon
                            name="zat:profile"
                            class="size-6 shrink-0 text-text-body"
                        />
                        <span class="truncate text-sm font-bold leading-[22px] text-text-body">
                            سجل مع قيدها الان
                        </span>
                    </div>
                    <UIcon
                        name="zat:arrow-left-line"
                        class="size-6 shrink-0 text-text-body"
                    />
                </div>
            </NuxtLink>

            <NuxtLink
                to="/qydha"
                class="relative flex items-center justify-between gap-2 overflow-hidden rounded-lg border border-[#D0D0D0] bg-surface-off-base px-2 py-1 transition-opacity hover:opacity-80"
                @click="emitNavigate"
            >
                <div class="relative z-10 flex min-w-0 flex-1 items-center justify-between gap-2">
                    <div class="flex min-w-0 items-center gap-2">
                        <UIcon
                            name="i-heroicons-arrow-down-tray"
                            class="size-6 shrink-0 text-text-body"
                        />
                        <span class="truncate text-sm font-bold leading-[22px] text-text-body">
                            تحميل التطبيق
                        </span>
                    </div>
                    <UIcon
                        name="zat:arrow-left-line"
                        class="size-6 shrink-0 text-text-body"
                    />
                </div>
            </NuxtLink>
        </section>
    </nav>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/useUserStore'

const emit = defineEmits<{
    navigate: []
}>()

const userStore = useUserStore()
const tournamentsOpen = ref(false)

const tournamentItems = [
    { label: 'البطولة القادمة', to: '/championships/upcoming', icon: 'zat:calendar' },
    { label: 'البطولات السابقة', to: '/championships/done', icon: 'zat:menu-board' },
    { label: 'بطولة الكأس', to: '/championships/cup', icon: 'zat:cup' },
    { label: 'بطولة السوبر', to: '/championships/super', icon: 'zat:cup' },
    { label: 'بطولة الحزام', to: '/championships/hezam', icon: 'zat:cup' },
    { label: 'بطولة الجمهور', to: '/join-us', icon: 'zat:medal-star' },
]

const mainItems = [
    { label: 'الفرق', to: '/teams', icon: 'i-heroicons-users-solid' },
    { label: 'تعلم اللعبة', to: '/learn-baloot', icon: 'zat:teacher' },
    { label: 'الاخبار', to: '/blogs?pageNum=1', icon: 'zat:menu-board' },
    { label: 'الوظائف', to: '/jobs?pageNum=1', icon: 'zat:menu-board' },
]

function emitNavigate() {
    emit('navigate')
}

function logout() {
    userStore.logoutUser()
    emitNavigate()
}
</script>
