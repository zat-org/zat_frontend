import type ChampType from './ChampType'
import type LeagueState from './ChampState'
import type MatchState from './MatchState'

export type MatchHistoryStatus = 'previous' | 'upcoming'

export interface IMatchHistoryTeam {
    id: number
    name: string
    logo: string
    score: number | null
    abnat: number | null
}

export interface IMatchHistoryMatch {
    id: number
    state: MatchState | string
    start_at: string
    number_of_rounds: number | null
    team_1: IMatchHistoryTeam
    team_2: IMatchHistoryTeam
}

export interface IMatchHistoryGroup {
    name: string
    matches: IMatchHistoryMatch[]
}

export interface IMatchHistoryChamp {
    id: number
    name: string
    type: ChampType | string
    state: LeagueState | string
    url: string | null
    groups: IMatchHistoryGroup[]
}

export interface IMatchHistoryResponse {
    champs: IMatchHistoryChamp[]
}

export interface IMatchHistoryParams {
    type: string
    status: MatchHistoryStatus
    limit?: number
}
