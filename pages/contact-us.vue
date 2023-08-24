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
                    <div class="p-2 w-1/2">
                        <div class="relative">
                            <label for="name" class="leading-7 text-sm text-gray-600">الاسم</label>
                            <input type="text" id="name" name="name" v-model="message.name" required
                                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                        </div>
                    </div>
                    <div class="p-2 w-1/2">
                        <div class="relative">
                            <label for="email" class="leading-7 text-sm text-gray-600">البريد الاكتروني</label>
                            <input type="email" id="email" name="email" v-model="message.email" required
                                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                        </div>
                    </div>
                    <div class="p-2 w-full">
                        <div class="relative">
                            <label for="message" class="leading-7 text-sm text-gray-600">الرسالة</label>
                            <textarea id="message" name="message" v-model="message.message" required
                                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        </div>
                    </div>
                    <div class="p-2 w-full">
                        <button type="submit" :disabled="pending"
                            class="btn flex mx-auto text-white bg-amber-500 border-0 py-2 px-8 focus:outline-none hover:bg-amber-600 rounded text-lg">
                            <span v-if="pending" class="loading loading-spinner loading-xs"></span>
                            ارسال
                        </button>
                    </div>
                    <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                        <a href="mailto:hr@osasyona.com" class="text-amber-500">hr@osasyona.com</a>
                        <p class="leading-normal my-5">شارع رقم 298 ، حي الياسمين
                            <br>الرياض ، المملكة العربية السعودية
                        </p>
                        <span class="inline-flex">
                            <a class="text-gray-500">
                                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    class="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                </svg>
                            </a>
                            <a class="ml-4 text-gray-500">
                                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    class="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
                                    </path>
                                </svg>
                            </a>
                            <a class="ml-4 text-gray-500">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                </svg>
                            </a>
                            <a class="ml-4 text-gray-500">
                                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    class="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                                    </path>
                                </svg>
                            </a>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </section>
    <div class="toast toast-center toast-top transition-all duration-500" :class="IsToastShown ? 'scale-100' : 'scale-0'"
        v-show="IsToastShown">
        <div :class="`alert ${IsMessageSuccess ? 'alert-success' : 'alert-error'}`">
            <template v-if="IsMessageSuccess">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>تم استلام رسالتك بنجاح سنتواصل معك في اقرب فرصة رجاء راقب بريدك
                    الالكتروني.</span>
            </template>
            <template v-else>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>تعذر الارسال برجاء المحاولة مرة اخري</span>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
const client = useStrapiClient()
const IsToastShown = ref(false)
const IsMessageSuccess = ref(false)
const pending = ref(false)
const message = ref({
    name: "",
    email: "",
    message: ""
})
const ToastShowDelay = 4000;
const handleSubmit = () => {
    pending.value = true
    IsToastShown.value = false
    client("/contact-us-messages/", { method: "post", body: { data: { ...message.value, date: new Date() } } })
        .then(() => {
            message.value = {
                name: "",
                email: "",
                message: ""
            }
            IsMessageSuccess.value = true
        })
        .catch((err) => {
            IsMessageSuccess.value = false
            console.error(err);
        })
        .finally(() => {
            IsToastShown.value = true
            setTimeout(() => {
                IsToastShown.value = false
            }, ToastShowDelay)
            pending.value = false;
        })
}
</script>

<style scoped></style>