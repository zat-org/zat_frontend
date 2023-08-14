<template>
    <div v-if="match.team1.players?.length > 0 && match.team1.players?.length > 0">
        <div class="divider">لاعبي الفريقين</div>
        <div class="flex text-gray-500 justify-around  text-sm">
            <div>
                <div v-for="player, index in match.team1.players" :key="player.id"
                    class="flex justify-start  items-center  mb-3">
                    <div class="avatar me-4">
                        <div class=" w-10 sm:w-16 md:w-20 rounded-xl shadow-lg ">
                            <img class="object-top" :src="url + player.image" :alt="player.name" />
                        </div>
                    </div>
                    <div class="">
                        <p class="text-gray-950 text-right">
                            {{ player.name }}
                        </p>
                        <p class="text-xs text-right">
                            {{ index === 0 ? `كابتن الفريق` : `لاعب بالفريق` }}
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div v-for="player, index in match.team2.players" :key="player.id"
                    class="flex justify-end  items-center mb-3">
                    <div class="">
                        <p class="text-gray-950 text-left">
                            {{ player.name }}
                        </p>
                        <p class="text-xs text-left">
                            {{ index === 0 ? `كابتن الفريق` : `لاعب بالفريق` }}
                        </p>
                    </div>
                    <div class="avatar ms-4  ">
                        <div class=" w-10 sm:w-16 md:w-20 rounded-xl shadow-lg ">
                            <img class=" object-top" :src="url + player.image" :alt="player.name" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 

const props = defineProps(["match"])
</script>

<style scoped></style>
