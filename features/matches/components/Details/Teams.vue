<template>
    <section
        v-if="hasContent"
        class="relative w-full overflow-hidden bg-surface-base py-6"
        aria-label="اعضاء الفريق"
        dir="rtl"
    >
        <img
            :src="cupBg"
            alt=""
            class="pointer-events-none absolute -inset-s-16 top-8 hidden w-[min(612px,55vw)] opacity-90 lg:block"
            aria-hidden="true"
        >
        <img
            :src="logoFrame"
            alt=""
            class="pointer-events-none absolute inset-s-1/2 top-1/2 hidden w-58.75 translate-x-1/2 -translate-y-1/2 opacity-90 lg:block"
            aria-hidden="true"
        >
        <div
            class="pointer-events-none absolute inset-s-1/2 top-[40%] size-81.25 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#231F1F] opacity-40 blur-[200px]"
            aria-hidden="true"
        />

        <div class="page-container relative z-10 flex flex-col gap-6">
            <ChampionshipsSectionDivider title="اعضاء الفريق" />

            <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-6">
                <div
                    v-if="team1Members.length"
                    class="flex flex-col items-center gap-4"
                >
                    <div class="flex size-20 items-center justify-center rounded-zat-md bg-surface-overlay p-2">
                        <Image
                            v-if="match.team1.logo"
                            :src="mediaBaseUrl + match.team1.logo"
                            :alt="match.team1.name"
                            icon="i-heroicons-user-group"
                            class="size-16 object-contain"
                        />
                    </div>
                    <div class="flex flex-wrap justify-center gap-4">
                        <MatchDetailsMemberCard
                            v-for="member in team1Members"
                            :key="`t1-${member.person.id}-${member.role}`"
                            :person="member.person"
                            :role="member.role"
                        />
                    </div>
                </div>

                <div
                    v-if="team2Members.length"
                    class="flex flex-col items-center gap-4"
                >
                    <div class="flex size-20 items-center justify-center rounded-zat-md bg-surface-overlay p-2">
                        <Image
                            v-if="match.team2.logo"
                            :src="mediaBaseUrl + match.team2.logo"
                            :alt="match.team2.name"
                            icon="i-heroicons-user-group"
                            class="size-16 object-contain"
                        />
                    </div>
                    <div class="flex flex-wrap justify-center gap-4">
                        <MatchDetailsMemberCard
                            v-for="member in team2Members"
                            :key="`t2-${member.person.id}-${member.role}`"
                            :person="member.person"
                            :role="member.role"
                        />
                    </div>
                </div>
            </div>

            <div
                v-if="refereeMembers.length"
                class="mt-12 flex flex-col items-center gap-4 pt-8"
            >
                <ChampionshipsSectionDivider title="التحكيم" />
                <div class="flex flex-wrap justify-center gap-4">
                    <MatchDetailsMemberCard
                        v-for="member in refereeMembers"
                        :key="`ref-${member.person.id}`"
                        :person="member.person"
                        :role="member.role"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { IMatchFullDetails, Person } from '~/features/matches/types/IMatchFullDetails'
import cupBg from '~/assets/images/matches/teams-cup-bg.svg'
import logoFrame from '~/assets/images/matches/teams-logo-frame.svg'

const props = defineProps<{
    match: IMatchFullDetails
}>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl

type Member = { person: Person, role: string }

const refereeRoles = ['حكم الطاولة', 'حكم مساعد', 'حكم النشرة']

function mapPlayers(players: Person[]): Member[] {
    return (players ?? []).map((person, index) => ({
        person,
        role: index === 0 ? 'كابتن الفريق' : 'لاعب',
    }))
}

const team1Members = computed<Member[]>(() => {
    const members = mapPlayers(props.match.team1.players)
    if (props.match.team1.coach) {
        members.push({ person: props.match.team1.coach, role: 'مدرب الفريق' })
    }
    return members
})

const team2Members = computed<Member[]>(() => {
    const members = mapPlayers(props.match.team2.players)
    if (props.match.team2.coach) {
        members.push({ person: props.match.team2.coach, role: 'مدرب الفريق' })
    }
    return members
})

const refereeMembers = computed<Member[]>(() =>
    (props.match.referees ?? []).map((person, index) => ({
        person,
        role: refereeRoles[index] ?? 'حكم',
    })),
)

const hasContent = computed(
    () =>
        team1Members.value.length > 0
        || team2Members.value.length > 0
        || refereeMembers.value.length > 0,
)
</script>
