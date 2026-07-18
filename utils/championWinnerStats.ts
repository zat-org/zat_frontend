import type { IChampSummaryWinner, IChampWinnerStats } from '~/Models/IChamp'

function parseAbnat(value: string | number | null | undefined): number | null {
    if (value === null || value === undefined) {
        return null
    }
    if (typeof value === 'number') {
        return Number.isFinite(value) ? value : null
    }
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : null
}

export function mapSummaryWinnerToStats(winner: IChampSummaryWinner): IChampWinnerStats {
    return {
        win: winner.win ?? null,
        draw: winner.tie ?? null,
        lost: winner.lost ?? null,
        play: winner.play ?? null,
        points: winner.points ?? null,
        abnat: parseAbnat(winner.abnat),
    }
}

export function displayStatValue(value: number | null | undefined): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
        return '-'
    }
    return String(value)
}

export function displayAbnatValue(value: number | null | undefined): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
        return '-'
    }
    return Number.isInteger(value) ? String(value) : value.toFixed(1)
}

export function displayTextValue(value: string | null | undefined): string {
    if (value === null || value === undefined || value.trim() === '') {
        return '-'
    }
    return value
}
