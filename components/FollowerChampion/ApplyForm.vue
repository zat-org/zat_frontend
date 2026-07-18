<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit" role="form"
        aria-label="نموذج التسجيل في البطولة">
        <fieldset>
            <legend class="sr-only">بيانات الفريق</legend>
            <USeparator label="بيانات الفريق" />
            <div class="row" role="group" aria-labelledby="team-info">
                <UFormField dir="ltr" name="email" label="البريد الالكترونى" size="xl" hint="مطلوب">
                    <UInput v-model="state.email" type="email" icon="i-heroicons-envelope"
                        placeholder="example@gmail.com" />
                </UFormField>

                <UFormField name="teamName" label="اسم الفريق" hint="مطلوب" size="xl">
                    <UInput v-model="state.teamName" type="text" icon="i-heroicons-users" placeholder="اسم الفريق" />
                </UFormField>
            </div>
        </fieldset>
        <fieldset>
            <legend class="sr-only">بيانات اللاعب الاول</legend>
            <USeparator label="بيانات اللاعب الاول" />
            <div class="row" role="group" aria-labelledby="player1-info">

                <UFormField name="fpName" label="الاسم" hint="مطلوب" aria-required="true">
                    <UInput v-model="state.fpName" type="text" icon="i-heroicons-user" placeholder="اللاعب الاول" />
                </UFormField>

                <UFormField name="fpCity" label="مدينة الاقامة" hint="مطلوب" size="xl" aria-required="true">
                    <UInput v-model="state.fpCity" type="text" icon="i-heroicons-map-pin" placeholder="الرياض" />
                </UFormField>


                <UFormField dir="ltr" name="fpPhone" label="رقم الجوال" hint="مطلوب" size="xl" aria-required="true">
                    <UInput v-model="state.fpPhone" type="tel" icon="i-heroicons-phone" placeholder="512345678" />
                </UFormField>

                <UFormField type="date" label="تاريخ الميلاد" hint="مطلوب" aria-required="true" size="xl">
                    <UInput v-model="state.fpBirthDate" name="fpBirthDate" />
                </UFormField>

                <UFormField name="fpExperience" label="سنوات الخبرة" hint="مطلوب" aria-required="true" size="xl">
                    <UInput v-model="state.fpExperience" type="number" icon="i-heroicons-academic-cap" />
                </UFormField>
            </div>
        </fieldset>
        <fieldset>
            <legend class="sr-only">بيانات اللاعب الثاني</legend>
            <USeparator label="بيانات اللاعب الثاني" />
            <div class="row" role="group" aria-labelledby="player2-info">

                <UFormField name="spName" label="الاسم" hint="مطلوب" aria-required="true" size="xl">
                    <UInput v-model="state.spName" type="text" icon="i-heroicons-user" placeholder="اللاعب الثاني" />
                </UFormField>
                <UFormField name="spCity" label="مدينة الاقامة" hint="مطلوب" aria-required="true" size="xl">
                    <UInput v-model="state.spCity" type="text" icon="i-heroicons-map-pin" placeholder="الرياض" />
                </UFormField>
                <UFormField dir="ltr" name="spPhone" label="رقم الجوال" hint="مطلوب" aria-required="true" size="xl">
                    <UInput v-model="state.spPhone" type="tel" icon="i-heroicons-phone" placeholder="512345678" />
                </UFormField>
                <UFormField name="spBirthDate" label="تاريخ الميلاد" hint="مطلوب" aria-required="true" size="xl">
                    <UInput v-model="state.spBirthDate" type="date" />
                </UFormField>
                <UFormField name="spExperience" label="سنوات الخبرة" hint="مطلوب" aria-required="true" size="xl">
                    <UInput v-model="state.spExperience" type="number" icon="i-heroicons-academic-cap" />
                </UFormField>
            </div>
        </fieldset>
        <fieldset>
            <legend class="sr-only">استفسارات عامة</legend>
            <USeparator label="استفسارات عامة" />
            <UFormField class="form-control" name="IsPlayedBefore" size="xl">
                <URadioGroup v-model="state.IsPlayedBefore" legend="هل سبق لكم المشاركة ببطولات زات سابقاً ؟"
                    :options="IsPlayedBeforeOptions" role="radiogroup" aria-required="true" />
            </UFormField>
        </fieldset>

        <fieldset v-if="champion && champion.Commitments.length > 0">
            <legend class="sr-only">تعهد والتزام</legend>
            <USeparator label="تعهد" />
            <FormCheckbox v-model="state.approveCommitments" name="approveCommitments"
                label="اوافق علي جميع  الشروط المرفقة ادناه." aria-required="true" />

            <MarkdownRender :markdownString="champion.Commitments" class="mt-2 ms-2 w-full" role="region"
                aria-label="شروط وأحكام البطولة" />
        </fieldset>

        <footer class="row justify-center">
            <UButton type="submit" :loading="pending" icon="i-heroicons-paper-airplane"
                class="h-12 flex justify-center text-md shadow-md border-0 w-1/2 md:w-1/4"
                aria-label="إرسال نموذج التسجيل">
                ارسال
            </UButton>
        </footer>
    </UForm>

    <nav>
        <BackBtn />
    </nav>
</template>

<script setup lang="ts">
import { object, string, number, boolean, date, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import type { IFollowerChampion, IFollowerChampionApplyRequest } from "@/Models/IFollowerChampion";
import { UFormField } from '#components';
const props = defineProps({
    champion: {
        type: Object as PropType<IFollowerChampion>,
        required: true
    }
})

const toast = useToast();
const router = useRouter()

const { $api } = useNuxtApp();
const { error, pending, send: sendJoinRequest } = $api.followersChampions.useSendApplyRequest();


const state = reactive<IFollowerChampionApplyRequest>({
    teamName: "",
    email: "",
    fpPhone: "",
    spPhone: "",
    fpName: "",
    fpCity: "",
    fpBirthDate: "",
    fpExperience: 0,
    spName: "",
    spCity: "",
    spBirthDate: "",
    spExperience: 0,
    IsPlayedBefore: "no",
    approveCommitments: (props.champion.Commitments.length > 0) ? false : true,
})

//#region validation
const IsPlayedBeforeOptions = [{ label: 'نعم', value: 'yes' }, { label: 'لا', value: 'no' }]
const currentDate = new Date();
const maxBirthDate: Date = new Date(currentDate.getFullYear() - 5, currentDate.getMonth(), currentDate.getDay());
const minBirthDate: Date = new Date(currentDate.getFullYear() - 105, currentDate.getMonth(), currentDate.getDay());
const saudiArabianPhoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

const schema = object({
    teamName: string().trim().required("هذا الحقل مطلوب").min(2, "يرجى ادخال اسم صحيح").max(30, "يجب ان لا يتعدي الاسم ثلاثين حرفا"),
    email: string().trim().required("هذا الحقل مطلوب").email("يرجي ادخال بريد الكتروني صحيح"),

    fpPhone: string().trim().required("هذا الحقل مطلوب").matches(saudiArabianPhoneNumberRegex, { message: 'يرجي ادخال رقم جوال صحيح', excludeEmptyString: true }),
    spPhone: string().trim().required("هذا الحقل مطلوب").matches(saudiArabianPhoneNumberRegex, { message: 'يرجي ادخال رقم جوال صحيح', excludeEmptyString: true }),

    fpName: string().trim().required("هذا الحقل مطلوب").min(2, "يرجى ادخال اسم صحيح").max(50, "يجب ان لا يتعدي الاسم الخمسين حرفا")
        .test("fp-name-of-three", "برجاء ادخال اسم ثلاثى باللغه العربية", (value) => {
            return value.trim().split(" ").length >= 3 && value.trim().split(" ").every((value) => value.length >= 2 && arabicRegex.test(value))
        }),
    spName: string().trim().required("هذا الحقل مطلوب").min(2, "يرجى ادخال اسم صحيح").max(50, "يجب ان لا يتعدي الاسم الخمسين حرفا")
        .test("sp-name-of-three", "برجاء ادخال اسم ثلاثى باللغه العربية", (value) => {
            return value.trim().split(" ").length >= 3 && value.trim().split(" ").every((value) => value.length >= 2 && arabicRegex.test(value))
        }),

    fpCity: string().trim().required("هذا الحقل مطلوب").min(2, "يرجى ادخال اسم المدينة بشكل صحيح").max(50, "يجب ان لا يتعدي اسم المدينة الخمسين حرفا"),
    spCity: string().trim().required("هذا الحقل مطلوب").min(2, "يرجى ادخال اسم المدينة بشكل صحيح").max(50, "يجب ان لا يتعدي اسم المدينة الخمسين حرفا"),

    fpExperience: number().required("هذا الحقل مطلوب").min(0, "يرجي ادخال عدد سنوات صحيح").max(30, "يرجي ادخال عدد سنوات صحيح"),
    spExperience: number().required("هذا الحقل مطلوب").min(0, "يرجي ادخال عدد سنوات صحيح").max(30, "يرجي ادخال عدد سنوات صحيح"),


    fpBirthDate: date()
        .required("هذا الحقل مطلوب")
        .typeError("برجاء ادخال تاريخ ميلاد صحيح")
        .max(maxBirthDate, "يجب ان يكون عمرك اكبر من 5 سنوات")
        .min(minBirthDate, "يجب ان يكون عمرك اصغر من 100 سنة"),
    spBirthDate: date()
        .required("هذا الحقل مطلوب")
        .typeError("برجاء ادخال تاريخ ميلاد صحيح")
        .max(maxBirthDate, "يجب ان يكون عمرك اكبر من 5 سنوات")
        .min(minBirthDate, "يجب ان يكون عمرك اصغر من 100 سنة"),

    IsPlayedBefore: string().required("هذا الحقل مطلوب").oneOf(IsPlayedBeforeOptions.map(elm => elm.value)),
    approveCommitments: boolean().isTrue("يجب الموافقة علي التعهد لاكمال الاستمارة."),


})
type Schema = InferType<typeof schema>
//#endregion 

async function onSubmit(event: FormSubmitEvent<Schema>) {
    await sendJoinRequest(state, props.champion.id);
    if (error.value) {
        toast.add({ title: 'تعذر الارسال برجاء المحاولة مرة اخري' })
    } else {
        toast.add({ title: 'تم الارسال بنجاح ' })
        router.push("/");
    }
}

</script>

<style scoped></style>