<template>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 mb-3" v-if="!pending && !error">
        <div v-for="team in teams" :key="team.id"
            class=" bg-zinc-100 rounded-xl shadow-lg p-4 flex flex-col justify-center items-center space-y-2 ">
            <h4 class="font-bold text-lg">
                فريق {{ team.name }}
            </h4>
            <div class="avatar team-avatar ">
                <div class=" w-16 sm:w-20 md:w-24 rounded-xl bg-white p-1  shadow-lg ">
                    <img :src="url + team.logo" :alt="team.name" />
                </div>
            </div>


            <div class="grid grid-cols-3 w-full mt-2">
                <div v-for="player in team.players" :key="player.id" class=" flex flex-col justify-start items-center">
                    <div class="avatar ">
                        <div class=" w-12 sm:w-16 md:w-20 rounded-xl shadow-lg  ">
                            <img class="object-top" :src="url + player.image" :alt="player.name" />
                        </div>
                    </div>
                    <p class="text-sm text-center font-semibold mt-2 text-amber-900">
                        {{ player.name }}
                    </p>
                    <p class="text-xs text-amber-500">
                        {{ player.is_captain ? `كابتن الفريق` : `لاعب بالفريق` }}
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="pending" class="text-zinc-700 flex flex-col space-y-4 justify-center items-center p-10">
        <Icon name="svg-spinners:blocks-shuffle-3" class="text-4xl block" />
        <h2 class="font-semibold">تحميل</h2>
    </div>
    <div v-else-if="error" class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center p-4">
        <Icon name="line-md:close-circle" class="block text-9xl text-red-500" />
        <h3>{{ error }}</h3>
    </div>
</template>

<script setup >
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 
const client = useStrapiClient()
const teams = ref(null)
const error = ref(null)
const pending = ref(false)
const route = useRoute()
onBeforeMount(() => {
    pending.value = true
    client(`/leagues/${route.params.id}/teams`, { method: 'GET' })
        .then((data) => {
            teams.value = data.teams
            pending.value = false

        }).catch((err) => {
            console.error(err)
            error.value = "تعذر تحميل البيانات."
            pending.value = false

        })
})
</script>

<style scoped>
.team-avatar img {
    object-fit: contain;
}
</style>4