<template>
    <div class="flex w-full flex-col bg-surface-base">
        <header
            class="w-full bg-surface-raised"
            aria-label="شريط عنوان التقديم"
            dir="rtl"
        >
            <div class="page-container flex items-center gap-2 py-2">
                <NuxtLink
                    to="/jobs"
                    class="flex size-8 shrink-0 items-center justify-center rounded-zat-full text-text-body transition-opacity hover:opacity-70"
                    aria-label="العودة إلى الوظائف"
                >
                    <UIcon name="i-heroicons-chevron-right-20-solid" class="size-8" />
                </NuxtLink>

                <span class="h-8 w-0.5 shrink-0 bg-surface-tone2" aria-hidden="true" />

                <div class="flex min-w-0 items-center gap-2">
                    <NuxtLink
                        to="/jobs"
                        class="shrink-0 text-base font-bold leading-7 text-text-subtitle transition-opacity hover:opacity-70"
                    >
                        الوظائف
                    </NuxtLink>
                    <img
                        :src="breadcrumbChevron"
                        alt=""
                        class="hidden size-8 shrink-0 sm:block"
                        aria-hidden="true"
                    >
                    <h1 class="truncate text-base font-bold leading-7 text-text-body">
                        استمارة التقدم للوظيفة
                    </h1>
                </div>
            </div>
        </header>

        <section
            class="w-full bg-poker-pattern bg-surface-off-base py-6"
            aria-label="استمارة التقدم للوظيفة"
            dir="rtl"
        >
            <div class="page-container">
                <div class="rounded-zat-md bg-surface-raised p-4 shadow-zat sm:p-6 lg:px-20 lg:py-6">
                    <JobApplyForm
                        :job-id="null"
                        @cancel="router.push('/jobs')"
                        @done="router.push('/jobs')"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import breadcrumbChevron from '~/assets/images/championships/titlebar-back-arrow.svg'

const router = useRouter()

useHead({
    title: 'استمارة التقدم للوظيفة - وظائف زات',
    meta: [
        { name: 'description', content: 'قدّم على وظائف زات. املأ الاستمارة وأرفق سيرتك الذاتية وسنتواصل معك عند توفر فرصة مناسبة.' },
        { property: 'og:title', content: 'استمارة التقدم للوظيفة - وظائف زات' },
    ],
})
</script>
