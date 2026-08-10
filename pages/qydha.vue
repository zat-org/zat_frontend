<template>
    <div class="flex w-full flex-col bg-surface-base">
        <section
            class="w-full bg-surface-secondary bg-repeat py-4 sm:py-6"
            :style="{ backgroundImage: `url(${darkHeroPattern})` }"
            aria-label="قيدها"
        >
            <div class="page-container flex justify-center">
                <h1 class="text-center font-zaatar text-3xl leading-normal text-white sm:text-4xl lg:text-[48px]">
                    قيدها
                </h1>
            </div>
        </section>

        <section
            class="w-full bg-poker-pattern bg-surface-off-base "
            aria-label="تسجيل الدخول بقيدها"
            dir="rtl"
        >
            <div class="page-container pb-0">
                <div class="flex flex-col items-center gap-4 bg-surface-raised ">
                    <img :src="qydhaLogo" alt="قيدها" class="h-[88px] w-auto">

                    <div class="flex w-full flex-col items-center gap-2 text-center">
                        <h2 class="text-3xl font-bold leading-14 text-text-heading sm:text-[40px] sm:leading-16">
                            حاسبة تفهمك
                        </h2>
                        <p class="text-base font-semibold leading-7 text-text-subtitle">
                            سجّل دخولك بحساب قيدها على منصة زات واستمتع بمزايا رهيبة!
                        </p>
                    </div>

                    <div
                        v-if="userStore.isAuthenticated && userStore.user"
                        class="flex w-full max-w-xl flex-col items-center gap-2 text-center"
                    >
                        <p class="text-base font-bold leading-7 text-text-heading">
                            اهلا {{ userStore.user.name || userStore.user.username }}
                        </p>
                        <p class="text-sm text-text-subtitle">
                            يوزر قيدها: {{ userStore.user.username }}@
                        </p>
                    </div>

                    <div
                        v-else
                        class="flex w-full max-w-xl flex-col items-center gap-4"
                    >
                        <UForm
                            v-if="formState === 'username'"
                            :schema="usernameSchema"
                            :state="{ username: state.username }"
                            class="flex w-full flex-col gap-4"
                            @submit="onSubmitUsername"
                        >
                            <UFormField name="username" size="xl" :ui="{ container: 'mt-0' }">
                                <div class="relative pt-3">
                                    <span class="pointer-events-none absolute start-3 top-0 z-10 bg-surface-raised px-1 text-base leading-7 text-text-body">
                                        سجل باسم المستخدم في تطبيق قيدها
                                    </span>
                                    <UInput
                                        v-model="state.username"
                                        type="text"
                                        placeholder="@username"
                                        icon="zat:profile"
                                        size="xl"
                                        color="neutral"
                                        variant="outline"
                                        dir="ltr"
                                        class="w-full"
                                        :ui="inputUi"
                                        :disabled="pending"
                                    >
                                        <template #trailing>
                                            <UButton
                                                type="submit"
                                                color="neutral"
                                                variant="ghost"
                                                square
                                                :loading="pending"
                                                aria-label="ارسال"
                                            >
                                                <UIcon name="i-heroicons-paper-airplane" class="size-5 text-text-caption" />
                                            </UButton>
                                        </template>
                                    </UInput>
                                </div>
                            </UFormField>

                            <p v-if="error" class="flex items-center text-sm text-zat-500">
                                <UIcon name="i-heroicons-x-circle" class="me-1 size-5" />
                                {{ error }}
                            </p>

                            <div class="flex w-full flex-col items-center gap-2">
                                <AppButton
                                    label="سجل الدخول الان"
                                    variant="secondary"
                                    size="sm"
                                    type="submit"
                                    :disabled="pending"
                                />
                                <NuxtLink
                                    to="#download-qydha"
                                    class="text-xs font-bold leading-6 text-zat-500 underline"
                                >
                                    لا يوجد لديك حساب؟ انشأ الان
                                </NuxtLink>
                            </div>
                        </UForm>

                        <UForm
                            v-else
                            :schema="otpSchema"
                            :state="{ otp: state.otp }"
                            class="flex w-full flex-col gap-4"
                            @submit="onSubmitOtp"
                        >
                            <UFormField name="otp" size="xl" :ui="{ container: 'mt-0' }">
                                <div class="relative pt-3">
                                    <span class="pointer-events-none absolute start-3 top-0 z-10 bg-surface-raised px-1 text-base leading-7 text-text-body">
                                        رمز الدخول
                                    </span>
                                    <UInput
                                        v-model="state.otp"
                                        type="text"
                                        placeholder="123456"
                                        icon="i-heroicons-key"
                                        size="xl"
                                        color="neutral"
                                        variant="outline"
                                        dir="ltr"
                                        class="w-full"
                                        :ui="inputUi"
                                        :disabled="pending"
                                    />
                                </div>
                            </UFormField>

                            <p class="text-center text-sm text-text-subtitle">
                                بيوصلك إشعار على قيدها به رمز الدخول
                            </p>

                            <p v-if="error" class="flex items-center text-sm text-zat-500">
                                <UIcon name="i-heroicons-x-circle" class="me-1 size-5" />
                                {{ error }}
                            </p>

                            <div class="flex w-full flex-col items-center gap-2">
                                <AppButton
                                    label="تسجيل الدخول"
                                    variant="secondary"
                                    size="sm"
                                    type="submit"
                                    :disabled="pending"
                                />
                                <UButton
                                    type="button"
                                    color="neutral"
                                    variant="ghost"
                                    :disabled="resendDisabled"
                                    :loading="pending"
                                    @click="onSubmitUsername"
                                >
                                    إعادة الارسال
                                </UButton>
                                <p v-if="countdown > 0" class="font-numbers text-sm text-text-caption">
                                    {{ formatTime(countdown) }}
                                </p>
                            </div>
                        </UForm>
                    </div>
                </div>
            </div>
        </section>

        <section
            id="download-qydha"
            class=" page-container bg-poker-pattern bg-surface-off-base"
            aria-label="حمل تطبيق قيدها"
            dir="rtl"
        >
            <img
                :src="qydhaBanner"
                alt="من تسجيل اللاعبين إلى آخر صكة بالبطولة"
                class="h-48 w-full object-cover sm:h-56"
            >

            <div class=" ">
                <div class="flex flex-col items-center gap-4 bg-surface-raised">
                    <div class="flex w-full flex-col items-center gap-2 text-center">
                        <p class="text-xl font-bold leading-10 text-text-caption">
                            كل شيء تحتاجه للبلوت.. في مكان واحد
                        </p>
                        <h2 class="text-2xl font-bold leading-12 text-text-heading sm:text-3xl sm:leading-14">
                            يلا حمل قيدها بسرعة وعيش التحدي!
                        </h2>
                        <p class="text-xl font-semibold leading-9 text-text-subtitle">
                            احسب النقاط، تابع الجولات، ونظّم البطولات بسهولة مع قيدها.
                        </p>
                    </div>

                    <div class="flex flex-wrap items-center justify-center gap-4">
                        <AppButton
                            label="Google Play"
                            icon="zat:google-play"
                            variant="secondary"
                            size="sm"
                            :href="GOOGLE_PLAY_URL"
                        />
                        <AppButton
                            label="App Store"
                            icon="zat:apple"
                            variant="secondary"
                            size="sm"
                            :href="APP_STORE_URL"
                        />
                    </div>

                    <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
                        <div
                            v-for="stat in stats"
                            :key="stat.label"
                            class="flex min-w-24 flex-col items-center"
                        >
                            <p class="text-2xl font-bold leading-12 text-zat-500">
                                {{ stat.value }}
                            </p>
                            <p class="text-base font-bold leading-7 text-text-subtitle">
                                {{ stat.label }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { object, string } from 'yup'
import darkHeroPattern from '~/assets/images/shared/dark-hero-pattern.png'
import qydhaLogo from '~/assets/images/qydha/logo.svg'
import qydhaBanner from '~/assets/images/qydha/banner.png'
import { useUserStore } from '~/stores/useUserStore'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.qydha'
const APP_STORE_URL = 'https://apps.apple.com/in/app/qydha/id6446068415'

const stats = [
    { value: '4.8', label: 'تقييم' },
    { value: '+27K', label: 'مستخدم' },
    { value: '+100k', label: 'تنزيلات' },
]

const userStore = useUserStore()
const { $api } = useNuxtApp()
const toast = useToast()
const { error, pending, requestOtp, confirmOtp } = $api.auth.useLogin()

const fieldRing = 'rounded-lg bg-surface-raised text-base text-text-body ring-1 ring-inset ring-surface-tone2 placeholder:text-text-caption focus-visible:ring-text-body'
const inputUi = {
    root: 'w-full',
    base: `h-[68px] ${fieldRing}`,
}

const state = reactive({
    username: '',
    otp: '',
    requestId: '',
})

const formState = ref<'username' | 'otp'>('username')
const countdown = ref(0)
const resendDisabled = ref(true)
let timer: ReturnType<typeof setInterval> | null = null

const usernameSchema = object({
    username: string()
        .trim()
        .required('هذا الحقل مطلوب')
        .min(3, 'يجب ان يكون اسم المستخدم 3 حروف او اكثر برجاء تعديل يوزر قيدها والمحاولة مرة اخرى'),
})

const otpSchema = object({
    otp: string().trim().required('هذا الحقل مطلوب').length(6, 'برجاء ادخال رمز صحيح'),
})

function formatTime(seconds: number) {
    const date = new Date(seconds * 1000)
    return `${date.getUTCMinutes()}:${date.getUTCSeconds().toString().padStart(2, '0')}`
}

function startCountdown(seconds: number) {
    if (timer)
        clearInterval(timer)
    countdown.value = seconds
    resendDisabled.value = true
    timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
            resendDisabled.value = false
            if (timer)
                clearInterval(timer)
            timer = null
        }
    }, 1000)
}

async function onSubmitUsername() {
    const data = await requestOtp(state.username)
    if (!error.value && data) {
        state.requestId = data.RequestId
        formState.value = 'otp'
        startCountdown(60 * 5)
    }
}

async function onSubmitOtp() {
    const data = await confirmOtp(state.requestId, state.otp)
    if (!error.value && data) {
        toast.add({ title: `اهلا بعودتك ${data.user.name ?? data.user.username}` })
        userStore.loginUser(data.user, data.jwt)
        formState.value = 'username'
        state.username = ''
        state.otp = ''
        state.requestId = ''
    }
}

onUnmounted(() => {
    if (timer)
        clearInterval(timer)
})

useHead({
    title: 'قيدها - زات',
    meta: [
        { name: 'description', content: 'سجّل دخولك بحساب قيدها على منصة زات. احسب النقاط، تابع الجولات، ونظّم البطولات بسهولة.' },
        { property: 'og:title', content: 'قيدها - زات' },
        { property: 'og:description', content: 'سجّل دخولك بحساب قيدها على منصة زات. احسب النقاط، تابع الجولات، ونظّم البطولات بسهولة.' },
    ],
})
</script>
