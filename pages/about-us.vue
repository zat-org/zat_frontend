<template>
    <section class="text-gray-600 body-font dark:text-slate-300 ">
        <div class="container mx-auto flex px-5 py-10 items-center justify-center flex-col">
            <img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero"
                src="/images/zat_hero.png" />
            <div class="text-center lg:w-2/3 w-full">
                <h3 class=" sm:text-2xl text-1xl mb-3 font-normal text-gray-800 dark:text-slate-100 ">
                    قناة متخصصة ببث وتنظيم بطولات البلوت في المملكة العربية السعودية
                </h3>
                <p class="mb-8 leading-relaxed">
                    تهدف إلى نشر محتوى لعبة البلوت بشكل واسع في جميع أنحاء الوطن العربي ورفع التنافسية الى مستوى جديد في
                    عالم اللعبة الشهيرة، تضم القناة عدد من اللاعبين المحترفين الذين يتنافسون لحصد الجوائز والألقاب الموسمية
                    على مدار السنة وقد بلغ عدد الجوائز حتى الآن ما يتجاوز 200,000 ريال سعودي.

                </p>
                <div class="flex justify-center">
                    <NuxtLink to="/contact-us"
                        class=" btn inline-flex text-white bg-amber-500 border-0 py-2 px-6 focus:outline-none hover:bg-amber-600 rounded text-lg">
                        تواصل
                        معنا</NuxtLink>

                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
useHead({
    title: `زات - من نحن`,
})
</script>

<style scoped></style>