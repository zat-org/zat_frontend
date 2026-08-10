<template>
    <footer class="relative overflow-hidden bg-poker-pattern text-text-body">
        <div class="page-container relative z-10 flex flex-col gap-6 py-6 sm:gap-8 sm:py-8">
            <!-- Main: brand + columns -->
            <div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
                <!-- Brand + social -->
                <div class="flex w-full min-w-0 flex-col items-center gap-3 text-center sm:items-start sm:text-start lg:max-w-md lg:flex-1">
                    <div
                        role="img"
                        aria-label="زات"
                        class="h-10 w-[70px] bg-text-caption sm:h-[50px] sm:w-[87px]"
                        style="mask-image: url('/images/zat-logo-black.svg'); mask-size: contain; mask-repeat: no-repeat; mask-position: center; -webkit-mask-image: url('/images/zat-logo-black.svg'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;"
                    />
                    <p class="max-w-sm text-sm font-semibold leading-6 text-text-subtitle sm:text-base sm:leading-7">
                        المنصة الأولى للبلوت الاحترافي في المملكة العربية السعودية
                    </p>
                    <div class="flex flex-wrap flex-row-reverse items-center justify-center gap-2 sm:justify-start sm:gap-3 md:gap-4">
                        <NuxtLink
                            v-for="social in socialLinks"
                            :key="social.href"
                            :to="social.href"
                            target="_blank"
                            external
                            class="flex size-10 items-center justify-center rounded-zat-sm bg-surface-raised text-text-caption transition-transform duration-300 hover:-translate-y-1 hover:bg-zat-300 hover:text-white sm:size-12"
                            :aria-label="social.label"
                        >
                            <UIcon :name="social.icon" class="size-5 sm:size-6" />
                        </NuxtLink>
                    </div>
                </div>

                <!-- Tournaments / Quick links / Contact -->
                <div class="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-8 lg:flex lg:w-auto lg:flex-1 lg:justify-end lg:gap-10 xl:gap-12">
                    <nav class="flex flex-col gap-3 sm:gap-5" aria-label="البطولات">
                        <h3 class="text-lg font-bold leading-8 text-text-body sm:text-xl sm:leading-10">
                            البطولات
                        </h3>
                        <ul class="flex flex-col gap-2 sm:gap-3">
                            <li v-for="link in tournamentLinks" :key="link.to">
                                <NuxtLink
                                    :to="link.to"
                                    class="text-sm leading-6 text-text-subtitle transition-opacity hover:opacity-80 sm:text-base sm:leading-7"
                                >
                                    {{ link.label }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </nav>

                    <nav class="flex flex-col gap-3 sm:gap-5" aria-label="روابط سريعة">
                        <h3 class="text-lg font-bold leading-8 text-text-body sm:text-xl sm:leading-10">
                            روابط سريعة
                        </h3>
                        <ul class="flex flex-col gap-2 sm:gap-3">
                            <li v-for="link in quickLinks" :key="link.label">
                                <NuxtLink
                                    :to="link.to"
                                    :target="link.external ? '_blank' : undefined"
                                    :external="link.external"
                                    class="text-sm leading-6 text-text-subtitle transition-opacity hover:opacity-80 sm:text-base sm:leading-7"
                                >
                                    {{ link.label }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </nav>

                    <div class="order-first col-span-2 flex flex-col gap-3 sm:col-span-1 sm:gap-5 lg:order-0">
                        <h3 class="text-lg font-bold leading-8 text-text-body sm:text-xl sm:leading-10">
                            تواصل معنا
                        </h3>
                        <div class="flex flex-col gap-2">
                            <a
                                href="mailto:info@zatbaloot.com"
                                class="flex items-center gap-2 text-sm leading-6 text-text-subtitle transition-opacity hover:opacity-80 sm:text-base sm:leading-7"
                            >
                                <UIcon name="zat:email" class="size-5 shrink-0 text-text-caption sm:size-6" />
                                <span class="break-all">info@zatbaloot.com</span>
                            </a>
                            <p class="flex items-center gap-2 text-sm leading-6 text-text-subtitle sm:text-base sm:leading-7">
                                <UIcon name="zat:location" class="size-5 shrink-0 text-text-caption sm:size-6" />
                                <span>المملكة العربية السعودية</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Legal bar -->
            <div class="flex flex-col-reverse items-center gap-3 pt-5 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-6 sm:text-start">
                <nav class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-start sm:gap-6" aria-label="روابط قانونية">
                    <NuxtLink
                        v-for="link in legalLinks"
                        :key="link.label"
                        :to="link.to"
                        class="text-sm leading-6 text-text-subtitle transition-opacity hover:opacity-80 sm:text-base sm:leading-7"
                    >
                        {{ link.label }}
                    </NuxtLink>
                </nav>
                <p class="text-sm leading-6 text-text-subtitle sm:text-base sm:leading-7">
                    © 2022 زات بلوت. جميع الحقوق محفوظة
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const socialLinks = [
    { icon: 'zat:instagram', href: 'https://www.instagram.com/zat_baloot', label: 'Instagram' },
    { icon: 'zat:whatsapp', href: 'https://wa.me/966545970009', label: 'WhatsApp' },
    { icon: 'zat:facebook', href: 'https://www.facebook.com/zatbaloot', label: 'Facebook' },
    { icon: 'zat:youtube', href: 'https://youtube.com/@zat_baloot', label: 'YouTube' },
    { icon: 'zat:twitch', href: 'https://twitch.tv/zat_baloot', label: 'Twitch' },
]

const tournamentLinks = [
    { label: 'كأس زات', to: '/championships/cup' },
    { label: 'سوبر زات', to: '/championships/super' },
    { label: 'حزام زات', to: '/championships/hezam' },
    { label: 'الجماهير', to: '/join-us' },
]

const quickLinks = [
    { label: 'تعلم البلوت', to: '/learn-baloot', external: false },
    { label: 'قيدها', to: '/qydha', external: false },
    { label: 'القوانين', to: '/rules', external: false },
    { label: 'الفرق', to: '/teams', external: false },
    { label: 'اللاعبين', to: '/#players', external: false },
    { label: 'الأخبار', to: '/blogs?pageNum=1', external: false },
]

const legalLinks = [
    { label: 'اتصل بنا', to: '/contact-us' },
    { label: 'الشروط والأحكام', to: '/about-us' },
    { label: 'سياسة الخصوصية', to: '/about-us' },
]
</script>
