<template>
    <FetchDataWraper :error="error" :pending="pending">
        <template #main>
            <div class="divider text-2xl font-semibold py-5 px-10  ">
                <Icon name="fluent-emoji:balance-scale" class="text-9xl" /> حكام زات
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-3"
                v-if="referees && referees.length > 0">
                <referee v-for="referee in referees" :key="referee.id" v-bind:referee="referee" />
            </div>
            <div v-else
                class="text-zinc-700 dark:text-slate-50 text-lg h-50 flex flex-col justify-center items-center py-10">
                <Icon name="line-md:alert-circle" class="block text-9xl" />
                <h3>لا يوجد حكام حاليا</h3>
            </div>
        </template>
    </FetchDataWraper>
</template>

<script setup lang="ts">
import type { IReferee } from '@/Models/IReferee';
const client = useStrapiClient()
const referees = ref<IReferee[] | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)

const fetchData = () => {
    pending.value = true
    return client(`/referees`, { method: 'GET' })
        .then((data: any) => {
            referees.value = data.referees
            pending.value = false
            useHead({
                title: `حكام زات`,
            })
        }).catch((err) => {
            console.error(err)
            error.value = "تعذر تحميل البيانات."
            pending.value = false
        })
}
onServerPrefetch(fetchData)
onBeforeMount(fetchData)
</script>

<style scoped></style>