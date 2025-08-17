<template>
    <UModal v-model="isLoginFormOpened" prevent-close>
        <UCard>
            <template #header>
                <div class="flex justify-between">
                    <h2>عندك قيدها ؟! سجل دخول بيوزرك </h2>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="handleClose" />
                </div>
            </template>
            <div class="flex justify-center">
                <img src="/images/qydha_logo.png" class="w-20" />
            </div>
            <UForm :schema="usernameSchema" :state="{ username: state.username }" class="space-y-3"
                @submit="onSubmitUsername">
                <UInput :disabled="state.formState !== FormState.waitUsernameInput" dir="ltr" v-model="state.username"
                    type="text" name="username" label="يوزر قيدها" hint="مطلوب" icon="i-heroicons-at-symbol-20-solid"
                    placeholder="username" />

                <span class="text-sm text-gray-500 dark:text-gray-300  flex items-center">
                    <UIcon name="i-heroicons-bell-alert-solid" class="text-xl me-2" />
                    بيوصلك إشعار على قيدها به رمز الدخول
                    <br>
                    ( تأكد من تسجيل الدخول بالتطبيق )
                </span>
                <div v-if="error && state.formState === FormState.waitUsernameInput"
                    class="text-red-500 text-sm flex items-center">
                    <UIcon name="i-heroicons-x-circle" class="text-lg me-1" />
                    <p>{{ error }}</p>
                </div>
                <div class="flex justify-end">
                    <UButton v-if="state.formState === FormState.waitUsernameInput" :loading="pending" type="submit"
                        icon="i-heroicons-paper-airplane-16-solid">ارسال الرمز</UButton>
                </div>
            </UForm>

            <UForm :schema="otpSchema" v-if="state.formState === FormState.waitOtpInput" :state="{ otp: state.otp }"
                class="space-y-3" @submit="onSubmitOtp">

                    <UInput v-model="state.otp" type="text" name="otp" label="رمز الدخول" hint="مطلوب"
                        icon="i-heroicons-key" placeholder="123456" dir="ltr" />

                <div v-if="error && state.formState === FormState.waitOtpInput"
                    class="text-red-500 text-sm flex items-center">
                    <UIcon name="i-heroicons-x-circle" class="text-lg me-1" />
                    <p>{{ error }}</p>
                </div>
                <div class="flex justify-end">
                    <UButton :loading="pending" type="submit" icon="i-heroicons-paper-airplane-16-solid">
                        تسجيل الدخول
                    </UButton>
                </div>
            </UForm>

        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import { object, string } from 'yup'
import { useUserStore } from '~/stores/useUserStore';
const userStore = useUserStore()
const { $api } = useNuxtApp();
const { error, pending, requestOtp, confirmOtp } = $api.auth.useLogin();
const toast = useToast();
const handleClose = () => {
    isLoginFormOpened.value = false
    resetState()
}
const isLoginFormOpened = defineModel<boolean>()
enum FormState {
    waitUsernameInput,
    waitOtpInput,
}

const state = reactive<{ username: string, otp: string, requestId: string, formState: FormState }>({
    username: "",
    otp: "",
    requestId: "",
    formState: FormState.waitUsernameInput
})

const usernameSchema = object({
    username: string().trim().required("هذا الحقل مطلوب").min(3, "يجب ان يكون اسم المستخدم 3 حروف او اكثر برجاء تعديل يوزر قيدها والمحاولة مرة اخرى")
});

const otpSchema = object({
    otp: string().trim().required("هذا الحقل مطلوب").length(6, "برجاء ادخال رمز صحيح"),
})
const onSubmitUsername = async () => {
    let data = await requestOtp(state.username);
    if (!error.value && data) {
        state.requestId = data.RequestId;
        state.formState = FormState.waitOtpInput
    }
}
const onSubmitOtp = async () => {
    let data = await confirmOtp(state.requestId, state.otp);
    if (!error.value && data) {
        resetState();
        // save jwt and data in local storage 
        toast.add({ title: `اهلا بعودتك ${data.user.name ?? data.user.username}` })
        isLoginFormOpened.value = false;
        userStore.loginUser(data.user, data.jwt);
    }
}

const resetState = () => {
    state.formState = FormState.waitUsernameInput;
    state.username = "";
    state.otp = "";
    state.requestId = "";
    error.value = "";
}
</script>

<style scoped></style>