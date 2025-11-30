<template>
    <section>
        <!-- Hero Section -->
      

        <!-- Vision Section -->
        <div class=" py-16 px-5">
            <div class="max-w-4xl mx-auto">
                <div class="flex items-center gap-4 mb-6">
                    <div class="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                        <UIcon name="i-heroicons-light-bulb" class="w-8 h-8 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h2 class="text-3xl font-bold text-amber-600 dark:text-amber-400">الرؤية</h2>
                </div>
                <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-amber-200 dark:border-amber-800">
                    <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                        "أن تكون زات مظلة مجتمع البلوت في العالم، عبر قيادة الابتكار وصناعة تجارب تجمع بين الترفيه والتقنية"
                    </p>
                </div>
            </div>
        </div>

        <!-- Mission Section -->
        <div class="py-16 px-5">
            <div class="max-w-4xl mx-auto">
                <div class="flex items-center gap-4 mb-6">
                    <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <UIcon name="i-heroicons-rocket-launch" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 class="text-3xl font-bold text-blue-600 dark:text-blue-400">الرسالة</h2>
                </div>
                <div class="bg-gradient-to-l from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-xl p-8 shadow-lg border border-blue-200 dark:border-blue-800">
                    <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                        تقديم تجربة بلوت متكاملة تجمع بين المنتجات المبتكرة، الحلول التقنية، بإدارة كفاءات متميزة تعزز متعة اللعب وترفع جودة التجربة للمجتمع المحلي والعالمي
                    </p>
                </div>
            </div>
        </div>

        <!-- Values Section -->
        <div class="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-5">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-12">
                    <div class="flex items-center justify-center gap-4 mb-4">
                        <div class="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                            <UIcon name="i-heroicons-heart" class="w-8 h-8 text-amber-600 dark:text-amber-400" />
                        </div>
                        <h2 class="text-3xl font-bold text-amber-600 dark:text-amber-400">القيم</h2>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400">المبادئ التي نؤمن بها ونسير عليها</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Value 1: Passion -->
                    <div class="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg group-hover:scale-110 transition-transform">
                                <UIcon name="i-heroicons-heart" class="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">الشغف</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Passion</p>
                            </div>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                            دافعنا الرئيسي هو حب اللعبة والمجتمع، مما يحفزنا على تقديم أفضل تجربة دائمًا.
                        </p>
                    </div>

                    <!-- Value 2: Innovation -->
                    <div class="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
                                <UIcon name="i-heroicons-sparkles" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">الابتكار</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Innovation</p>
                            </div>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                            نسعى لتجربة جديدة وفريدة تجمع بين التقنية والإبداع، ونبتكر حلولًا تجعل مجتمع البلوت أكثر تميزًا.
                        </p>
                    </div>

                    <!-- Value 3: Authenticity -->
                    <div class="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:scale-110 transition-transform">
                                <UIcon name="i-heroicons-shield-check" class="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">الأصالة</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Authenticity</p>
                            </div>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                            نحافظ على هوية زات المميزة ونعكس الثقافة المحلية بأسلوب عالمي أصيل.
                        </p>
                    </div>

                    <!-- Value 4: Excellence -->
                    <div class="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:scale-110 transition-transform">
                                <UIcon name="i-heroicons-star" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">التجربة المتميزة</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Excellence in Experience</p>
                            </div>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                            نحرص على تقديم تجربة متكاملة وممتعة للمستخدمين، من جودة اللعب إلى التفاعل المجتمعي.
                        </p>
                    </div>

                    <!-- Value 5: Fun -->
                    <div class="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700 md:col-span-2 lg:col-span-1">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg group-hover:scale-110 transition-transform">
                                <UIcon name="i-heroicons-face-smile" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">المتعة</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Fun & Enjoyment</p>
                            </div>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                            نخلق تجربة ممتعة ومسلية لجميع اللاعبين، تجعل كل تفاعل مع زات مليئًا بالبهجة والتشويق.
                        </p>
                    </div>
             
                </div>
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