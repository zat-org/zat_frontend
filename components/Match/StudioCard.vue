<template>
    <div dir="rtl" class="bg-white rounded-lg shadow-lg relative text-white">
        <div class="flex items-center justify-between background-color px-2 py-1 rounded-t-lg">
            <p class="w-1/3 flex justify-center items-center">
                الجولة
                {{ parseInt(props.studio.tournament_name).toLocaleString('ar-Eg') }}
            </p>
            <div class="w-1/3 flex justify-center items-center">
                <div v-if="props.studio.url" @click.prevent="handleYoutubeClick" style="cursor: pointer;"
                    class="h-10 w-10 bg-white rounded-full flex justify-center items-center">
                    <Icon name="ion:logo-youtube" class="text-red-600" size="30"></Icon>
                </div>
            </div>
            <p class="w-1/3 flex items-center justify-center">
                {{ new Date(props.studio.start_at).toLocaleDateString("ar-EG") }}
                <Icon name="fontisto:date" size="18" class="mx-1 text-white" />
            </p>
        </div>

        <div class="flex items-center justify-between p-3">
            <div>
                <div class=" bg-amber-400 text-4xl md:text-6xl p-4  rounded-full flex justify-center items-center">
                    <Icon class="micro_icon" name="emojione-v1:studio-microphone" />
                </div>
            </div>
            <div class="text-center text-black flex flex-col space-y-3  grow">
                <h5 class="font-semibold text-md md:text-lg ">{{ props.studio.name }}</h5>
                <div class="flex justify-center items-center">
                    <span class="mx-2">{{ props.studio.analysts.length > 1 ? 'المحللين' : 'المحلل' }}</span>
                    <div v-for="analyst in props.studio.analysts"
                        class="bg-amber-400 px-5 py-0.5 font-semibold rounded-full">
                        {{ analyst.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> 

<script setup>
const props = defineProps(["studio"])

function handleYoutubeClick(event) {
    window.open(props.studio.url, "_blank")
    event.stopImmediatePropagation()
}
</script>

<style scoped>
.background-color {
    background: #ffb347;
    background-image: linear-gradient(90.1deg, rgba(84, 212, 228, 1) 0.2%, rgba(68, 36, 164, 1) 99.9%);
}
</style>    


