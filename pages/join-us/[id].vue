<template>
    <h2 class="text-center text-2xl my-5 dark:text-slate-50"> استمارة الالتحاق بالبطولة</h2>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UDivider label="بيانات الفريق" />
        <div class="row">
            <FormInputField v-model="state.email" dir="ltr" type="email" name="email" label="البريد الالكترونى" hint="مطلوب"
                icon="i-heroicons-envelope" placeholder="example@gmail.com" />

            <FormInputField v-model="state.teamName" type="text" name="teamName" label="اسم الفريق" hint="مطلوب"
                icon="i-heroicons-users" placeholder="اسم الفريق" />

            <FormInputField v-model="state.phone" dir="ltr" type="text" name="phone" label="رقم الجوال" hint="مطلوب"
                icon="i-heroicons-phone" placeholder="512345678" />
        </div>
        <UDivider label="بيانات اللاعب الاول" />
        <div class="row">
            <FormInputField v-model="state.fpName" type="text" name="fpName" label="الاسم" hint="مطلوب"
                icon="i-heroicons-user" placeholder="اللاعب الاول" />
            <FormInputField v-model="state.fpCity" type="text" name="fpCity" label="مدينة الاقامة" hint="مطلوب"
                icon="i-heroicons-map-pin" placeholder="الرياض" />
            <FormInputField v-model="state.fpBirthDate" type="date" name="fpBirthDate" label="تاريخ الميلاد" hint="مطلوب" />
            <FormInputField v-model="state.fpExperience" type="number" name="fpExperience" label="سنوات الخبرة" hint="مطلوب"
                icon="i-heroicons-academic-cap" />
        </div>
        <UDivider label="بيانات اللاعب الثاني" />
        <div class="row">
            <FormInputField v-model="state.spName" type="text" name="spName" label="الاسم" hint="مطلوب"
                icon="i-heroicons-user" placeholder="اللاعب الاول" />
            <FormInputField v-model="state.spCity" type="text" name="spCity" label="مدينة الاقامة" hint="مطلوب"
                icon="i-heroicons-map-pin" placeholder="الرياض" />
            <FormInputField v-model="state.spBirthDate" type="date" name="spBirthDate" label="تاريخ الميلاد" hint="مطلوب" />
            <FormInputField v-model="state.spExperience" type="number" name="spExperience" label="سنوات الخبرة" hint="مطلوب"
                icon="i-heroicons-academic-cap" />
        </div>
        <UDivider label="استفسارات عامة" />
        <UFormGroup class="form-control" name="IsPlayedBefore" size="xl">
            <URadioGroup v-model="state.IsPlayedBefore" legend="هل سبق لكم المشاركة ببطولات زات سابقاً ؟"
                :options="IsPlayedBeforeOptions" />
        </UFormGroup>

        <UDivider label="تعهد" />
        <FormCheckbox v-model="state.approveCommitments" name="approveCommitments"
            label="اوافق علي جميع  الشروط المرفقة ادناه." />

        <MarkdownRender v-if="champ" :markdownString="champ?.commitments" class="mt-2 ms-2  w-full" />


        <div class="row justify-center">
            <UButton type="submit" :loading="pending"
                class="h-12 flex justify-center text-md shadow-md border-0  w-1/2 md:w-1/4">
                ارسال
            </UButton>
        </div>
    </UForm>
</template>

<script setup lang="ts">
import { object, string, number, boolean, date, type InferType } from 'yup'
import type { IChamp } from "@/Models/IChamp"
const error = ref<string | null>(null)
const pending = ref(false)

import type { FormSubmitEvent } from '#ui/types'

type StateObj = {
    teamName: string,
    email: string,
    phone: string,
    fpName: string,
    fpCity: string,
    fpBirthDate: string,
    fpExperience: number,
    spName: string,
    spCity: string,
    spBirthDate: string,
    spExperience: number,
    IsPlayedBefore: string,
    approveCommitments: boolean,

}
const client = useStrapiClient()
const toast = useToast();
const route = useRoute()
const router = useRouter()
const champ = ref<null | IChamp>(null)


const state = reactive<StateObj>({
    teamName: "",
    email: "",
    phone: "",
    fpName: "",
    fpCity: "",
    fpBirthDate: "",
    fpExperience: 0,
    spName: "",
    spCity: "",
    spBirthDate: "",
    spExperience: 0,
    IsPlayedBefore: "no",
    approveCommitments: false,
})
const IsPlayedBeforeOptions = [{ label: 'نعم', value: 'yes' }, { label: 'لا', value: 'no' }]
const currentDate = new Date();
const maxBirthDate: Date = new Date(currentDate.getFullYear() - 5, currentDate.getMonth(), currentDate.getDay());
const minBirthDate: Date = new Date(currentDate.getFullYear() - 105, currentDate.getMonth(), currentDate.getDay());
const saudiArabianPhoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

const schema = object({
    email: string().trim().required("هذا الحقل مطلوب").email("يرجي ادخال بريد الكتروني صحيح"),
    phone: string().trim().required("هذا الحقل مطلوب").matches(saudiArabianPhoneNumberRegex, { message: 'يرجي ادخال رقم جوال صحيح', excludeEmptyString: true }),
    teamName: string().trim().required("هذا الحقل مطلوب").min(2, "يرجى ادخال اسم صحيح").max(30, "يجب ان لا يتعدي الاسم ثلاثين حرفا"),

    fpName: string().trim().required("هذا الحقل مطلوب").min(2, "يرجى ادخال اسم صحيح").max(50, "يجب ان لا يتعدي الاسم الخمسين حرفا"),
    spName: string().trim().required("هذا الحقل مطلوب").min(2, "يرجى ادخال اسم صحيح").max(50, "يجب ان لا يتعدي الاسم الخمسين حرفا"),

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

const calculateAge = (birthDateStr: Date): number => {
    const birthDate: Date = new Date(birthDateStr);

    const currentDate: Date = new Date();
    const timeDiff: number = currentDate.getTime() - birthDate.getTime();
    const ageInMilliseconds: number = Math.floor(timeDiff);

    // Calculate the age in years, accounting for leap years
    const msPerYear: number = 365.25 * 24 * 60 * 60 * 1000;
    const age: number = Math.floor(ageInMilliseconds / msPerYear);

    return age;
}

const getAgeRange = (birthDateStr: Date): string => {
    const age: number = calculateAge(birthDateStr);
    if (age < 18)
        return " < 18"
    else if (age >= 18 && age < 24)
        return "18 ~ 23"
    else if (age >= 24 && age < 30)
        return "24 ~ 29"
    else if (age >= 30 && age < 37)
        return "30 ~ 36"
    else
        return " > 37"
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const fpAge = getAgeRange(event.data.fpBirthDate);
    const spAge = getAgeRange(event.data.spBirthDate);

    pending.value = true
    client("/champion-join-requests", { method: "post", body: { data: { ...event.data, date: new Date(), champ: route.params.id, fpAge, spAge } } })
        .then(() => {
            toast.add({ title: 'تم الارسال بنجاح ' })
            router.push("/");
        })
        .catch((err) => {
            toast.add({ title: 'تعذر الارسال برجاء المحاولة مرة اخري' })
            console.error(err);
        })
        .finally(() => {
            pending.value = false;
        })
}


const fetchData = () => {
    pending.value = true
    return client(`/leagues/getById/${route.params.id}`, { method: 'GET' })
        .then((data: any) => {
            champ.value = data
            pending.value = false
            useHead({
                title: champ.value?.name,
            })
        }).catch((err) => {
            console.error(err)
            pending.value = false
        })
}
onServerPrefetch(fetchData)
onBeforeMount(fetchData)

</script>

<style scoped></style>