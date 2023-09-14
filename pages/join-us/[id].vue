<template>
    <h2 class="text-center  text-2xl my-5 dark:text-slate-50"> استمارة الالتحاق بالبطولة</h2>
    <form @submit.prevent="onHandleSubmit">
        <div class="divider my-5">بيانات الفريق</div>
        <div class="row">
            <InputField name="teamName" type="text" label="اسم الفريق" :rules="schema.playerName" />

            <InputField name="email" type="email" label="البريد الاكتروني" placeholder="example@zatbaloot.com" dir="ltr"
                :rules="schema.email" />
            <InputField name="phone" type="tel" label="رقم الجوال" placeholder="512345678" dir="ltr"
                :rules="schema.phone" />

        </div>
        <div class="divider my-5">بيانات اللاعب الاول</div>
        <div class="row">
            <InputField name="fpName" type="text" label="الاسم" :rules="schema.playerName" />
            <InputField name="fpCity" type="text" label="مدينة الاقامة" :rules="schema.playCity" />
            <SelectField name="fpAge" label="العمر" :placeholder="agePlaceholder" dir="rtl" :rules="schema.playerAge"
                :options="AgeOptions" />
            <InputField name="fpExperience" type="number" label="سنوات الخبرة" :rules="schema.playerExperience" />
        </div>
        <div class="divider my-5">بيانات اللاعب الثاني</div>
        <div class="row">
            <InputField name="spName" type="text" label="الاسم" :rules="schema.playerName" />
            <InputField name="spCity" type="text" label="مدينة الاقامة" :rules="schema.playCity" />
            <SelectField name="spAge" label="العمر" :placeholder="agePlaceholder" dir="rtl" :rules="schema.playerAge"
                :options="AgeOptions" />
            <InputField name="spExperience" type="number" label="سنوات الخبرة" :rules="schema.playerExperience" />
        </div>

        <div class="divider my-5">استفسارات عامة</div>
        <RadioField name="IsPlayedBefore" label="هل سبق لكم المشاركة ببطولات سام سابقاً ؟" :rules="schema.IsPlayedBefore"
            :options="IsPlayedBeforeOptions" />

        <div class="divider my-5">تعهد</div>


        <CheckboxField name="approveFees"
            label="أتعهد بدفع رسوم المشاركة للفريق الواحد ٢٠٠ ريال (اثبات جدية) مستردة بعد نهاية البطولة."
            :rules="schema.approve" />

        <CheckboxField name="approveNoCheating"
            label="أتعهد بعدم الغش في البطولة.. و في حال مخالفتي ذلك اتنازل عن الجائزة المقدمة." :rules="schema.approve" />

        <CheckboxField name="approveMedia"
            label="أسمح بتصويري واستخدام المحتوى في اي شبكة من وسائل التواصل الاجتماعي ولا يحق لي المطالبة بازالة المحتوى.."
            :rules="schema.approve" />

        <CheckboxField name="approveInfoCorrect" label="اتعهد بصحة المعلومات المقدمة أعلاه." :rules="schema.approve" />

        <div class="row">
            <button class="btn btn-warning shadow-lg hover:shadow-yellow-500 w-1/2 md:w-1/4  disabled:text-slate-600"
                type="submit" :disabled="!useIsFormValid().value">ارسال</button>
        </div>
    </form>
</template> 

<script setup lang="ts">
import * as yup from 'yup';
import { SelectOption } from "@/Models/FormTypes"


const saudiArabianPhoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

const client = useStrapiClient()

const { $toast } = useNuxtApp();

const IsToastShown = ref(false)
const pending = ref(false)
const ToastShowDelay = 6;



const AgeOptions: SelectOption[] = [
    { value: "18 ~ 23", displayValue: "18 ~ 23" },
    { value: "24 ~ 29", displayValue: "24 ~ 29" },
    { value: "30 ~ 36", displayValue: "30 ~ 36" },
    { value: " > 37 ", displayValue: "أكبر من 37 سنة" },
]
const agePlaceholder: SelectOption =
    { value: "", displayValue: "اختر الفئة العمرية" }

const IsPlayedBeforeOptions: SelectOption[] = [{ displayValue: 'نعم', value: 'yes' }, { displayValue: 'لا', value: 'no' }]

const schema = {
    email: yup.string().trim().required("هذا الحقل مطلوب").email("يرجي ادخال بريد الكتروني صحيح"),
    phone: yup.string().trim().required("هذا الحقل مطلوب").matches(saudiArabianPhoneNumberRegex, { message: 'يرجي ادخال رقم جوال صحيح', excludeEmptyString: true }),
    playerName: yup.string().trim().required("هذا الحقل مطلوب").min(2, "يرجى ادخال اسم صحيح").max(50, "يجب ان لا يتعدي الاسم الخمسين حرفا"),
    playCity: yup.string().trim().required("هذا الحقل مطلوب").min(2, "يرجى ادخال اسم المدينة بشكل صحيح").max(50, "يجب ان لا يتعدي اسم المدينة الخمسين حرفا"),
    playerAge: yup.string().required("هذا الحقل مطلوب").oneOf(AgeOptions.map(elm => elm.value)),
    playerExperience: yup.number().required("هذا الحقل مطلوب").min(0, "يرجي ادخال عدد سنوات صحيح").max(30, "يرجي ادخال عدد سنوات صحيح"),
    IsPlayedBefore: yup.string().required("هذا الحقل مطلوب").oneOf(IsPlayedBeforeOptions.map(elm => elm.value)),
    approve: yup.boolean().isTrue()
};

const { handleSubmit, values, resetForm } = useForm();
const route = useRoute()
const router = useRouter()
const onHandleSubmit = handleSubmit(() => {

    pending.value = true
    IsToastShown.value = false
    client("/champion-join-requests", { method: "post", body: { data: { ...values, date: new Date(), champ: route.params.id } } })
        .then(() => {

            $toast.show({
                type: 'success',
                message: 'تم الارسال بنجاح ',
                timeout: ToastShowDelay,
            })
            router.push("/");
        })
        .catch((err) => {
            $toast.show({
                type: 'danger',
                message: 'تعذر الارسال برجاء المحاولة مرة اخري',
                timeout: ToastShowDelay,

            })
            console.error(err);
        })
        .finally(() => {
            pending.value = false;
        })
})




</script>

<style scoped></style>