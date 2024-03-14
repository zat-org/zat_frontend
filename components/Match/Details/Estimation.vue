<template>
    <div class="w-full order-first my-1">
        <template v-if="userStore.isAuthenticated">
            <template v-if="userSubmittedEstimationCount !== null">
                <template v-if="userSubmittedEstimationCount === 0 && isMatchOpenForEstimations">
                    <UButton @click="isEstimationFormOpened = true"
                        class="h-[4rem] relative bg-gradient-to-r from-[#FDC830] to-[#F37335] overflow-hidden">
                        <UIcon name="i-heroicons-document-chart-bar-solid"
                            class="text-6xl absolute text-gray-100  opacity-60 top-1/2 -left-4  -translate-y-1/2 " />
                        <p class="text-white w-4/5 text-right"> توقع نتيجة المباراة </p>
                    </UButton>
                    <MatchEstimationForm :match="match" v-model="isEstimationFormOpened"
                        @estimationSubmitted="handleEstimationSubmitted" />
                </template>

                <template v-if="userSubmittedEstimationCount > 0">
                    <UButton class="h-[4rem] relative bg-gradient-to-r from-[#FDC830] to-[#F37335] overflow-hidden">
                        <UIcon name="i-heroicons-document-check"
                            class="text-6xl absolute text-gray-100  opacity-60 top-1/2 -left-4  -translate-y-1/2 " />
                        <p class="text-white w-4/5 text-right">
                            <span v-if="data?.data[0].attributes.estimation_score">
                                نتيجة توقعك
                                10 / {{ data?.data[0].attributes.estimation_score }}
                            </span>
                            <span v-else>
                                تم استلام توقعك بالفعل
                            </span>
                        </p>

                    </UButton>
                </template>
            </template>

            <template v-else>
                <UButton v-if="pending" :loading="pending"
                    class="h-[4rem] relative bg-gradient-to-r from-[#FDC830] to-[#F37335] overflow-hidden">
                    <p class="text-white w-4/5 text-right">تحميل</p>
                </UButton>
                <UButton v-if="error"
                    class="h-[4rem] relative bg-gradient-to-r from-[#FDC830] to-[#F37335] overflow-hidden">
                    <UIcon name="i-heroicons-x-circle"
                        class="text-6xl absolute text-gray-100  opacity-60 top-1/2 -left-4  -translate-y-1/2 " />
                    <p class="text-white w-4/5 text-right">حدث خطأ في تحميل اليبانات برجاء المحاولة لاحقا</p>
                </UButton>
            </template>

        </template>

        <template v-else>
            <template v-if="isMatchOpenForEstimations">
                <UButton @click="isLoginFormOpened = true"
                    class="h-[4rem] w-44  relative bg-gradient-to-r from-[#FDC830] to-[#F37335] overflow-hidden">
                    <UIcon name="i-heroicons-user-circle"
                        class="text-6xl absolute text-gray-100  opacity-60 top-1/2 -left-4  -translate-y-1/2 " />
                    <p class="text-white  text-right">سجل دخول <br> وتوقع النتيجة </p>
                </UButton>
                <LoginForm v-model="isLoginFormOpened" />
            </template>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { IMatchFullDetails } from "@/Models/IMatchFullDetails"
const { $api } = useNuxtApp();
const userStore = useUserStore();
const props = defineProps<{ match: IMatchFullDetails }>();
const isEstimationFormOpened = ref(false)
const isLoginFormOpened = ref(false)


const { data, error, pending, getData: GetUserEstimationForMatch } = $api.estimation.useGetByIds();
const userSubmittedEstimationCount = computed(() => {
    if (data.value) {
        return data.value.meta.pagination.total
    }
    return null;
})

onMounted(async () => {
    await GetUserEstimationForMatch(props.match.id)
})
watch(() => userStore.user, async () => {
    await GetUserEstimationForMatch(props.match.id)
})
const handleEstimationSubmitted = async () => {
    await GetUserEstimationForMatch(props.match.id)
}

const isMatchOpenForEstimations = computed(() => {
    if (!props.match.startEstimationAt) return false;
    if (!props.match.endEstimationAt) return false;
    const start = new Date(props.match.startEstimationAt)
    const end = new Date(props.match.endEstimationAt)
    const now = new Date()
    return now >= start && now <= end;
}) </script>

<style scoped></style>
