import type { IMatchFullDetails } from '~/Models/IMatchFullDetails'

export type MatchDisplayStats = {
    duration: number
    points: number
    abnat: number
}

const EMPTY_MATCH_STATS: MatchDisplayStats = { duration: 0, points: 0, abnat: 0 }

const ABNAT_LABELS = ['أبناط', 'الابناط', 'ابناط', 'abnat']
const POINTS_LABELS = ['نقاط', 'النقاط', 'points']

function normalizeLabel(value: string) {
    return value.trim().toLowerCase()
}

function findStatIndex(match: IMatchFullDetails, labels: string[]) {
    return match.team1.statistics.findIndex((stat) => {
        const name = normalizeLabel(stat.name)
        return labels.some(label => name.includes(normalizeLabel(label)))
    })
}

function combinedStatValue(match: IMatchFullDetails, labels: string[]) {
    const index = findStatIndex(match, labels)
    if (index === -1) {
        return 0
    }

    const team1Value = match.team1.statistics[index]?.value ?? 0
    const team2Value = match.team2.statistics[index]?.value ?? 0
    return team1Value + team2Value
}

export function mapMatchFullDetailsToStats(match: IMatchFullDetails | null | undefined): MatchDisplayStats {
    if (!match) {
        return EMPTY_MATCH_STATS
    }

    return {
        duration: match.numberOfRounds ?? 0,
        points: combinedStatValue(match, POINTS_LABELS),
        abnat: combinedStatValue(match, ABNAT_LABELS),
    }
}

export { EMPTY_MATCH_STATS }
