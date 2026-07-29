<template>
    <UModal
        v-model:open="isLoginFormOpened"
        title="عندك قيدها ؟! سجل دخول بيوزرك"
        :dismissible="false"
        scrollable
        :close="{
            color: 'neutral',
            variant: 'ghost',
            icon: 'i-heroicons-x-mark-20-solid',
            onClick: handleClose,
        }"
        @update:open="onOpenChange"
    >
        <template #body>
            <div class="flex justify-center">
                <img src="/images/qydha_logo.png" class="w-20" alt="قيدها" />
            </div>

            <UForm
                :schema="usernameSchema"
                :state="{ username: state.username }"
                class="mb-4 space-y-3"
                @submit="onSubmitUsername"
            >
                <UInput
                    v-model="state.username"
                    :disabled="state.formState !== FormState.waitUsernameInput"
                    dir="ltr"
                    type="text"
                    name="username"
                    label="يوزر قيدها"
                    hint="مطلوب"
                    icon="i-heroicons-at-symbol-20-solid"
                    placeholder="username"
                />

                <span class="flex items-center text-sm text-gray-500 dark:text-gray-300">
                    <UIcon name="i-heroicons-bell-alert-solid" class="me-2 text-xl" />
                    بيوصلك إشعار على قيدها به رمز الدخول
                    <br>
                    ( تأكد من تسجيل الدخول بالتطبيق )
                </span>

                <div
                    v-if="error && state.formState === FormState.waitUsernameInput"
                    class="flex items-center text-sm text-red-500"
                >
                    <UIcon name="i-heroicons-x-circle" class="me-1 text-lg" />
                    <p>{{ error }}</p>
                </div>

                <div class="flex justify-end">
                    <UButton
                        v-if="state.formState === FormState.waitUsernameInput"
                        :loading="pending"
                        type="submit"
                        icon="i-heroicons-paper-airplane-16-solid"
                    >
                        ارسال الرمز
                    </UButton>
                </div>

                <div class="flex flex-col items-center justify-center space-y-2">
                    <UButton
                        v-if="state.formState === FormState.waitOtpInput"
                        :disabled="ResendDisabled"
                        type="button"
                        icon="i-heroicons-arrow-path-rounded-square"
                        @click="onSubmitUsername"
                    >
                        إعادة الارسال
                    </UButton>
                    <div v-if="state.formState === FormState.waitOtpInput && countdown > 0">
                        {{ formatTimeFroms(countdown) }}
                    </div>
                </div>
            </UForm>

            <UForm
                v-if="state.formState === FormState.waitOtpInput"
                :schema="otpSchema"
                :state="{ otp: state.otp }"
                class="space-y-3"
                @submit="onSubmitOtp"
            >
                <UInput
                    v-model="state.otp"
                    type="text"
                    name="otp"
                    label="رمز الدخول"
                    hint="مطلوب"
                    icon="i-heroicons-key"
                    placeholder="123456"
                    dir="ltr"
                />

                <div
                    v-if="error && state.formState === FormState.waitOtpInput"
                    class="flex items-center text-sm text-red-500"
                >
                    <UIcon name="i-heroicons-x-circle" class="me-1 text-lg" />
                    <p>{{ error }}</p>
                </div>

                <div class="flex justify-end">
                    <UButton
                        :loading="pending"
                        type="submit"
                        icon="i-heroicons-paper-airplane-16-solid"
                    >
                        تسجيل الدخول
                    </UButton>
                </div>
            </UForm>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import { object, string } from 'yup'
import { useUserStore } from '~/stores/useUserStore'

const userStore = useUserStore()
const { $api } = useNuxtApp()

const timeToWait = 60 * 5
const countdown = ref(0)
const ResendDisabled = ref(true)
let timer: ReturnType<typeof setInterval> | null = null

const StartCountDown = (secounds: number) => {
    countdown.value = secounds
    ResendDisabled.value = true
    timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
            ResendDisabled.value = false
            if (timer) clearInterval(timer)
        }
    }, 1000)
}

function formatTimeFroms(secounds: number) {
    const date = new Date(secounds * 1000)
    const m = date.getUTCMinutes()
    const s = date.getUTCSeconds()
    return `${m}:${s.toString().padStart(2, '0')}`
}

onUnmounted(() => {
    if (timer) clearInterval(timer)
})

const { error, pending, requestOtp, confirmOtp } = $api.auth.useLogin()
const toast = useToast()
const isLoginFormOpened = defineModel<boolean>({ default: false })

enum FormState {
    waitUsernameInput,
    waitOtpInput,
}

const state = reactive<{ username: string, otp: string, requestId: string, formState: FormState }>({
    username: '',
    otp: '',
    requestId: '',
    formState: FormState.waitUsernameInput,
})

const usernameSchema = object({
    username: string().trim().required('هذا الحقل مطلوب').min(3, 'يجب ان يكون اسم المستخدم 3 حروف او اكثر برجاء تعديل يوزر قيدها والمحاولة مرة اخرى'),
})

const otpSchema = object({
    otp: string().trim().required('هذا الحقل مطلوب').length(6, 'برجاء ادخال رمز صحيح'),
})

function onOpenChange(open: boolean) {
    if (!open) resetState()
}

function handleClose() {
    isLoginFormOpened.value = false
}

const onSubmitUsername = async () => {
    const data = await requestOtp(state.username)
    if (!error.value && data) {
        state.requestId = data.RequestId
        state.formState = FormState.waitOtpInput
        StartCountDown(timeToWait)
    }
}

const onSubmitOtp = async () => {
    const data = await confirmOtp(state.requestId, state.otp)
    if (!error.value && data) {
        resetState()
        toast.add({ title: `اهلا بعودتك ${data.user.name ?? data.user.username}` })
        isLoginFormOpened.value = false
        userStore.loginUser(data.user, data.jwt)
    }
}

const resetState = () => {
    state.formState = FormState.waitUsernameInput
    state.username = ''
    state.otp = ''
    state.requestId = ''
    error.value = ''
}
</script>
