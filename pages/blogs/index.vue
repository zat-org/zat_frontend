<template>
    <FetchDataWrapper class="w-full lg:w-5/6  py-3 lg:py-10"
        :error="error ? 'تعذر تحميل البيانات برجاء المحاولة لاحقا' : ''" :pending="pending">
        <section class="" v-if="blogs && blogs.length > 0">
            <SectionHeader title=" اخبار زات" icon="i-heroicons-newspaper" />
            <div class="mx-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mb-20 justify-items-center">
                <template v-for="blog in blogs">
                    <BlogCard :blog="blog" />
                </template>
            </div>
            <div class="flex justify-center mt-8 absolute bottom-3 left-1/2 -translate-x-1/2">
                <Pagination :pageSize="pgSize" :totalItemsCount="totalBlogsCount" :currentPage="pageNumber"
                    @goToPage="handlePageChange">
                </Pagination>
            </div>
        </section>
        <div v-else class="text-zinc-700 dark:text-slate-50 text-lg h-50 flex flex-col justify-center items-center py-10">
            <Icon name="line-md:alert-circle" class="block text-9xl" />
            <h3>لا يوجد اخبار حاليا</h3>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();
const route = useRoute()
const router = useRouter()

const pgSize = 10;

let pgNumStr = route.query.pageNum as string;
const indicator = useLoadingIndicator();
const pageNumber = ref<number>((pgNumStr && !isNaN(parseInt(pgNumStr))) ? parseInt(pgNumStr) : 1);
const { data, pending, error } = await $api.blogs.getAll(pageNumber, pgSize, { watch: [pageNumber] })
const blogs = computed(() => data.value?.blogs);
const totalBlogsCount = computed(() => data.value ? parseInt(data.value.totalCount) : 1);
const handlePageChange = (val: number) => {
    pageNumber.value = val
    router.replace(`/blogs?pageNum=${val}`);
}
useHead({
    title: `اخبار زات - آخر أخبار وتحديثات بطولات البلوت`,
    meta: [
        { name: 'description', content: 'تابع آخر أخبار وتحديثات بطولات البلوت من زات. أحداث البطولات، نتائج المباريات، وأخبار اللاعبين.' },
        { property: 'og:title', content: 'اخبار زات - آخر أخبار وتحديثات بطولات البلوت' },
        { property: 'og:description', content: 'تابع آخر أخبار وتحديثات بطولات البلوت من زات. أحداث البطولات، نتائج المباريات، وأخبار اللاعبين.' }
    ]
})

watch(pending, (newValue) => {
    if (newValue)
        indicator.start();
    else
        indicator.finish();
})
</script>

<style scoped></style>