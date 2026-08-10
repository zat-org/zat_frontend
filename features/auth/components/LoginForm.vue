<template>
    <UModal
        :open="isLoginFormOpened"
        title="عندك قيدها ؟! سجل دخول بيوزرك"
        :dismissible="false"
        :close="{
            color: 'neutral',
            variant: 'ghost',
            onClick: handleClose,
        }"
        :ui="{
            content: 'sm:max-w-md',
            footer: 'justify-end gap-2',
        }"
        @update:open="onOpenChange"
    >
        <template #body>
            <div class="mb-4 flex justify-center">
                <img
                    src="/images/qydha_logo.png"
                    alt="قيدها"
                    class="w-20"
                >
            </div>

            <UForm
                id="login-username-form"
                :schema="usernameSchema"
                :state="{ username: state.username }"
                class="space-y-4"
                @submit="onSubmitUsername"
            >
                <UFormField
                    name="username"
                    label="يوزر قيدها"
                    hint="مطلوب"
                >
                    <UInput
                        v-model="state.username"
                        :disabled="state.formState !== FormState.waitUsernameInput"
                        dir="ltr"
                        type="text"
                        name="username"
                        icon="i-heroicons-at-symbol-20-solid"
                        placeholder="username"
                        class="w-full"
                    />
                </UFormField>

                <p class="flex items-start gap-2 text-sm text-muted">
                    <UIcon name="i-heroicons-bell-alert-solid" class="mt-0.5 size-5 shrink-0" />
                    <span>
                        بيوصلك إشعار على قيدها به رمز الدخول
                        <br>
                        ( تأكد من تسجيل الدخول بالتطبيق )
                    </span>
                </p>

                <p
                    v-if="error && state.formState === FormState.waitUsernameInput"
                    class="flex items-center text-sm text-red-500"
                >
                    <UIcon name="i-heroicons-x-circle" class="me-1 size-5" />
                    {{ error }}
                </p>

                <div
                    v-if="state.formState === FormState.waitOtpInput"
                    class="flex flex-col items-center gap-2"
                >
                    <UButton
                        type="button"
                        color="neutral"
                        variant="outline"
                        icon="i-heroicons-arrow-path-rounded-square"
                        :disabled="ResendDisabled"
                        :loading="pending"
                        @click="onSubmitUsername"
                    >
                        إعادة الارسال
                    </UButton>
                    <p
                        v-if="countdown > 0"
                        class="font-numbers text-sm text-muted"
                    >
                        {{ formatTimeFroms(countdown) }}
                    </p>
                </div>
            </UForm>

            <UForm
                v-if="state.formState === FormState.waitOtpInput"
                id="login-otp-form"
                :schema="otpSchema"
                :state="{ otp: state.otp }"
                class="mt-4 space-y-4"
                @submit="onSubmitOtp"
            >
                <UFormField
                    name="otp"
                    label="رمز الدخول"
                    hint="مطلوب"
                >
                    <UInput
                        v-model="state.otp"
                        dir="ltr"
                        type="text"
                        name="otp"
                        icon="i-heroicons-key"
                        placeholder="123456"
                        class="w-full"
                    />
                </UFormField>

                <p
                    v-if="error && state.formState === FormState.waitOtpInput"
                    class="flex items-center text-sm text-red-500"
                >
                    <UIcon name="i-heroicons-x-circle" class="me-1 size-5" />
                    {{ error }}
                </p>
            </UForm>
        </template>

        <template #footer>
            <UButton
                color="neutral"
                variant="outline"
                @click="handleClose"
            >
                الغاء
            </UButton>

            <UButton
                v-if="state.formState === FormState.waitUsernameInput"
                type="submit"
                form="login-username-form"
                icon="i-heroicons-paper-airplane-16-solid"
                :loading="pending"
            >
                ارسال الرمز
            </UButton>

            <UButton
                v-else
                type="submit"
                form="login-otp-form"
                icon="i-heroicons-paper-airplane-16-solid"
                :loading="pending"
            >
                تسجيل الدخول
            </UButton>
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

function StartCountDown(secounds: number) {
    if (timer) clearInterval(timer)
    countdown.value = secounds
    ResendDisabled.value = true
    timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
            ResendDisabled.value = false
            if (timer) clearInterval(timer)
            timer = null
        }
    }, 1000)
}

function formatTimeFroms(secounds: number) {
    const date = new Date(secounds * 1000)
    const m = date.getUTCMinutes()
    const s = date.getUTCSeconds()
    return `${m}:${s.toString().padStart(2, '0')}`
}

const { error, pending, requestOtp, confirmOtp } = $api.auth.useLogin()
const toast = useToast()
const isLoginFormOpened = defineModel<boolean>({ default: false })
const allowDismiss = ref(true)
let dismissTimer: ReturnType<typeof setTimeout> | null = null

watch(isLoginFormOpened, (open) => {
    if (!open) {
        allowDismiss.value = true
        return
    }
    allowDismiss.value = false
    if (dismissTimer) {
        clearTimeout(dismissTimer)
    }
    dismissTimer = setTimeout(() => {
        allowDismiss.value = true
        dismissTimer = null
    }, 400)
})

onUnmounted(() => {
    if (timer) clearInterval(timer)
    if (dismissTimer) clearTimeout(dismissTimer)
})

enum FormState {
    waitUsernameInput,
    waitOtpInput,
}

const state = reactive<{
    username: string
    otp: string
    requestId: string
    formState: FormState
}>({
    username: '',
    otp: '',
    requestId: '',
    formState: FormState.waitUsernameInput,
})

const usernameSchema = object({
    username: string()
        .trim()
        .required('هذا الحقل مطلوب')
        .min(3, 'يجب ان يكون اسم المستخدم 3 حروف او اكثر برجاء تعديل يوزر قيدها والمحاولة مرة اخرى'),
})

const otpSchema = object({
    otp: string().trim().required('هذا الحقل مطلوب').length(6, 'برجاء ادخال رمز صحيح'),
})

function handleClose() {
    allowDismiss.value = true
    isLoginFormOpened.value = false
    resetState()
}

function onOpenChange(open: boolean) {
    if (!open && !allowDismiss.value) {
        return
    }
    isLoginFormOpened.value = open
    if (!open) {
        resetState()
    }
}

async function onSubmitUsername() {
    const data = await requestOtp(state.username)
    if (!error.value && data) {
        state.requestId = data.RequestId
        state.formState = FormState.waitOtpInput
        StartCountDown(timeToWait)
    }
}

async function onSubmitOtp() {
    const data = await confirmOtp(state.requestId, state.otp)
    if (!error.value && data) {
        resetState()
        toast.add({ title: `اهلا بعودتك ${data.user.name ?? data.user.username}` })
        allowDismiss.value = true
        isLoginFormOpened.value = false
        userStore.loginUser(data.user, data.jwt)
    }
}

function resetState() {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
    countdown.value = 0
    ResendDisabled.value = true
    state.formState = FormState.waitUsernameInput
    state.username = ''
    state.otp = ''
    state.requestId = ''
    error.value = ''
}
</script>
