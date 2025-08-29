<template>
    <UCard>
        <template #header>
            <div class="relative">
                <h2 class="text-center">استمارة التقدم للوظيفة</h2>
                <UButton class="absolute -top-1 left-0 lg:hidden " icon="i-heroicons-x-mark" square variant="ghost"
                    @click="emit('cancel')" />
            </div>
        </template>

        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <div class="row">
                <UFormGroup name="name" label="الاسم" hint="مطلوب" size="xl">
                    <UInput v-model="state.name" type="text" icon="i-heroicons-user" placeholder="الاسم" />
                </UFormGroup>

                <UFormGroup size="xl" dir="ltr" name="email" label="البريد الالكترونى" hint="مطلوب">
                    <UInput v-model="state.email" type="email" icon="i-heroicons-envelope"
                        placeholder="example@gmail.com" />
                </UFormGroup>

                <UFormGroup dir="ltr" name="phone" label="رقم الجوال" hint="مطلوب" size="xl">
                    <UInput v-model="state.phone" type="text" icon="i-heroicons-phone" placeholder="512345678" />
                </UFormGroup>
                <UFormGroup name="address" label="مدينة الاقامة" hint="مطلوب" size="xl">
                    <UInput v-model="state.address" type="text" icon="i-heroicons-map-pin" placeholder="الرياض" />
                </UFormGroup>

                <FormTextArea v-model="state.aboutMe" name="aboutMe" label="نبذة عنك"
                    placeholder="تحدث عن نفسك بايجاز ... " />

                <FormInputFileField name="cv" v-model="state.cv" label="السيرة الذاتية"
                    placeholder="اضغط هنا لاختيار الملف" hint="مطلوب" icon="i-heroicons-document" />
            </div>
            <div class="flex justify-evenly w-full">
                <UButton type="submit" :loading="sendApplyRequestPending" icon="i-heroicons-paper-airplane"
                    class="flex justify-center text-md w-1/3">
                    ارسال
                </UButton>
                <UButton type="button" color="white" variant="outline" trailing-icon="i-heroicons-x-mark"
                    class="flex justify-center text-md w-1/3 lg:hidden" @click="emit('cancel')">
                    الغاء
                </UButton>
            </div>
        </UForm>
    </UCard>
</template>

<script setup lang="ts">
import { object, string, mixed, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import type { IApplyToJobRequest } from '@/Models/IJob';
import { UFormGroup } from '#components';

const { $api } = useNuxtApp();
const toast = useToast();

const props = defineProps({
    jobId: { required: true, type: [Number, null] as PropType<number | null> }
})

const emit = defineEmits(['cancel', 'done']);

const state = reactive<IApplyToJobRequest>({
    name: "",
    email: "",
    phone: "",
    address: "",
    aboutMe: "",
    cv: null
})
const { error: errorAtSendApplyRequest, pending: sendApplyRequestPending, send: sendApplyJobRequest } = $api.jobs.useSendApplyRequest();


const saudiArabianPhoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
const MAX_FILE_SIZE = 5 * 1024 * 1024; //100KB
const validFileTypes = ['application/pdf'];
function isValidFileType(fileExt: string) {
    return validFileTypes.indexOf(fileExt) > -1;
}
const schema = object({
    email: string().trim().required("هذا الحقل مطلوب").email("يرجي ادخال بريد الكتروني صحيح"),
    phone: string().trim().required("هذا الحقل مطلوب").matches(saudiArabianPhoneNumberRegex, { message: 'يرجي ادخال رقم جوال صحيح', excludeEmptyString: true }),
    name: string().trim().required("هذا الحقل مطلوب").min(2, "يرجى ادخال اسم صحيح").max(50, "يجب ان لا يتعدي الاسم الخمسين حرفا"),
    address: string().trim().required("هذا الحقل مطلوب").min(2, "يرجى ادخال اسم صحيح"),
    cv: mixed()
        .required("هذا الحقل مطلوب")
        .test("is-valid-type", "يجب ان تكون السيرة الذاتية بصيغة pdf",
            value => {
                console.log(value);

                const file = value as File;

                return isValidFileType(file.type)
            }
        )
        .test("is-valid-size", "يجب ان تكون السيرة الذاتية اصغر من 5 MB",
            value => {
                const file = value as File;
                return file.size <= MAX_FILE_SIZE && file.size > 0;
            })
})
type Schema = InferType<typeof schema>


async function onSubmit(event: FormSubmitEvent<Schema>) {
    await sendApplyJobRequest(state, props.jobId);
    if (errorAtSendApplyRequest.value) {
        toast.add({ title: 'تعذر الارسال برجاء المحاولة مرة اخري' })
    } else {
        toast.add({ title: 'تم الارسال بنجاح ' })
        emit("done");
    }
}

</script>

<style scoped></style>