<template>
    <div>
        <template v-if="!pending && !error">
            <div class="divider text-2xl font-semibold py-5 px-10">
                <Icon name="fluent-emoji:balance-scale" class="text-9xl" /> حكام زات
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-3"
                v-if="referees && referees.length > 0">
                <div v-for="referee in referees" :key="referee.id"
                    class=" bg-zinc-100 rounded-xl shadow-lg p-4 flex justify-start  ">
                    <div class="avatar w-1/3 flex justify-center pr-4">
                        <div class="w-16 sm:w-16 md:w-20 rounded-xl shadow-lg  ">
                            <nuxt-img loading="lazy" class="object-top" :src="url + referee.image" :alt="referee.name" />
                        </div>
                    </div>
                    <div class="flex flex-col  justify-start items-start space-y-1 w-2/3 text-amber-900">

                        <p class="text-sm text-center font-semibold ">
                            {{ referee.name }}
                        </p>
                        <p class="text-xs ">
                            بدأ التحكيم منذ <span class="text-amber-700">{{ getElapsedTime(referee.start_refereeing_at)
                            }}</span>
                        </p>
                        <p class="text-xs "> حكم بـ <span class="text-amber-700">
                                {{ `${parseInt(referee.refereed_matches_count) > 1 ?
                                    ` ${referee.refereed_matches_count} مباريات`
                                    : ' مباراة واحدة'}` }}
                            </span> </p>
                    </div>

                </div>
            </div>
            <div v-else class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center py-10">
                <Icon name="line-md:alert-circle" class="block text-9xl" />
                <h3>لا يوجد حكام حاليا</h3>
            </div>
        </template>
        <div v-else-if="pending" class="text-zinc-700 flex flex-col space-y-4 justify-center items-center p-10">
            <Icon name="svg-spinners:blocks-shuffle-3" class="text-4xl block" />
            <h2 class="font-semibold">تحميل</h2>
        </div>
        <div v-else-if="error" class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center p-4">
            <Icon name="line-md:close-circle" class="block text-9xl text-red-500" />
            <h3>{{ error }}</h3>
        </div>
    </div>
</template>

<script setup lang="ts">
import IReferee from '~/Models/IReferee';
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 
const client = useStrapiClient()
const referees = ref<IReferee[] | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)

const fetchData = () => {
    pending.value = true
    return client(`/referees`, { method: 'GET' })
        .then((data: any) => {
            referees.value = data.referees
            pending.value = false
            useHead({
                title: `حكام زات`,
            })
        }).catch((err) => {
            console.error(err)
            error.value = "تعذر تحميل البيانات."
            pending.value = false
        })
}
onServerPrefetch(fetchData)
onBeforeMount(fetchData)

function getElapsedTime(inputDate: string): string {
    const inputTime = new Date(inputDate).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - inputTime;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return `${years} ${years > 1 ? 'أعوام' : 'عام'} `;
    } else if (months > 0) {
        return `${months} ${months > 1 ? 'أشهر' : 'شهر'} `;
    } else if (weeks > 0) {
        return `${weeks} ${weeks > 1 ? 'أسابيع' : 'أسبوع'} `;
    } else if (days > 0) {
        return `${days} ${days > 1 ? 'أيام' : 'يوم'} `;
    } else if (hours > 0) {
        return `${hours} ${hours > 1 ? 'ساعات' : 'ساعة'} `;
    } else if (minutes > 0) {
        return `${minutes} ${minutes > 1 ? 'دقائق' : 'دقيقة'} `;
    } else {
        return `${seconds} ${seconds !== 1 ? 'ثوان' : 'ثانية'} `;
    }
}

</script>

<style scoped></style>