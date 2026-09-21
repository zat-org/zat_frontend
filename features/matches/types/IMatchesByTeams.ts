import type { IMeta, IPagination } from '~/features/shared/types/IResponse'
import type { IMatchLessDetails } from '~/features/matches/types/IMatchLessDetails'
import type MatchState from '~/features/matches/types/MatchState'

export interface IMatchesByTeamsParams {
    teamIds: Array<number | string>
    page?: number
    pageSize?: number
}

/** Raw match item from GET /api/match/by-teams */
export interface IMatchByTeam {
    id: number
    team_1_id: number
    team_1_name: string
    team_1_score: number
    team_1_logo: string
    team_2_id: number
    team_2_name: string
    team_2_score: number
    team_2_logo: string
    state: MatchState | string
    start_at: string
    league_id: number
    league_name: string
    tournament_name: string
    type: 'official' | 'friendly'
    url: string | null
    name?: string | null
    start_estimations?: string | null
    end_estimations?: string | null
}

/** Exact wire response from GET /api/match/by-teams */
export interface IMatchesByTeamsApiResponse {
    matches: IMatchByTeam[]
    meta: IMeta
}

/** Normalized result used by the UI (pagination flattened) */
export interface IMatchesByTeamsResponse {
    matches: IMatchLessDetails[]
    pagination: IPagination
}
