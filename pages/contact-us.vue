<template>
    <div class="flex w-full flex-col bg-surface-base">
        <BlogPageHero title="تواصل معنا" />

        <section class="w-full bg-surface-base py-6" aria-label="تواصل معنا" dir="rtl">
            <div class="page-container flex flex-col gap-6 lg:flex-row lg:items-stretch">
                <div class="flex w-full flex-1 flex-col items-start gap-4 lg:gap-6">
                    <img :src="zatLogo" alt="زات" class="h-24 w-auto">
                    <p class="max-w-xl text-right text-xl leading-9 text-text-body">
                        تواصل معنا وكن جزءًا من مجتمع ZAT
                        لديك استفسار أو اقتراح؟ نحن هنا لمساعدتك والإجابة على كل ما يخص البطولات، المحتوى، وتجربة ZAT.
                    </p>
                    <div class="flex flex-wrap items-center justify-end gap-6">
                        <div class="flex items-center gap-2 text-text-subtitle">
                            <img :src="locationIcon" alt="" class="size-7 text-text-caption" aria-hidden="true">
                            <div class="flex flex-col items-end">
                                <span class="text-xs font-semibold leading-6">موقعنا</span>
                                <span class="text-base font-semibold leading-7">الرياض، السعودية</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 text-text-subtitle">
                            <img :src="smsIcon" alt="" class="size-7 text-text-caption" aria-hidden="true">
                            <div class="flex flex-col items-end">
                                <span class="text-xs font-semibold leading-6">بريدنا الالكتروني</span>
                                <ULink
                                    to="mailto:info@zatbaloot.com"
                                    class="text-base font-semibold leading-7 text-text-subtitle hover:text-text-action"
                                >
                                    info@zatbaloot.com
                                </ULink>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="flex w-full flex-col gap-6 rounded-zat-md border border-surface-tone2 bg-surface-raised p-6 lg:w-1/2"
                >
                    <h2 class="text-xl font-bold leading-9 text-text-body">
                        راسلنا الان
                    </h2>

                    <UForm :schema="schema" :state="state" class="flex flex-col gap-6" @submit="onSubmit">
                        <UFormField name="name" size="xl" :ui="formFieldUi">
                            <div class="relative pt-3">
                                <span class="pointer-events-none absolute start-3 top-0 z-10 bg-surface-raised px-1 text-base leading-7 text-text-body">الاسم</span>
                                <UInput
                                    v-model="state.name"
                                    type="text"
                                    placeholder="مثال: احمد مصطفى"
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
                                <span class="pointer-events-none absolute start-3 top-0 z-10 bg-surface-raised px-1 text-base leading-7 text-text-body">بريدك الالكتروني</span>
                                <UInput
                                    v-model="state.email"
                                    type="email"
                                    placeholder="example@gmail.com"
                                    size="xl"
                                    color="neutral"
                                    variant="outline"
                                    class="w-full"
                                    dir="ltr"
                                    :ui="inputUi"
                                />
                            </div>
                        </UFormField>

                        <UFormField name="type" size="xl" :ui="formFieldUi">
                            <div class="relative pt-3">
                                <span class="pointer-events-none absolute start-3 top-0 z-10 bg-surface-raised px-1 text-base leading-7 text-text-body">نوع الرسالة</span>
                                <USelect
                                    v-model="state.type"
                                    :items="MessagesTypes"
                                    size="xl"
                                    color="neutral"
                                    variant="outline"
                                    class="w-full"
                                    :ui="selectUi"
                                />
                            </div>
                        </UFormField>

                        <UFormField name="message" size="xl" :ui="formFieldUi">
                            <div class="relative pt-3">
                                <span class="pointer-events-none absolute start-3 top-0 z-10 bg-surface-raised px-1 text-base leading-7 text-text-body">الرسالة</span>
                                <UTextarea
                                    v-model="state.message"
                                    :rows="5"
                                    placeholder="لا تبخل علينا بحديثك ..."
                                    size="xl"
                                    color="neutral"
                                    variant="outline"
                                    class="w-full"
                                    :ui="textareaUi"
                                />
                            </div>
                        </UFormField>

                        <button
                            type="submit"
                            :disabled="pending"
                            class="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-surface-secondary text-xl font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
                        >
                            <UIcon
                                v-if="pending"
                                name="i-heroicons-arrow-path"
                                class="size-6 animate-spin"
                            />
                            <img
                                v-else
                                :src="sendIcon"
                                alt=""
                                class="size-6"
                                aria-hidden="true"
                            >
                            ارسل الان
                        </button>
                    </UForm>
                </div>

            
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import type { ContactUsMessage } from '~/features/shared/api/contactUsMessagesModule'
import zatLogo from '~/assets/images/contact/zat-logo.svg'
import locationIcon from '~/assets/images/contact/icon-location.svg'
import smsIcon from '~/assets/images/contact/icon-sms.svg'
import sendIcon from '~/assets/images/contact/icon-send.svg'

useHead({
    title: 'زات - تواصل معنا',
    meta: [
        {
            name: 'description',
            content: 'تواصل مع زات - نرحب باقتراحاتكم، استفساراتكم، وآرائكم. نحن هنا للاستماع إليكم وتقديم أفضل تجربة لمجتمع البلوت.',
        },
        {
            property: 'og:title',
            content: 'زات - تواصل معنا',
        },
        {
            property: 'og:description',
            content: 'تواصل مع زات - نرحب باقتراحاتكم، استفساراتكم، وآرائكم. نحن هنا للاستماع إليكم وتقديم أفضل تجربة لمجتمع البلوت.',
        },
    ],
})
useSchemaOrg([
    defineWebPage({
        '@type': 'ContactPage',
        name: 'اتصل بنا ',
        url: 'https://zatbaloot.com/contact',
    }),
])

const { $api } = useNuxtApp()
const router = useRouter()
const toast = useToast()
const MessagesTypes = ['اقتراح', 'تحدي', 'نقد']

const fieldRing = 'rounded-lg bg-surface-raised text-base text-text-body ring-1 ring-inset ring-surface-tone2 placeholder:text-text-caption focus-visible:ring-text-body'

const formFieldUi = {
    container: 'mt-0',
}

const inputUi = {
    root: 'w-full',
    base: `h-[68px] ${fieldRing}`,
}

const selectUi = {
    base: `h-[68px] w-full ${fieldRing}`,
}

const textareaUi = {
    root: 'w-full',
    base: `min-h-36 ${fieldRing}`,
}

const state = reactive<ContactUsMessage>({
    name: '',
    email: '',
    message: '',
    type: 'اقتراح',
})

const schema = object({
    email: string().trim().required('هذا الحقل مطلوب').email('يرجي ادخال بريد الكتروني صحيح'),
    name: string().trim().required('هذا الحقل مطلوب').min(2, 'يرجى ادخال اسم صحيح').max(50, 'يجب ان لا يتعدي الاسم الخمسين حرفا'),
    message: string().trim().required('هذا الحقل مطلوب').min(10, 'يرجى ادخال رسالة').max(512, 'يجب ألا تتعدى الرسالة 512 حرفا'),
    type: string().trim().required('هذا الحقل مطلوب').oneOf(MessagesTypes, 'يجب اختيار نوع الرسالة'),
})

const resetState = () => {
    state.email = ''
    state.name = ''
    state.message = ''
    state.type = 'اقتراح'
}
type Schema = InferType<typeof schema>
const { error, pending, send: sendContactUsMessage } = $api.contactUsMessage.useSendMessage()
async function onSubmit(event: FormSubmitEvent<Schema>) {
    await sendContactUsMessage(event.data)
    if (error.value === null) {
        resetState()
        toast.add({ title: 'تم الارسال بنجاح ' })
        router.push('/')
    }
    else {
        toast.add({ title: error.value })
    }
}
</script>
