<template>
    <FetchDataWrapper class="mx-auto w-full lg:w-5/6 py-10"
        :error="error ? 'تعذر تحميل البيانات برجاء المحاولة لاحقا.' : null" :pending="pending">
        <section v-if="jobs && jobs.length > 0">
            <SectionHeader title="وظائف زات" icon="i-heroicons-briefcase">
                <UButton @click="isFormOpen = true" trailing-icon="i-heroicons-inbox">
                    <span class="block">ارسل بياناتك الان</span>
                </UButton>
            </SectionHeader>
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mb-20 justify-items-center">
                <template v-for="(job, index) in jobs" :key="index">
                    <JobCard :job="job" @callus="() => {
                        jobId = job.id;
                        isFormOpen = true;
                    }" />
                </template>
            </div>
            <div class="flex justify-center mt-8 absolute bottom-3 left-1/2 -translate-x-1/2">
                <Pagination :pageSize="pgSize" :totalItemsCount="totalJobsCount" :currentPage="pageNumber"
                    @goToPage="handlePageChange">
                </Pagination>
            </div>
        </section>
        <div v-else class="text-zinc-700 dark:text-slate-50 text-lg h-50 flex flex-col justify-center items-center py-10">
            <Icon name="pepicons-print:cv-circle" size="100" />
            <h4 class="text-center mt-5"> لا توجد وظائف شاغرة الان ولكن ارفق لنا بياناتك لنتواصل معك عند توفر وظيفة
                تناسبك </h4>
            <UButton @click="isFormOpen = true" icon="i-heroicons-inbox" class="mt-5">
                <span class="">ارسل بياناتك الان</span>
            </UButton>
        </div>
    </FetchDataWrapper>
    <UModal v-model="isFormOpen">
        <JobApplyForm :jobId="jobId" @cancel="() => { isFormOpen = false; jobId = null }" @done="router.push('/')" />
    </UModal>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();
const route = useRoute()
const router = useRouter()
const indicator = useLoadingIndicator();

const pgSize = 10;
const pgNumStr = route.query.pageNum as string;
const pageNumber = ref<number>((pgNumStr && !isNaN(parseInt(pgNumStr))) ? parseInt(pgNumStr) : 1);
const { data, pending, error } = await $api.jobs.getAll(pageNumber, pgSize, { watch: [pageNumber] });
const jobs = computed(() => data.value?.data)
const totalJobsCount = computed(() => data.value ? data.value.meta.pagination.total : 1)
const isFormOpen = ref(false)
const jobId = ref<number | null>(null);
useHead({
    title: `وظائف زات - فرص العمل المتاحة`,
    meta: [
        { name: 'description', content: 'اكتشف فرص العمل المتاحة في زات. انضم إلى فريقنا وكن جزءاً من تطوير مجتمع البلوت في المملكة.' },
        { property: 'og:title', content: 'وظائف زات - فرص العمل المتاحة' },
        { property: 'og:description', content: 'اكتشف فرص العمل المتاحة في زات. انضم إلى فريقنا وكن جزءاً من تطوير مجتمع البلوت في المملكة.' }
    ]
})

watch(pending, (newValue, oldValue) => {
    if (newValue)
        indicator.start();
    else
        indicator.finish();
})


const handlePageChange = (val: number) => {
    pageNumber.value = val
    router.replace(`/jobs?pageNum=${val}`);
}

</script>

<style scoped></style>