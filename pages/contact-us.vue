<template>
    <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-10 mx-auto dark:text-slate-50  text-gray-900 ">
            <div class="flex flex-col text-center w-full mb-12">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 flex justify-center items-center">
                    <UIcon name="i-heroicons-chat-bubble-left-right" class=" me-2 text-amber-500 text-4xl" />
                    تواصل معنا
                </h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
                    عندك لنا اقتراح جديد أو نقد لشئ ما أعجبك أو تبي تتحدانا، ارسلنا رسالة وما يصير خاطرك الا طيب
                </p>
            </div>
            <div class="lg:w-1/2 md:w-2/3 mx-auto">
                <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                    <div class="flex flex-col items-center">
                        <UFormGroup name="name" label="الاسم" hint="مطلوب" size="xl">
                            <UInput v-model="state.name" type="text" icon="i-heroicons-user" placeholder="الاسم" />
                        </UFormGroup>

                        <UFormGroup dir="ltr" name="email" label="البريد الالكترونى" hint="مطلوب" size="xl">
                            <UInput v-model="state.email" type="email" icon="i-heroicons-envelope"
                                placeholder="example@gmail.com" />
                        </UFormGroup>

                        <FormTextArea v-model="state.message" name="message" label="الرسالة" hint="مطلوب"
                            placeholder="لا تبخل علينا بحديثك ..." />

                        <FormSelectField v-model="state.type" :options="MessagesTypes" name="type" hint="مطلوب"
                            label="نوع الرسالة" />
                    </div>
                    <div class="flex justify-center items-center">
                        <UButton type="submit" :loading="pending" block color="amber" icon="i-heroicons-paper-airplane"
                            class="flex justify-center text-md shadow-md border-0  px-5 w-1/4">
                            ارسال
                        </UButton>
                    </div>
                </UForm>
                <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                    <ULink to="mailto:zat@osasyona.com" class="text-amber-500">zat@osasyona.com</ULink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import type { ContactUsMessage } from '~/Repository/modules/contactUsMessagesModule';

useHead({
    title: 'زات - تواصل معنا',
    meta: [
        {
            name: 'description',
            content: 'تواصل مع زات - نرحب باقتراحاتكم، استفساراتكم، وآرائكم. نحن هنا للاستماع إليكم وتقديم أفضل تجربة لمجتمع البلوت.'
        },
        {
            property: 'og:title',
            content: 'زات - تواصل معنا'
        },
        {
            property: 'og:description',
            content: 'تواصل مع زات - نرحب باقتراحاتكم، استفساراتكم، وآرائكم. نحن هنا للاستماع إليكم وتقديم أفضل تجربة لمجتمع البلوت.'
        }
    ]
})
useSchemaOrg([
    defineWebPage({
        '@type': "ContactPage",
        name: 'اتصل بنا ',
        url: "https://zatbaloot.com/contact"
    })
])

const { $api } = useNuxtApp();
const router = useRouter();
const toast = useToast();
const MessagesTypes = ["اقتراح", "تحدي", "نقد"]


const state = reactive<ContactUsMessage>({
    name: "",
    email: "",
    message: "",
    type: MessagesTypes[0]
})

const schema = object({
    email: string().trim().required("هذا الحقل مطلوب").email("يرجي ادخال بريد الكتروني صحيح"),
    name: string().trim().required("هذا الحقل مطلوب").min(2, "يرجى ادخال اسم صحيح").max(50, "يجب ان لا يتعدي الاسم الخمسين حرفا"),
    message: string().trim().required("هذا الحقل مطلوب").min(10, "يرجى ادخال رسالة").max(512, "يجب ان لا يتعدي الاسم الخمسين حرفا"),
    type: string().trim().required("هذا الحقل مطلوب").test("MessageTypesValidation", "يجب اختيار نوع الرسالة", val => MessagesTypes.indexOf(val) !== -1),
})

const resetState = () => {
    state.email = "";
    state.name = "";
    state.message = "";
    state.type = MessagesTypes[0];
}
type Schema = InferType<typeof schema>
const { error, pending, send: sendContactUsMessage } = $api.contactUsMessage.useSendMessage();
async function onSubmit(event: FormSubmitEvent<Schema>) {
    let res = await sendContactUsMessage(event.data);
    if (error.value === null) {
        resetState()
        toast.add({ title: 'تم الارسال بنجاح ' })
        router.push("/");
    } else {
        toast.add({ title: error.value })
    }
}

</script>

<style scoped></style>