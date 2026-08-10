<template>
    <UForm
        :schema="schema"
        :state="state"
        class="flex flex-col gap-4"
        dir="rtl"
        @submit="onSubmit"
    >
        <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
           
            <UFormField name="name" size="xl" :ui="formFieldUi">
                <div class="relative pt-3">
                    <span class="pointer-events-none absolute start-3 top-0 z-10 bg-surface-raised px-1 text-base leading-7 text-text-body">
                        الاسم
                    </span>
                    <UInput
                        v-model="state.name"
                        type="text"
                        placeholder="الاسم كامل"
                        icon="i-heroicons-user"
                        size="xl"
                        color="neutral"
                        variant="outline"
                        class="w-full"
                        :ui="inputUi"
                    />
                </div>
            </UFormField>
            <UFormField name="email" size="xl" :ui="formFieldUi">
                <div class="relative pt-3">
                    <span class="pointer-events-none absolute start-3 top-0 z-10 bg-surface-raised px-1 text-base leading-7 text-text-body">
                        البريد الالكترونى
                    </span>
                    <UInput
                        v-model="state.email"
                        type="email"
                        placeholder="example@gmail.com"
                        icon="i-heroicons-envelope"
                        size="xl"
                        color="neutral"
                        variant="outline"
                        class="w-full"
                        dir="ltr"
                        :ui="inputUi"
                    />
                </div>
            </UFormField>

        </div>

        <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
           
            <UFormField name="phone" size="xl" :ui="formFieldUi">
                <div class="relative pt-3">
                    <span class="pointer-events-none absolute start-3 top-0 z-10 bg-surface-raised px-1 text-base leading-7 text-text-body">
                        رقم الجوال
                    </span>
                    <UInput
                        v-model="state.phone"
                        type="text"
                        placeholder="512345678"
                        icon="i-heroicons-phone"
                        size="xl"
                        color="neutral"
                        variant="outline"
                        class="w-full"
                        dir="ltr"
                        :ui="inputUi"
                    />
                </div>
            </UFormField>
            <UFormField name="address" size="xl" :ui="formFieldUi">
                <div class="relative pt-3">
                    <span class="pointer-events-none absolute start-3 top-0 z-10 bg-surface-raised px-1 text-base leading-7 text-text-body">
                        مدينة الاقامة
                    </span>
                    <UInput
                        v-model="state.address"
                        type="text"
                        placeholder="الرياض"
                        icon="i-heroicons-map-pin"
                        size="xl"
                        color="neutral"
                        variant="outline"
                        class="w-full"
                        :ui="inputUi"
                    />
                </div>
            </UFormField>

        </div>

        <UFormField name="aboutMe" size="xl" :ui="formFieldUi">
            <div class="flex flex-col gap-1">
                <span class="text-base leading-7 text-text-body">نبذة عنك</span>
                <UTextarea
                    v-model="state.aboutMe"
                    :rows="5"
                    placeholder="تحدث عن نفسك بايجاز ... "
                    size="xl"
                    color="neutral"
                    variant="outline"
                    class="w-full"
                    :ui="textareaUi"
                />
            </div>
        </UFormField>

        <UFormField name="cv" size="xl" :ui="formFieldUi">
            <div class="flex flex-col gap-1">
                <span class="text-base leading-7 text-text-body">السيرة الذاتية</span>
                <input
                    ref="fileInputRef"
                    type="file"
                    accept="application/pdf"
                    class="hidden"
                    @change="onFileChange"
                >
                <button
                    type="button"
                    class="flex h-[152px] w-full flex-col items-center justify-center gap-2 rounded-lg border border-surface-tone2 bg-surface-overlay px-4 text-base font-semibold leading-7 text-text-caption transition-colors hover:bg-surface-tone"
                    @click="fileInputRef?.click()"
                >
                    <UIcon name="i-heroicons-arrow-up-tray" class="size-8" />
                    <span>{{ state.cv?.name || 'اضغط هنا لاختيار الملف' }}</span>
                </button>
                <button
                    v-if="state.cv"
                    type="button"
                    class="inline-flex h-12 items-center justify-center self-start rounded-full px-4 text-xs font-bold text-text-caption transition-opacity hover:opacity-80"
                    @click="clearCv"
                >
                    حذف
                </button>
            </div>
        </UFormField>

        <div class="flex items-center justify-center gap-4">
            <AppButton
                label="ارسل الان"
                icon="i-heroicons-paper-airplane"
                type="submit"
                size="md"
                label-class="text-white"
                :disabled="sendApplyRequestPending"
            />
            <AppButton
                label="الغاء"
                size="md"
                type="button"
                color-class="text-[#D0D0D0]"
                label-class="text-white"
                icon="i-heroicons-x-mark"
                @click="emit('cancel')"
            />
        </div>
    </UForm>
</template>

<script setup lang="ts">
import { object, string, mixed, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import type { IApplyToJobRequest } from '~/features/jobs/types/IJob'

const { $api } = useNuxtApp()
const toast = useToast()

const props = defineProps({
    jobId: { required: true, type: [Number, null] as PropType<number | null> },
})

const emit = defineEmits(['cancel', 'done'])

const fileInputRef = ref<HTMLInputElement | null>(null)

const fieldRing = 'rounded-lg bg-surface-raised text-base text-text-body ring-1 ring-inset ring-surface-tone2 placeholder:text-text-caption focus-visible:ring-text-body'
const formFieldUi = { container: 'mt-0' }
const inputUi = {
    root: 'w-full',
    base: `h-[68px] ${fieldRing}`,
}
const textareaUi = {
    root: 'w-full',
    base: `min-h-36 ${fieldRing}`,
}

const state = reactive<IApplyToJobRequest>({
    name: '',
    email: '',
    phone: '',
    address: '',
    aboutMe: '',
    cv: null,
})
const { error: errorAtSendApplyRequest, pending: sendApplyRequestPending, send: sendApplyJobRequest } = $api.jobs.useSendApplyRequest()

const saudiArabianPhoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
const MAX_FILE_SIZE = 5 * 1024 * 1024
const validFileTypes = ['application/pdf']
function isValidFileType(fileExt: string) {
    return validFileTypes.indexOf(fileExt) > -1
}
const schema = object({
    email: string().trim().required('هذا الحقل مطلوب').email('يرجي ادخال بريد الكتروني صحيح'),
    phone: string().trim().required('هذا الحقل مطلوب').matches(saudiArabianPhoneNumberRegex, { message: 'يرجي ادخال رقم جوال صحيح', excludeEmptyString: true }),
    name: string().trim().required('هذا الحقل مطلوب').min(2, 'يرجى ادخال اسم صحيح').max(50, 'يجب ان لا يتعدي الاسم الخمسين حرفا'),
    address: string().trim().required('هذا الحقل مطلوب').min(2, 'يرجى ادخال اسم صحيح'),
    cv: mixed()
        .required('هذا الحقل مطلوب')
        .test('is-valid-type', 'يجب ان تكون السيرة الذاتية بصيغة pdf', (value) => {
            const file = value as File
            return isValidFileType(file.type)
        })
        .test('is-valid-size', 'يجب ان تكون السيرة الذاتية اصغر من 5 MB', (value) => {
            const file = value as File
            return file.size <= MAX_FILE_SIZE && file.size > 0
        }),
})
type Schema = InferType<typeof schema>

function onFileChange(event: Event) {
    const input = event.target as HTMLInputElement
    state.cv = input.files?.[0] ?? null
}

function clearCv() {
    state.cv = null
    if (fileInputRef.value)
        fileInputRef.value.value = ''
}

async function onSubmit(_event: FormSubmitEvent<Schema>) {
    await sendApplyJobRequest(state, props.jobId)
    if (errorAtSendApplyRequest.value) {
        toast.add({ title: 'تعذر الارسال برجاء المحاولة مرة اخري' })
        return
    }
    toast.add({ title: 'تم الارسال بنجاح ' })
    emit('done')
}
</script>
