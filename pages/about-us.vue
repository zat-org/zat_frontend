<template>
    <section>
        <div class="flex flex-col items-center justify-center px-5 py-10">
            <NuxtImg class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero"
                src="https://storage.googleapis.com/qydha_bucket/zatbaloot_assets/zat_hero.png" />
            <div class="text-center lg:w-2/3 w-full">
                <h3 class="sm:text-2xl text-xl mb-5">
                    قناة متخصصة ببث وتنظيم بطولات البلوت في المملكة العربية السعودية
                </h3>
                <p>
                    تهدف إلى نشر محتوى لعبة البلوت بشكل واسع في جميع أنحاء الوطن العربي ورفع التنافسية الى مستوى جديد في
                    عالم اللعبة الشهيرة، تضم القناة عدد من اللاعبين المحترفين الذين يتنافسون لحصد الجوائز والألقاب الموسمية
                    على مدار السنة وقد بلغ عدد الجوائز حتى الآن ما يتجاوز 200,000 ريال سعودي.
                </p>
                <div class="flex justify-center mt-5">
                    <UButton class="transition-transform duration-500 ease-out hover:scale-105 active:scale-95"
                        icon="i-heroicons-chat-bubble-oval-left-ellipsis" size="lg" square variant="solid" to="/contact-us">
                        تواصل معنا
                    </UButton>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
useHead({
    title: `زات - من نحن`,
})
defineWebPage({
  '@type': 'AboutPage',
  name: ' من نحن',
  description: 'للمزيد من المعلومات عن زات - قناة متخصصة ببث وتنظيم بطولات البلوت في المملكة العربية السعودية',
})
</script>

<style scoped></style>