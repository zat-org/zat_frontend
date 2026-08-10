<template>
    <USlideover
        v-model:open="isSidebarOpen"
        side="right"
        :close="false"
        :ui="{
            content: 'max-w-[343px] w-full bg-surface-off-base shadow-zat',
        }"
    >
        <template #content>
            <div
                class="flex h-full flex-col bg-surface-off-base text-text-body"
                dir="rtl"
            >
                <header class="flex shrink-0 items-center justify-between px-4 pb-4 pt-6">
                    <h2 class="text-xl font-bold leading-8 text-text-body">
                        القائمة
                    </h2>
                    <button
                        type="button"
                        class="flex size-6 items-center justify-center text-text-body transition-opacity hover:opacity-70"
                        aria-label="اغلاق القائمة"
                        @click="closeSidebar"
                    >
                        <UIcon
                            name="zat:close-square"
                            class="size-6"
                        />
                    </button>
                </header>

                <div class="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
                    <SideNavigationBar @navigate="closeSidebar" />
                </div>

                <footer class="flex shrink-0 flex-col items-start gap-2 px-4 pb-6 pt-2">
                    <img
                        src="/images/zat-logo-black.svg"
                        alt="زات"
                        class="h-9 w-auto dark:hidden"
                        width="62"
                        height="36"
                    >
                    <img
                        src="/images/zat-logo-white.svg"
                        alt="زات"
                        class="hidden h-9 w-auto dark:block"
                        width="62"
                        height="36"
                    >

                    <div class="flex items-center gap-4">
                        <a
                            v-for="social in socialLinks"
                            :key="social.href"
                            :href="social.href"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex size-8 items-center justify-center rounded-lg bg-surface-raised text-text-body transition-opacity hover:opacity-80"
                            :aria-label="social.label"
                        >
                            <UIcon
                                :name="social.icon"
                                class="size-4"
                            />
                        </a>
                    </div>
                </footer>
            </div>
        </template>
    </USlideover>
</template>

<script setup lang="ts">
const isSidebarOpen = defineModel<boolean>('open', { default: false })

const socialLinks = [
    { icon: 'zat:instagram', href: 'https://www.instagram.com/zat_baloot', label: 'Instagram' },
    { icon: 'zat:whatsapp', href: 'https://wa.me/966545970009', label: 'WhatsApp' },
    { icon: 'zat:facebook', href: 'https://www.facebook.com/zatbaloot', label: 'Facebook' },
    { icon: 'zat:youtube', href: 'https://youtube.com/@zat_baloot', label: 'YouTube' },
    { icon: 'zat:twitch', href: 'https://twitch.tv/zat_baloot', label: 'Twitch' },
]

function closeSidebar() {
    isSidebarOpen.value = false
}
</script>
