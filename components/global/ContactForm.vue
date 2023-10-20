<template>
    <form class="flex flex-wrap -m-2" @submit.prevent="handleSubmit">
        <div class="p-2 w-2/3">
            <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-600 dark:text-slate-200">الاسم</label>
                <input type="text" id="name" name="name" v-model="message.name" required
                    class="input input-bordered dark:bg-slate-700  w-full ">
            </div>
        </div>
        <div class="p-2 w-1/3">
            <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-600 dark:text-slate-200">نوع
                    الرسالة</label>
                <select class="select select-bordered rtl:bg-select dark:bg-slate-700  w-full " v-model="message.type">
                    <option v-for="t in messageTypes" :value="t">{{ t }}</option>
                </select>
            </div>
        </div>
        <div class="p-2 w-full">
            <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600 dark:text-slate-200">البريد
                    الاكتروني</label>
                <input type="email" id="email" name="email" v-model="message.email" required
                    class="input input-bordered dark:bg-slate-700   w-full">
            </div>
        </div>
        <div class="p-2 w-full">
            <div class="relative">
                <label for="message" class="leading-7 text-sm  text-gray-600 dark:text-slate-200">الرسالة</label>
                <textarea id="message" name="message" v-model="message.message" required
                    class="textarea textarea-bordered textarea-lg bg-slate-200  w-full dark:bg-slate-700"></textarea>
            </div>
        </div>
        <div class="p-2 w-full">
            <button type="submit" :disabled="pending"
                class="btn flex mx-auto text-white bg-amber-500 border-0 py-2 px-8 focus:outline-none hover:bg-amber-600 rounded text-md">
                <span v-if="pending" class="loading loading-spinner loading-xs"></span>
                ارسال
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
const client = useStrapiClient()

const { $toast } = useNuxtApp();

const messageTypes = ["اقتراح", "نقد", "تحدى"]
const IsToastShown = ref(false)
const pending = ref(false)
const message = ref({
    name: "",
    email: "",
    message: "",
    type: messageTypes[0]
})

const ToastShowDelay = 6;
const handleSubmit = () => {
    pending.value = true
    IsToastShown.value = false
    client("/contact-us-messages/", { method: "post", body: { data: { ...message.value, date: new Date() } } })
        .then(() => {
            message.value = {
                name: "",
                email: "",
                message: "",
                type: "اقتراح"
            }
            $toast.show({
                type: 'success',
                message: 'تم الارسال بنجاح ',
                timeout: ToastShowDelay,

            })
        })
        .catch((err) => {
            $toast.show({
                type: 'danger',
                message: 'تعذر الارسال برجاء المحاولة مرة اخري',
                timeout: ToastShowDelay,

            })
            console.error(err);
        })
        .finally(() => {
            pending.value = false;
        })
}
</script>

<style scoped></style>