<template>
    <div class="flex w-full flex-col bg-surface-base">
        <FetchDataWrapper
            :error="getBlogError ? 'تعذر تحميل البيانات برجاء المحاولة لاحقا.' : null"
            :pending="getBlogPending"
        >
            <template v-if="blog">
                <BlogPageHeader :title="blog.title" />

                <article
                    class="w-full bg-surface-base py-6"
                    dir="rtl"
                    :aria-label="blog.title"
                >
                    <div class="page-container flex flex-col gap-6">
                        <header class="flex flex-col gap-4 md:flex-row md:items-stretch md:gap-6">
                            <div class="h-46 w-full shrink-0 overflow-hidden rounded-zat-md bg-surface-overlay md:w-82">
                                <Image
                                    v-if="blog.image"
                                    :src="url + blog.image"
                                    :alt="blog.title"
                                    icon="i-heroicons-newspaper"
                                    class="size-full object-cover"
                                />
                                <div
                                    v-else
                                    class="flex size-full items-center justify-center"
                                >
                                    <img
                                        :src="newsIcon"
                                        alt=""
                                        class="size-12"
                                        aria-hidden="true"
                                    >
                                </div>
                            </div>

                            <div class="flex min-w-0 flex-1 flex-col gap-2">
                                <h1 class="text-2xl font-bold leading-10 text-text-heading sm:text-3xl sm:leading-14 lg:text-[40px] lg:leading-16">
                                    {{ blog.title }}
                                </h1>
                                <p
                                    v-if="blog.description"
                                    class="text-xl font-bold leading-10 text-text-subtitle sm:text-[32px] sm:leading-14"
                                >
                                    {{ blog.description }}
                                </p>
                                <time
                                    v-if="publishedLabel"
                                    class="text-xl font-bold leading-10 text-text-subtitle sm:text-2xl sm:leading-12"
                                    :datetime="publishedIso"
                                >
                                    {{ publishedLabel }}
                                </time>
                            </div>
                        </header>

                        <MarkdownRender
                            v-if="blog.details"
                            class="prose-headings:text-text-heading prose-p:text-justify prose-p:leading-7 prose-p:text-text-heading prose-img:w-full prose-img:rounded-zat-md"
                            :markdownString="blog.details"
                        />

                        <template v-if="relatedBlogs.length">
                            <ChampionshipsSectionDivider title="اخبار اخرى" />

                            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                <BlogCard
                                    v-for="related in relatedBlogs"
                                    :key="related.id"
                                    :blog="related"
                                />
                            </div>
                        </template>
                    </div>
                </article>
            </template>

            <div
                v-else
                class="flex flex-col items-center justify-center px-4 py-16 text-text-heading"
            >
                <UIcon
                    name="i-heroicons-newspaper"
                    class="mb-3 size-16 text-text-caption"
                />
                <h4 class="text-center text-lg">
                    هذا الخبر غير موجود
                </h4>
                <UButton
                    to="/blogs"
                    class="mt-5"
                    icon="i-heroicons-newspaper-solid"
                >
                    اخبار زات
                </UButton>
            </div>
        </FetchDataWrapper>
    </div>
</template>

<script setup lang="ts">
import newsIcon from '~/assets/images/blogs/news-icon.svg'

const { $api } = useNuxtApp()
const route = useRoute()
const url = useRuntimeConfig().public.apiBaseUrl
const relatedPage = ref(1)

const [
    { error: getBlogError, pending: getBlogPending, data },
    { data: relatedData },
] = await Promise.all([
    $api.blogs.getById(route.params.id as string),
    $api.blogs.getAll(relatedPage, 9),
])

const blog = computed(() => data.value?.data)

const publishedDate = computed(() => {
    if (!blog.value?.published_at) return null
    const date = new Date(blog.value.published_at)
    return Number.isNaN(date.getTime()) ? null : date
})

const publishedIso = computed(() => publishedDate.value?.toISOString() ?? undefined)

const publishedLabel = computed(() => {
    if (!publishedDate.value) return ''
    return publishedDate.value.toLocaleDateString('en-GB')
})

const relatedBlogs = computed(() => {
    const currentId = blog.value?.id
    return (relatedData.value?.blogs ?? [])
        .filter(item => item.id !== currentId)
        .slice(0, 3)
})

useHead({
    title: computed(() =>
        blog.value?.title ? `اخبار زات - ${blog.value.title}` : 'اخبار زات',
    ),
    meta: computed(() => [
        {
            name: 'description',
            content: blog.value?.title
                ? `${blog.value.title} - اقرأ المزيد عن آخر أخبار وتحديثات بطولات البلوت من زات.`
                : 'آخر أخبار وتحديثات بطولات البلوت من زات',
        },
        {
            property: 'og:title',
            content: blog.value?.title ? `اخبار زات - ${blog.value.title}` : 'اخبار زات',
        },
        {
            property: 'og:description',
            content: blog.value?.title
                ? `${blog.value.title} - اقرأ المزيد عن آخر أخبار وتحديثات بطولات البلوت من زات.`
                : 'آخر أخبار وتحديثات بطولات البلوت من زات',
        },
        {
            property: 'og:image',
            content: blog.value ? url + blog.value.image : undefined,
        },
    ]),
})
</script>
