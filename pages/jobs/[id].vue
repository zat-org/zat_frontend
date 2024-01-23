<template>
    <FetchDataWrapper class="md:w-5/6 lg:w2/3 mx-auto"
        :error="!getJobError ? null : 'تعذر تحميل البيانات برجاء المحاولة لاحقا'" :pending="getJobPending">
        <div class="flex justify-between items-center my-5">
            <div class=" w-full lg:w-1/2 mx-5">
                <div class="flex items-center">
                    <UAvatar class="bg-white me-3 h-10 w-10 p-0.5" src="https://zatbaloot.com/images/zat-logo-black.svg"
                        icon="i-heroicons-briefcase" />
                    <div class="grow">
                        <h2 class="text-sm text-gray-500">المسمى الوظيفى</h2>
                        <h2 class="text-xl truncate">{{ job?.data.attributes.jobTitle }}</h2>
                    </div>
                    <UButton to="/jobs" class="h-12 rounded-full w-12 md:w-32 transition-all text-center" :trailing="true">
                        <UIcon name="i-heroicons-arrow-small-left" class="text-2xl" />
                        <span class="hidden md:block">وظائف زات</span>
                    </UButton>
                </div>
                <div class="mt-5">
                    <MarkdownRender v-if="job?.data.attributes.responsibilities"
                        :markdownString="job?.data.attributes.responsibilities" class="mt-2 ms-2 " />
                </div>
                <UButton
                    class="fixed bottom-5 lg:hidden left-5 h-12 w-32 animate-bounce transition-all rounded-full flex justify-center items-center"
                    @click="isFormOpen = true">
                    <span>ارسل بياناتك الان</span>
                    <UIcon name="i-heroicons-inbox" class="text-[45px]" />
                </UButton>
            </div>
            <JobApplyForm class="w-1/2 hidden lg:block " :jobId="null" @cancel="isFormOpen = false"
                @done="router.push('/')" />
        </div>
    </FetchDataWrapper>
    <UModal v-model="isFormOpen">
        <JobApplyForm :jobId="null" @cancel="isFormOpen = false" @done="router.push('/')" />
    </UModal>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const { error: getJobError, pending: getJobPending, data: job } = await $api.jobs.getById(route.params.id[0]);
useHead({
    title: ` وظائف زات - ${job.value?.data.attributes.jobTitle}`,
})
const isFormOpen = ref(false);

</script>

<style scoped></style>