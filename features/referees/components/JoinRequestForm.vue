<template>
    <UForm
        :schema="schema"
        :state="state"
        class="flex flex-col gap-4"
        dir="rtl"
        @submit="onSubmit"
    >
        <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
            <UFormField
                name="name"
                size="xl"
                :ui="formFieldUi"
            >
                <div class="relative pt-3">
                    <span class="pointer-events-none absolute start-3 top-0 z-10 bg-surface-raised px-1 text-base leading-7 text-text-body">
                        الاسم
                    </span>
                    <UInput
                        v-model="state.name"
                        type="text"
                        placeholder="الاسم"
                        icon="i-heroicons-user"
                        size="xl"
                        color="neutral"
                        variant="outline"
                        class="w-full"
                        :ui="inputUi"
                    />
                </div>
            </UFormField>

            <UFormField
                name="email"
                size="xl"
                :ui="formFieldUi"
            >
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

            <UFormField
                name="phone"
                size="xl"
                :ui="formFieldUi"
            >
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

            <UFormField
                name="address"
                size="xl"
                :ui="formFieldUi"
            >
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

            <UFormField
                name="birthDate"
                size="xl"
                :ui="formFieldUi"
            >
                <div class="relative pt-3">
                    <span class="pointer-events-none absolute start-3 top-0 z-10 bg-surface-raised px-1 text-base leading-7 text-text-body">
                        تاريخ الميلاد
                    </span>
                    <UInput
                        v-model="state.birthDate"
                        type="date"
                        size="xl"
                        color="neutral"
                        variant="outline"
                        class="w-full"
                        :ui="inputUi"
                    />
                </div>
            </UFormField>

            <UFormField
                name="experience"
                size="xl"
                :ui="formFieldUi"
            >
                <div class="relative pt-3">
                    <span class="pointer-events-none absolute start-3 top-0 z-10 bg-surface-raised px-1 text-base leading-7 text-text-body">
                        سنوات الخبرة بالبلوت
                    </span>
                    <UInput
                        v-model="state.experience"
                        type="number"
                        placeholder="0"
                        icon="i-heroicons-academic-cap"
                        size="xl"
                        color="neutral"
                        variant="outline"
                        class="w-full"
                        :ui="inputUi"
                    />
                </div>
            </UFormField>
        </div>

        <UFormField
            name="IsJudgedBefore"
            size="xl"
            :ui="formFieldUi"
        >
            <URadioGroup
                v-model="state.IsJudgedBefore"
                legend="هل سبق لك التحكيم سابقا ؟"
                orientation="horizontal"
                variant="list"
                color="neutral"
                :items="judgedBeforeItems"
            />
        </UFormField>

        <div class="flex items-center justify-center gap-4">
            <AppButton
                label="ارسال"
                icon="i-heroicons-paper-airplane"
                type="submit"
                size="md"
                :disabled="pending"
            />
            <AppButton
                label="الغاء"
                size="md"
                type="button"
                color-class="text-[#D0D0D0]"
                icon="i-heroicons-x-mark"
                :disabled="pending"
                @click="emit('cancel')"
            />
        </div>
    </UForm>
</template>

<script setup lang="ts">
import { object, string, number, date, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import type { IJoinAsRefereeRequest } from '~/features/referees/types/IReferee'

const { $api } = useNuxtApp()
const toast = useToast()
const emit = defineEmits<{
    cancel: []
    done: []
}>()

const fieldRing = 'rounded-lg bg-surface-raised text-base text-text-body ring-1 ring-inset ring-surface-tone2 placeholder:text-text-caption focus-visible:ring-text-body'
const formFieldUi = { container: 'mt-0' }
const inputUi = {
    root: 'w-full',
    base: `h-[68px] ${fieldRing}`,
}

const saudiArabianPhoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
const currentDate = new Date()
const maxBirthDate = new Date(currentDate.getFullYear() - 5, currentDate.getMonth(), currentDate.getDate())
const minBirthDate = new Date(currentDate.getFullYear() - 105, currentDate.getMonth(), currentDate.getDate())

const judgedBeforeItems = [
    { label: 'نعم', value: 'yes' },
    { label: 'لا', value: 'no' },
]

const state = reactive<IJoinAsRefereeRequest>({
    name: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    experience: 0,
    IsJudgedBefore: 'no',
})

const schema = object({
    email: string().trim().required('هذا الحقل مطلوب').email('يرجي ادخال بريد الكتروني صحيح'),
    phone: string().trim().required('هذا الحقل مطلوب').matches(saudiArabianPhoneNumberRegex, { message: 'يرجي ادخال رقم جوال صحيح', excludeEmptyString: true }),
    name: string().trim().required('هذا الحقل مطلوب').min(2, 'يرجى ادخال اسم صحيح').max(50, 'يجب ان لا يتعدي الاسم الخمسين حرفا'),
    address: string().trim().required('هذا الحقل مطلوب').min(2, 'يرجى ادخال اسم صحيح'),
    experience: number().required('هذا الحقل مطلوب').min(0, 'يرجي ادخال عدد سنوات صحيح').max(30, 'يرجي ادخال عدد سنوات صحيح'),
    IsJudgedBefore: string().required('هذا الحقل مطلوب').oneOf(judgedBeforeItems.map(item => item.value)),
    birthDate: date()
        .required('هذا الحقل مطلوب')
        .typeError('برجاء ادخال تاريخ ميلاد صحيح')
        .max(maxBirthDate, 'يجب ان يكون عمرك اكبر من 5 سنوات')
        .min(minBirthDate, 'يجب ان يكون عمرك اصغر من 100 سنة'),
})
type Schema = InferType<typeof schema>

const { pending, error, send: sendJoinAsRefereeRequest } = $api.referees.useSendJoinRequest()

async function onSubmit(_event: FormSubmitEvent<Schema>) {
    await sendJoinAsRefereeRequest(state)
    if (error.value) {
        toast.add({ title: 'تعذر الارسال برجاء المحاولة مرة اخري' })
        return
    }
    toast.add({ title: 'تم الارسال بنجاح ' })
    emit('done')
}
</script>
