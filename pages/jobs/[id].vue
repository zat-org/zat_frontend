<template>
    <FetchDataWraper class="md:w-5/6 lg:w2/3 mx-auto text-gray-900 dark:text-slate-50" :error="error" :pending="pending">
        <template #main>
            <section>
                <UCard :ui="{ background: '' }">
                    <div class="flex flex-col lg:flex-row justify-around">
                        <div v-if="job" class="text-sm w-full lg:w-5/12 mb-5">
                            <div class="flex justify-between items-center mb-5">
                                <div class="flex">
                                    <UAvatar class=" bg-white me-3 h-10 w-10 p-0.5"
                                        src="https://zatbaloot.com/images/zat-logo-black.svg" alt="زات" />
                                    <div>
                                        <h2 class="text-sm text-gray-500">المسمى الوظيفى</h2>
                                        <h2 class="text-xl truncate">{{ job.attributes.jobTitle }}</h2>
                                    </div>
                                </div>
                                <UButton to="/jobs" color="amber" :trailing="true" icon="i-heroicons-arrow-small-left">
                                    وظائف زات
                                </UButton>
                            </div>
                            <div class="mt-5">
                                <MarkdownRender :markdownString="job.attributes.responsibilities" class="mt-2 ms-2 " />
                            </div>
                        </div>
                        <div v-else class="flex flex-col justify-center items-center my-5">
                            <Icon name="pepicons-print:cv-circle" size="100" />
                            <h4 class="text-center mt-5">ارفق لنا بياناتك لنتواصل معك عند توفر وظيفة تناسبك </h4>
                            <UButton to="/jobs" color="amber" class="mt-5" icon="i-heroicons-briefcase"> اختر من وظائف زات
                                المتاحة حاليا </UButton>
                        </div>

                        <UCard class="w-full lg:w-5/12 lg:sticky h-fit">
                            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                                <div class="row">
                                    <FormInputField v-model="state.email" dir="ltr" type="email" name="email"
                                        label="البريد الالكترونى" hint="مطلوب" icon="i-heroicons-envelope"
                                        placeholder="example@gmail.com" />

                                    <FormInputField v-model="state.name" type="text" name="name" label="الاسم" hint="مطلوب"
                                        icon="i-heroicons-user" placeholder="الاسم" />

                                    <FormInputField v-model="state.phone" dir="ltr" type="text" name="phone"
                                        label="رقم الجوال" hint="مطلوب" icon="i-heroicons-phone" placeholder="512345678" />

                                    <FormInputField v-model="state.address" type="text" name="address" label="مدينة الاقامة"
                                        hint="مطلوب" icon="i-heroicons-map-pin" placeholder="الرياض" />

                                    <FormTextArea v-model="state.aboutMe" name="aboutMe" label="نبذة عنك"
                                        placeholder="تحدث عن نفسك بايجاز ... " />

                                    <FormInputFileField name="cv" v-model="state.cv" label="السيرة الذاتية"
                                        placeholder="اضغط هنا لاختيار الملف" hint="مطلوب" icon="i-heroicons-document" />
                                </div>
                                <div class="row justify-center w-full">
                                    <UButton type="submit" :loading="pending" color="amber"
                                        icon="i-heroicons-paper-airplane"
                                        class="flex justify-center text-md shadow-md border-0 hover:shadow-emerald-00 w-1/2 md:w-1/4">
                                        ارسال
                                    </UButton>
                                </div>
                            </UForm>
                        </UCard>


                    </div>
                    <!-- <template #footer>
                        <div class="flex justify-center">
                            <UButton to="/jobs" color="amber" icon="i-heroicons-briefcase">
                                جميع وظائف زات
                            </UButton>
                        </div>
                    </template> -->
                </UCard>

            </section>

        </template>
    </FetchDataWraper>
</template>

<script setup lang="ts">
import { object, string, mixed, type InferType } from 'yup'
import type { IJob } from '@/Models/IJob';
import type { FormSubmitEvent } from '#ui/types'

type StateObj = {
    name: string,
    email: string,
    phone: string,
    address: string,
    aboutMe: string,
    cv: File | null,
}

const client = useStrapiClient()
const toast = useToast();
const pending = ref(false)
const route = useRoute()
const router = useRouter()
const job = ref<IJob | null>(null)
const error = ref<string | null>(null)

const MAX_FILE_SIZE = 5 * 1024 * 1024; //100KB

const validFileTypes = ['application/pdf'];

function isValidFileType(fileExt: string) {
    return validFileTypes.indexOf(fileExt) > -1;
}

const state = reactive<StateObj>({
    name: "",
    email: "",
    phone: "",
    address: "",
    aboutMe: "",
    cv: null
})

const saudiArabianPhoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

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
    pending.value = true
    const formData = new FormData();
    console.log(event.data);
    let cvFile: File = event.data.cv as File;
    formData.append("files.CV", cvFile, `(cv-${event.data.name})-(${new Date()})-${cvFile.name}`);
    type DataWithoutCV = Omit<typeof event.data, 'cv'>;

    type ExtendedData = {
        date: Date;
        job: string | null | string[]; // Adjust the type based on your actual use case
    } & DataWithoutCV;
    let data: ExtendedData = {
        ...event.data,
        date: new Date(),
        job: route.params.id === "_" ? null : route.params.id
    };

    formData.append('data', JSON.stringify(data));
    // client("/upload", {
    //     method: "post", body: formData
    // })
    //     .then((data) => {
    //         console.log(data);
    //         toast.add({ title: 'تم الارسال بنجاح ' })
    //         router.push("/");
    //     })
    //     .catch((err) => {
    //         toast.add({ title: 'تعذر الارسال برجاء المحاولة مرة اخري' })
    //         console.error(err);
    //     })
    //     .finally(() => {
    //         pending.value = false;
    //     })
    client("/apply-to-job-requests", {
        method: "post", body: formData
    })
        .then((data) => {
            console.log(data);
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


const fetchJob = () => {
    pending.value = true
    return client(`/jobs/${route.params.id}`, { method: 'GET' })
        .then((res: any) => {
            job.value = res.data
            pending.value = false
            useHead({
                title: ` وظائف زات - ${job.value?.attributes.jobTitle}`,
            })
        }).catch((err) => {
            console.error(err)
            error.value = "تعذر تحميل البيانات."
            pending.value = false
        })
}

if (route.params.id !== '_') {
    onServerPrefetch(fetchJob)
    onBeforeMount(fetchJob)
}

</script>

<style scoped>
.team-avatar img {
    object-fit: contain;
}
</style>