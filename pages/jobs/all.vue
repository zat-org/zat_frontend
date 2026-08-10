<template>
    <div class="flex w-full flex-col bg-surface-base">
        <header
            class="w-full bg-surface-raised"
            aria-label="شريط عنوان الوظائف"
            dir="rtl"
        >
            <div class="page-container flex items-center gap-2 py-4">
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
                        جميع الوظائف
                    </h1>
                </div>
            </div>
        </header>

        <FetchDataWrapper
            class="w-full"
            :error="error ? 'تعذر تحميل البيانات برجاء المحاولة لاحقا.' : null"
            :pending="pending"
        >
            <section
                class="w-full bg-surface-off-base py-6"
                aria-label="جميع الوظائف"
                dir="rtl"
            >
                <div class="page-container flex flex-col items-center gap-4">
                    <h2 class="text-center text-2xl font-bold leading-12 text-text-body">
                        اكتشف مغامرتك الجديدة مع زات، حيث الفرص لا تنتهي!
                    </h2>

                    <div
                        v-if="jobs.length"
                        class="flex w-full flex-col"
                    >
                        <JobCard
                            v-for="job in jobs"
                            :key="job.id"
                            :job="job"
                            variant="list"
                        />
                    </div>

                    <div
                        v-else
                        class="flex flex-col items-center justify-center px-5 py-16 text-lg text-text-body"
                    >
                        <UIcon name="i-heroicons-briefcase" class="mb-4 size-16 text-text-caption" />
                        <h4 class="max-w-xl text-center">
                            لا توجد وظائف شاغرة الان ولكن ارفق لنا بياناتك لنتواصل معك عند توفر وظيفة تناسبك
                        </h4>
                        <AppButton
                            class="mt-6"
                            label="ارسل بياناتك الان"
                            variant="primary"
                            size="lg"
                            to="/jobs/apply"
                        />
                    </div>

                    <Pagination
                        v-if="totalJobsCount > pgSize"
                        :page-size="pgSize"
                        :total-items-count="totalJobsCount"
                        :current-page="pageNumber"
                        @go-to-page="handlePageChange"
                    />
                </div>
            </section>
        </FetchDataWrapper>
    </div>
</template>

<script setup lang="ts">
import breadcrumbChevron from '~/assets/images/championships/titlebar-back-arrow.svg'

const { $api } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const indicator = useLoadingIndicator()

const pgSize = 10
const pgNumStr = route.query.pageNum as string
const pageNumber = ref<number>(
    pgNumStr && !Number.isNaN(Number.parseInt(pgNumStr, 10))
        ? Number.parseInt(pgNumStr, 10)
        : 1,
)

const { data, pending, error } = await $api.jobs.getAll(pageNumber, pgSize, { watch: [pageNumber] })
const jobs = computed(() => data.value?.jobs ?? [])
const totalJobsCount = computed(() => data.value?.pagination.total ?? 0)

function handlePageChange(val: number) {
    pageNumber.value = val
    router.replace(`/jobs/all?pageNum=${val}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(pending, (newValue) => {
    if (newValue)
        indicator.start()
    else
        indicator.finish()
})

useHead({
    title: 'جميع الوظائف - وظائف زات',
    meta: [
        { name: 'description', content: 'اكتشف جميع فرص العمل المتاحة في زات. انضم إلى فريقنا وكن جزءاً من تطوير مجتمع البلوت في المملكة.' },
        { property: 'og:title', content: 'جميع الوظائف - وظائف زات' },
        { property: 'og:description', content: 'اكتشف جميع فرص العمل المتاحة في زات. انضم إلى فريقنا وكن جزءاً من تطوير مجتمع البلوت في المملكة.' },
    ],
})
</script>
