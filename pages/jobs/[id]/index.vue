<template>
    <div class="flex w-full flex-col bg-surface-base">
        <FetchDataWrapper
            class="w-full"
            :error="getJobError ? 'تعذر تحميل البيانات برجاء المحاولة لاحقا' : null"
            :pending="getJobPending"
        >
            <template v-if="job">
                <header
                    class="w-full bg-surface-raised"
                    aria-label="شريط عنوان الوظيفة"
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
                            <NuxtLink
                                to="/jobs/all"
                                class="hidden shrink-0 text-base font-bold leading-7 text-text-subtitle transition-opacity hover:opacity-70 sm:block"
                            >
                                جميع الوظائف
                            </NuxtLink>
                            <img
                                :src="breadcrumbChevron"
                                alt=""
                                class="hidden size-8 shrink-0 sm:block"
                                aria-hidden="true"
                            >
                            <h1 class="truncate text-base font-bold leading-7 text-text-body">
                                تفاصيل الوظيفة
                            </h1>
                        </div>
                    </div>
                </header>

                <section
                    class="w-full bg-surface-off-base pt-2"
                    aria-label="عنوان الوظيفة"
                    dir="rtl"
                >
                    <div class="page-container">
                        <div class="flex flex-col gap-1 border-b-2 border-surface-tone2 py-2">
                            <div class="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <h2 class="text-2xl font-bold leading-14 text-text-body sm:text-3xl sm:leading-14">
                                    {{ job.jobTitle }}
                                </h2>
                                <AppButton
                                    label="قدّم بطلبك الآن"
                                    size="lg"
                                    :to="job.isApplyingOpen ? `/jobs/${job.id}/apply` : undefined"
                                    :disabled="!job.isApplyingOpen"
                                />
                            </div>
                            <div class="flex flex-wrap items-center gap-2 text-xs font-semibold leading-6 text-text-subtitle">
                                <span>{{ job.isApplyingOpen ? 'مفتوح للتقديم' : 'التقديم مغلق' }}</span>
                                <span aria-hidden="true">•</span>
                                <span>المملكة العربية السعودية</span>
                                <img :src="locationIcon" alt="" class="size-4" aria-hidden="true">
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    class="w-full bg-surface-base py-6"
                    aria-label="مواصفات الوظيفة"
                    dir="rtl"
                >
                    <div class="page-container flex flex-col gap-4">
                        <article class="flex flex-col gap-1">
                            <h3 class="text-xl font-bold leading-10 text-text-heading">
                                عنوان الوظيفة
                            </h3>
                            <p class="text-base leading-7 text-text-body">
                                {{ job.jobTitle }}
                            </p>
                        </article>
                        <article class="flex flex-col gap-1">
                            <h3 class="text-xl font-bold leading-10 text-text-heading">
                                المكان
                            </h3>
                            <p class="text-base leading-7 text-text-body">
                                المملكة العربية السعودية
                            </p>
                        </article>
                        <article class="flex flex-col gap-1">
                            <h3 class="text-xl font-bold leading-10 text-text-heading">
                                مواصفات الوظيفة
                            </h3>
                            <MarkdownRender
                                v-if="job.responsibilities"
                                class="prose-headings:text-text-heading prose-p:leading-7 prose-p:text-text-body prose-li:text-text-body"
                                :markdown-string="job.responsibilities"
                            />
                            <p
                                v-else-if="job.jobDescription"
                                class="whitespace-pre-line text-base leading-7 text-text-body"
                            >
                                {{ job.jobDescription }}
                            </p>
                        </article>
                    </div>
                </section>

                <section
                    class="w-full bg-surface-off-base py-4"
                    dir="rtl"
                >
                    <div class="page-container flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <h2 class="text-2xl font-bold leading-14 text-text-body sm:text-3xl sm:leading-14">
                            {{ job.jobTitle }}
                        </h2>
                        <AppButton
                            label="قدّم بطلبك الآن"
                            size="lg"
                            :to="job.isApplyingOpen ? `/jobs/${job.id}/apply` : undefined"
                            :disabled="!job.isApplyingOpen"
                        />
                    </div>
                </section>

                <section
                    v-if="otherJobs.length"
                    class="w-full bg-poker-pattern bg-surface-off-base py-4"
                    aria-label="وظائف اخرى"
                    dir="rtl"
                >
                    <div class="page-container flex flex-col items-center gap-4">
                        <h2 class="text-center text-2xl font-bold leading-14 text-text-body sm:text-3xl">
                            وظائف اخرى
                        </h2>
                        <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                            <JobCard
                                v-for="otherJob in otherJobs"
                                :key="otherJob.id"
                                :job="otherJob"
                                variant="featured"
                            />
                        </div>
                        <NuxtLink
                            to="/jobs/all"
                            class="inline-flex h-14 items-center justify-center rounded-full bg-surface-secondary px-4 text-xl font-bold text-white transition-opacity hover:opacity-90"
                        >
                            تصفح جميع الوظائف
                        </NuxtLink>
                    </div>
                </section>

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
            </template>
        </FetchDataWrapper>
    </div>
</template>

<script setup lang="ts">
import breadcrumbChevron from '~/assets/images/championships/titlebar-back-arrow.svg'
import locationIcon from '~/assets/images/contact/icon-location.svg'

definePageMeta({
    validate: (route) => /^\d+$/.test(String(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id || '')),
})

const { $api } = useNuxtApp()
const route = useRoute()

const jobParam = computed(() => {
    const id = route.params.id
    return String(Array.isArray(id) ? id[0] : id || '')
})

const { error: getJobError, pending: getJobPending, data: job } = await $api.jobs.getById(jobParam.value)

const relatedPage = ref(1)
const { data: relatedData } = await $api.jobs.getAll(relatedPage, 10)
const otherJobs = computed(() =>
    (relatedData.value?.jobs ?? [])
        .filter(item => item.id !== job.value?.id)
        .slice(0, 2),
)

useHead({
    title: computed(() => job.value?.jobTitle ? `وظائف زات - ${job.value.jobTitle}` : 'وظائف زات'),
    meta: computed(() => [
        {
            name: 'description',
            content: job.value?.jobTitle
                ? `وظيفة ${job.value.jobTitle} في زات. تعرف على المسؤوليات والمتطلبات وقدم على الوظيفة الآن.`
                : 'فرص العمل المتاحة في زات. انضم إلى فريقنا وكن جزءاً من تطوير مجتمع البلوت.',
        },
        {
            property: 'og:title',
            content: job.value?.jobTitle ? `وظائف زات - ${job.value.jobTitle}` : 'وظائف زات',
        },
        {
            property: 'og:description',
            content: job.value?.jobTitle
                ? `وظيفة ${job.value.jobTitle} في زات. تعرف على المسؤوليات والمتطلبات وقدم على الوظيفة الآن.`
                : 'فرص العمل المتاحة في زات. انضم إلى فريقنا وكن جزءاً من تطوير مجتمع البلوت.',
        },
    ]),
})
</script>
