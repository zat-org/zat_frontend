<template>
    <section
        v-if="hasContent"
        class="relative w-full overflow-hidden bg-surface-base py-6"
        aria-label="اعضاء الفريق"
        dir="rtl"
    >
        <div
            class="pointer-events-none absolute -inset-s-8 top-4 aspect-[650/744] w-[min(280px,55vw)] opacity-30 sm:-inset-s-12 sm:top-6 sm:w-[min(420px,50vw)] sm:opacity-40 lg:-inset-s-16 lg:top-8 lg:w-[min(612px,55vw)] lg:opacity-55 dark:opacity-20 sm:dark:opacity-25 lg:dark:opacity-35"
            :style="cupMaskStyle"
            aria-hidden="true"
        />
        <div
            class="pointer-events-none absolute inset-s-1/2 top-1/2 hidden aspect-[235/128] w-[min(235px,36vw)] -translate-x-1/2 -translate-y-1/2 opacity-40 md:block lg:opacity-55 dark:opacity-20 lg:dark:opacity-30"
            :style="logoFrameMaskStyle"
            aria-hidden="true"
        />
        <div
            class="pointer-events-none absolute inset-s-1/2 top-[40%] size-[min(325px,70vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface-raised opacity-40 blur-[120px] sm:size-81.25 sm:blur-[200px] dark:bg-surface-overlay"
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

const cupMaskStyle = {
    backgroundColor: 'var(--zat-poker-pattern-color)',
    maskImage: `url(${cupBg})`,
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskImage: `url(${cupBg})`,
    WebkitMaskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
}

const logoFrameMaskStyle = {
    backgroundColor: 'var(--zat-poker-pattern-color)',
    maskImage: `url(${logoFrame})`,
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskImage: `url(${logoFrame})`,
    WebkitMaskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
}

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
