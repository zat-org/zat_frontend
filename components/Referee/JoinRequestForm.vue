<template>
    <UCard>
        <template #header>
            <div class="relative">
                <h2 class="text-center">راسلنا وكن احد حكامنا المحترفين</h2>
                <UButton class="absolute -top-1 left-0" icon="i-heroicons-x-mark" square variant="ghost"
                    @click="emit('cancel')" />
            </div>
        </template>

        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <div class="row">
                <FormInputField v-model="state.name" type="text" name="name" label="الاسم" hint="مطلوب"
                    icon="i-heroicons-user" placeholder="الاسم" />

                <FormInputField v-model="state.email" dir="ltr" type="email" name="email" label="البريد الالكترونى"
                    hint="مطلوب" icon="i-heroicons-envelope" placeholder="example@gmail.com" />

                <FormInputField v-model="state.phone" dir="ltr" type="text" name="phone" label="رقم الجوال" hint="مطلوب"
                    icon="i-heroicons-phone" placeholder="512345678" />

                <FormInputField v-model="state.address" type="text" name="address" label="مدينة الاقامة" hint="مطلوب"
                    icon="i-heroicons-map-pin" placeholder="الرياض" />

                <FormInputField v-model="state.birthDate" type="date" name="birthDate" label="تاريخ الميلاد" hint="مطلوب" />

                <FormInputField v-model="state.experience" type="number" name="experience" label="سنوات الخبرة بالبلوت"
                    hint="مطلوب" icon="i-heroicons-academic-cap" />

                <UFormGroup class="form-control" name="isJudgedBefore" size="xl">
                    <URadioGroup v-model="state.IsJudgedBefore" legend="هل سبق لك التحكيم سابقا ؟"
                        :options="IsJudgedBeforeOptions" />
                </UFormGroup>


            </div>
            <div class="flex justify-evenly w-full">
                <UButton type="submit" :loading="pending" icon="i-heroicons-paper-airplane"
                    class="flex justify-center text-md w-1/3 md:w-1/4">
                    ارسال
                </UButton>

                <UButton type="button" :loading="pending" color="white" variant="outline" trailing-icon="i-heroicons-x-mark"
                    class="flex justify-center text-md w-1/3 md:w-1/4" @click="emit('cancel')">
                    الغاء
                </UButton>
            </div>
        </UForm>

    </UCard>
</template>

<script setup lang="ts">
import { object, string, number, date, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import type { IJoinAsRefereeRequest } from '~/Models/IReferee';

const { $api } = useNuxtApp();
const toast = useToast();
const router = useRouter();
const emit = defineEmits(['cancel']);
const saudiArabianPhoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
const currentDate = new Date();
const maxBirthDate: Date = new Date(currentDate.getFullYear() - 5, currentDate.getMonth(), currentDate.getDay());
const minBirthDate: Date = new Date(currentDate.getFullYear() - 105, currentDate.getMonth(), currentDate.getDay());

const IsJudgedBeforeOptions = [{ label: 'نعم', value: 'yes' }, { label: 'لا', value: 'no' }]

const state = reactive<IJoinAsRefereeRequest>({
    name: "",
    email: "",
    phone: "",
    address: "",
    birthDate: "",
    experience: 0,
    IsJudgedBefore: "no"
})


const schema = object({
    email: string().trim().required("هذا الحقل مطلوب").email("يرجي ادخال بريد الكتروني صحيح"),
    phone: string().trim().required("هذا الحقل مطلوب").matches(saudiArabianPhoneNumberRegex, { message: 'يرجي ادخال رقم جوال صحيح', excludeEmptyString: true }),
    name: string().trim().required("هذا الحقل مطلوب").min(2, "يرجى ادخال اسم صحيح").max(50, "يجب ان لا يتعدي الاسم الخمسين حرفا"),
    address: string().trim().required("هذا الحقل مطلوب").min(2, "يرجى ادخال اسم صحيح"),
    experience: number().required("هذا الحقل مطلوب").min(0, "يرجي ادخال عدد سنوات صحيح").max(30, "يرجي ادخال عدد سنوات صحيح"),
    IsJudgedBefore: string().required("هذا الحقل مطلوب").oneOf(IsJudgedBeforeOptions.map(elm => elm.value)),
    birthDate: date()
        .required("هذا الحقل مطلوب")
        .typeError("برجاء ادخال تاريخ ميلاد صحيح")
        .max(maxBirthDate, "يجب ان يكون عمرك اكبر من 5 سنوات")
        .min(minBirthDate, "يجب ان يكون عمرك اصغر من 100 سنة"),
})
type Schema = InferType<typeof schema>

const { pending, error, send: sendJoinAsRefereeRequest } = $api.referees.useSendJoinRequest();
const onSubmit = async (event: FormSubmitEvent<Schema>) => {
    console.log("ddd");

    let res = await sendJoinAsRefereeRequest(state);
    if (error.value === null) {
        toast.add({ title: 'تم الارسال بنجاح ' })
        router.push("/");
    } else {
        toast.add({ title: 'تعذر الارسال برجاء المحاولة مرة اخري' })
    }
}



</script>

<style scoped></style>