<template>
    <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-10 mx-auto">
            <div class="flex flex-col text-center w-full mb-12">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">تواصل معنا</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
                    عندك لنا اقتراح جديد أو نقد لشئ ما أعجبك أو تبي تتحدانا، ارسلنا رسالة وما يصير خاطرك الا طيب
                </p>
            </div>
            <div class="lg:w-1/2 md:w-2/3 mx-auto">
                <form class="flex flex-wrap -m-2" @submit.prevent="handleSubmit">
                    <div class="p-2 w-2/3">
                        <div class="relative">
                            <label for="name" class="leading-7 text-sm text-gray-600">الاسم</label>
                            <input type="text" id="name" name="name" v-model="message.name" required
                                class="input input-bordered  w-full ">
                        </div>
                    </div>
                    <div class="p-2 w-1/3">
                        <div class="relative">
                            <label for="name" class="leading-7 text-sm text-gray-600">نوع الرسالة</label>
                            <select class="select select-bordered bg-select  w-full " v-model="message.type">
                                <option v-for="t in messageTypes" :value="t">{{ t }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-2 w-full">
                        <div class="relative">
                            <label for="email" class="leading-7 text-sm text-gray-600">البريد الاكتروني</label>
                            <input type="email" id="email" name="email" v-model="message.email" required
                                class="input input-bordered   w-full">
                        </div>
                    </div>
                    <div class="p-2 w-full">
                        <div class="relative">
                            <label for="message" class="leading-7 text-sm text-gray-600">الرسالة</label>
                            <textarea id="message" name="message" v-model="message.message" required
                                class="textarea textarea-bordered textarea-lg w-full"></textarea>
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
                <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                    <a href="mailto:hr@osasyona.com" class="text-amber-500">hr@osasyona.com</a>
                    <p class="leading-normal my-5">شارع رقم 298 ، حي الياسمين
                        <br>الرياض ، المملكة العربية السعودية
                    </p>
                </div>
            </div>
        </div>
    </section>
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
                type: ""
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