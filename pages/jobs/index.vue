<template>
    <div class="flex w-full flex-col bg-surface-base">
        <section
            class="w-full bg-surface-secondary bg-repeat py-6"
            :style="{ backgroundImage: `url(${darkHeroPattern})` }"
            aria-label="وظائف زات"
        >
            <div class="page-container flex flex-col items-center gap-2 text-center">
                <div class="flex flex-col items-center">
                    <h1 class="font-zaatar text-3xl leading-normal text-white sm:text-4xl">
                        وظائف
                    </h1>
                    <img :src="jobsHeroLogo" alt="زات" class="h-28 w-auto">
                </div>
                <p class="text-xl font-semibold leading-9 text-white">
                    اكتشف فرصتك معنا وانضم إلى فريق زات!
                </p>
                <AppButton
                    label="تصفح الوظائف"
                    variant="primary"
                    size="lg"
                    to="/jobs/all"
                />
            </div>
        </section>

        <FetchDataWrapper
            class="w-full"
            :error="error ? 'تعذر تحميل البيانات برجاء المحاولة لاحقا.' : null"
            :pending="pending"
        >
            <section
                v-if="featuredJobs.length"
                id="featured-jobs"
                class="scroll-mt-24 w-full bg-poker-pattern bg-surface-off-base py-4"
                aria-label="كن أول من يتقدم بطلب"
                dir="rtl"
            >
                <div class="page-container flex flex-col items-center gap-4">
                    <h2 class="text-center text-2xl font-bold leading-14 text-text-body sm:text-3xl sm:leading-14">
                        كن أول من يتقدم بطلب
                    </h2>
                    <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                        <JobCard
                            v-for="job in featuredJobs"
                            :key="job.id"
                            :job="job"
                            variant="featured"
                        />
                    </div>
                
                    <AppButton
                        v-if="listJobs.length || totalJobsCount > featuredJobs.length"
                        label="تصفح جميع الوظائف"
                        size="lg"
                        to="/jobs/all"
                    />
                </div>
            </section>

            <section
                v-if="listJobs.length || (!featuredJobs.length && jobs.length)"
                id="all-jobs"
                class="scroll-mt-24 w-full bg-surface-off-base py-4"
                aria-label="الوظائف"
                dir="rtl"
            >
                <div class="page-container flex flex-col items-center gap-4">
                    <h2 class="text-center text-2xl font-bold leading-14 text-text-body sm:text-3xl sm:leading-14">
                        الوظائف
                    </h2>
                    <div class="flex w-full flex-col">
                        <JobCard
                            v-for="job in listJobs.length ? listJobs : jobs"
                            :key="job.id"
                            :job="job"
                            variant="list"
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

            <div
                v-if="!jobs.length"
                class="flex flex-col items-center justify-center px-5 py-16 text-lg text-text-body"
                dir="rtl"
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

            <section
                class="w-full bg-surface-base py-6"
                aria-label="التزامات زات"
                dir="rtl"
            >
                <div class="page-container flex flex-col gap-4">
                    <article class="flex flex-col gap-1">
                        <h3 class="text-xl font-bold leading-10 text-text-body">
                            تكافؤ الفرص والالتزام بالمجتمع
                        </h3>
                        <p class="whitespace-pre-line text-base leading-7 text-text-body">
                            تلتزم ZAT بتوفير بيئة عادلة ومتاحة للجميع، حيث نرحب بجميع الأفراد دون أي تمييز على أساس الجنس، العمر، الجنسية، الإعاقة، أو أي عوامل أخرى يحميها النظام. نؤمن بأن التنوع واحترام الجميع هما جزء أساسي من بناء مجتمع بلوت ممتع وتنافسي للجميع.
نسعى دائمًا إلى توفير تجربة متساوية وعادلة لجميع اللاعبين، المشاركين، وأعضاء مجتمع ZAT، مع ضمان احترام حقوق الجميع والالتزام بأعلى معايير النزاهة والشفافية.
                        </p>
                    </article>
                    <article class="flex flex-col gap-1">
                        <h3 class="text-xl font-bold leading-10 text-text-body">
                            طلبات الدعم والمساعدة
                        </h3>
                        <p class="whitespace-pre-line text-base leading-7 text-text-body">
                            نحرص في ZAT على توفير تجربة سهلة ومناسبة لجميع المستخدمين. إذا كنت تواجه أي صعوبة في الوصول إلى خدماتنا أو تحتاج إلى أي مساعدة خاصة، يمكنك التواصل معنا وسنكون سعداء بتقديم الدعم اللازم لمساعدتك.
لأي استفسارات أو طلبات دعم، يرجى التواصل معنا عبر البريد الإلكتروني:
                            <ULink to="mailto:info@zatbaloot.com" class="underline hover:text-text-action">
                                info@zatbaloot.com
                            </ULink>
                        </p>
                    </article>
                    <article class="flex flex-col gap-1">
                        <h3 class="text-xl font-bold leading-10 text-text-body">
                            ملفات تعريف الارتباط (Cookies)
                        </h3>
                        <p class="whitespace-pre-line text-base leading-7 text-text-body">
                            يستخدم هذا الموقع ملفات تعريف الارتباط (Cookies) لتحسين تجربة المستخدم، وتحليل أداء الموقع، وتقديم تجربة استخدام أفضل.
باستمرارك في تصفح موقع ZAT، فإنك توافق على استخدام ملفات تعريف الارتباط وفقًا لسياسة الخصوصية الخاصة بنا.
                        </p>
                    </article>
                </div>
            </section>
        </FetchDataWrapper>
    </div>
</template>

<script setup lang="ts">
import darkHeroPattern from '~/assets/images/shared/dark-hero-pattern.png'
import jobsHeroLogo from '~/assets/images/jobs/jobs-hero-logo.svg'

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

const featuredJobs = computed(() => {
    if (pageNumber.value !== 1)
        return []
    return jobs.value.slice(0, 2)
})

const listJobs = computed(() => {
    if (pageNumber.value !== 1)
        return jobs.value
    return jobs.value.slice(2)
})

function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

useHead({
    title: 'وظائف زات - فرص العمل المتاحة',
    meta: [
        { name: 'description', content: 'اكتشف فرص العمل المتاحة في زات. انضم إلى فريقنا وكن جزءاً من تطوير مجتمع البلوت في المملكة.' },
        { property: 'og:title', content: 'وظائف زات - فرص العمل المتاحة' },
        { property: 'og:description', content: 'اكتشف فرص العمل المتاحة في زات. انضم إلى فريقنا وكن جزءاً من تطوير مجتمع البلوت في المملكة.' },
    ],
})

watch(pending, (newValue) => {
    if (newValue)
        indicator.start()
    else
        indicator.finish()
})

const handlePageChange = (val: number) => {
    pageNumber.value = val
    router.replace(`/jobs?pageNum=${val}`)
    nextTick(() => scrollToSection('all-jobs'))
}
</script>
