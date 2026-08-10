<template>
    <section class="w-full bg-poker-pattern py-8" aria-label="متجر زات وتطبيق قيدها">
        <!-- Store -->
        <div class="relative overflow-hidden   ">
            <div class="pointer-events-none absolute inset-x-0 
            top-0 
            lg:top-10
             h-[280px] overflow-hidden">
                <img :src="storeBanner" alt="" class="absolute inset-0 size-full object-cover  opacity-90"
                    aria-hidden="true">
            </div>

            <div class=" page-container    relative  z-10
                grid  
                lg:grid-rows-[220px_auto]   lg:grid-cols-[1fr_1fr] 
                grid-rows-[100px_auto]       grid-cols-1

                ">
                <div
                    class="
                    justify-self-center  self-end 
                    lg:justify-self-end
                    flex w-full max-w-[416px] flex-col items-center justify-end gap-1 text-center text-text-on-action lg:flex-1">

                    <p class="text-xs font-bold ">
                        منصة زات للبلوت
                    </p>
                    <h2 class="text-3xl font-bold leading-tight sm:text-[32px] sm:leading-[56px]">
                        تصفح متجرنا
                    </h2>
                </div>

                <HomeMerchProductCard :store-url="PRODUCT_URL" class="
                lg:row-span-2 lg:justify-self-start  

                row-span-1  justify-self-center  self-center 
                " />

                <div class="
                    justify-self-center  self-center  text-text-body  pt-5
                    lg:justify-self-end lg:text-text-on-action/90
                    flex flex-col items-center  w-full max-w-[416px] 
                     gap-6 text-center  lg:flex-1">
                    <p class=" text-base leading-relaxed   sm:text-xl sm:leading-9
                    order-1">
                        متجر متخصص ببيع ورق بلوت زات، ورق البلوت الأفضل.
                        <span class="hidden lg:inline">

                            فروعنا في:
                        </span>
                    </p>

                    <UButton :to="STORE_URL" target="_blank" color="neutral" class="
                        order-3
                        lg:order-2
                                h-14 min-w-32 px-4 text-xl font-bold">
                        تسوّق الآن
                    </UButton>

                    <p class="
                    order-2
                    lg:order-3

                        text-xl font-bold text-text-subtitle">
                        الرياض و الخرج
                    </p>
                </div>

            </div>
        </div>

        <!-- Qydha app -->
        <div class="relative overflow-hidden  py-12 sm:py-16">
            <div
                class="page-container relative z-10 flex flex-col items-center gap-10 lg:flex-row lg:items-center justify-center lg:gap-6">
                <div class="grid w-full max-w-[416px] grid-cols-2 gap-4">
                    
                    <div class="flex flex-col gap-4">
                        <div class="rounded-zat-md bg-surface-raised px-2 py-1 text-center">
                            <p class="font-cairo text-3xl font-bold leading-[56px] text-text-action">
                                100,000 +
                            </p>
                            <p class="text-xl font-bold leading-10 text-text-subtitle">
                                مستخدم
                            </p>
                        </div>
                        <div class="relative min-h-[140px] flex-1 overflow-hidden rounded-zat-md">
                            <img :src="qydhaApp2" alt="تطبيق قيدها" class="size-full object-cover">
                        </div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="relative min-h-[140px] flex-1 overflow-hidden rounded-zat-md">
                            <img :src="qydhaApp1" alt="لقطة شاشة من تطبيق قيدها"
                                class="size-full object-cover object-top">
                        </div>
                        <div class="rounded-zat-md bg-surface-raised px-2 py-1 text-center">
                            <p class="font-cairo text-3xl font-bold leading-[56px] text-text-action">
                                4.8
                            </p>
                            <p class="text-xl font-bold leading-10 text-text-subtitle">
                                تقييم
                            </p>
                        </div>
                    </div>

                 
                </div>

                <div
                    class="flex w-full max-w-[416px] flex-col items-center justify-between gap-6 text-center  ">
                    <div class="space-y-4">
                        <h2 class="text-3xl font-bold leading-tight text-text-heading sm:text-[32px] sm:leading-[56px]">
                            تطبيق قيدها
                        </h2>
                        <p class="text-xl font-bold leading-10 text-text-heading">
                            كل شيء تحتاجه للبلوت.. في مكان واحد
                        </p>
                        <p class="text-xl font-medium leading-9 text-text-subtitle">
                            احسب النقاط، تابع الجولات، ونظّم البطولات بسهولة مع قيدها.
                        </p>
                    </div>

                    <div class="flex w-full flex-row items-center justify-center gap-2 sm:gap-4">
                        <UButton
                            :to="APP_STORE_URL"
                            target="_blank"
                            color="neutral"
                            size="sm"
                            class="h-10 min-w-0 flex-1 px-3 text-[clamp(14px,3.5vw,16px)] font-bold sm:h-14 sm:px-4 sm:text-[clamp(16px,1.5vw,20px)]"
                        >
                            <span class="flex w-full items-center justify-center gap-1">
                                <UIcon name="zat:apple" class="size-5 sm:size-6" />
                                App Store
                            </span>
                        </UButton>
                        <UButton
                            :to="GOOGLE_PLAY_URL"
                            target="_blank"
                            color="neutral"
                            size="sm"
                            class="h-10 min-w-0 flex-1 px-3 text-[clamp(14px,3.5vw,16px)] font-bold sm:h-14 sm:px-4 sm:text-[clamp(16px,1.5vw,20px)]"
                        >
                            <span class="flex w-full items-center justify-center gap-1">
                                <Icon name="zat:google-play" class="size-5 sm:size-6" />
                                Google Play
                            </span>
                        </UButton>
                    </div>
                </div>


            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import storeBanner from '~/assets/images/merch/store-banner.png'
import qydhaApp1 from '~/assets/images/merch/qydha-app-1.png'
import qydhaApp2 from '~/assets/images/merch/qydha-app-2.png'

const STORE_URL = 'https://zatbaloot.store/'
const PRODUCT_URL = 'https://zatbaloot.store/ar/zb-blt-3p/p489108162'
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.qydha'
const APP_STORE_URL = 'https://apps.apple.com/in/app/qydha/id6446068415'
</script>
