<template>
    <div class="w-full">
        <FetchDataWrapper
            :error="error ? 'تعذر تحميل المباراة برجاء المحاولة لاحقا.' : null"
            :pending="pending"
        >
            <MatchDetails
                v-if="match"
                :match="match"
                :champ="champ || null"
                :champ-id="champId"
            />
        </FetchDataWrapper>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { $api } = useNuxtApp()

const champId = computed(() => String(route.params.id || ''))
const matchId = computed(() => String(route.params.mid || ''))

const [
    { data: match, error, pending },
    { data: champ },
] = await Promise.all([
    $api.matches.getById(matchId.value),
    $api.champions.getById(champId.value),
])

useHead({
    title: computed(() =>
        match.value
            ? `(${match.value.team1.name} ضد ${match.value.team2.name}) - ${match.value.leagueName}`
            : 'مباريات زات',
    ),
    meta: computed(() => [
        {
            name: 'description',
            content: match.value
                ? `تابع مباراة ${match.value.team1.name} ضد ${match.value.team2.name} في ${match.value.leagueName}. النتيجة المباشرة، التفاصيل الكاملة، والإحصائيات.`
                : 'مباريات بطولات البلوت في زات - نتائج مباشرة وتفاصيل كاملة',
        },
        {
            property: 'og:title',
            content: match.value
                ? `(${match.value.team1.name} ضد ${match.value.team2.name}) - ${match.value.leagueName}`
                : 'مباريات زات',
        },
        {
            property: 'og:description',
            content: match.value
                ? `تابع مباراة ${match.value.team1.name} ضد ${match.value.team2.name} في ${match.value.leagueName}. النتيجة المباشرة، التفاصيل الكاملة، والإحصائيات.`
                : 'مباريات بطولات البلوت في زات - نتائج مباشرة وتفاصيل كاملة',
        },
    ]),
})
</script>
