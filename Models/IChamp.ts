import ChampState from "./ChampState"
import ChampType from "./ChampType"
import type { ITeam } from "@/Models/ITeam"
import type { IStudio } from "@/Models/IStudio"
import type { IMatchLessDetails } from "@/Models/IMatchLessDetails"
import type { ICupMatchNode } from "./ICupSummary"

interface IUpcomingChamp {
    id: number,
    name: string,
    logo_background: string,
    champ_logo: string
}
interface IJoinChamp {
    id: number,
    name: string,
    champ_logo: string
}
interface IChamp {
    leagueid: number,
    name: string,
    start_at: string,
    end_at: string,
    description: string,
    type: ChampType,
    state: ChampState,
    winner_name: string | null,
    league_logo: string | null,
    url: string | null,
    winner_logo: string | null,
    laws: string
}
interface IGetAllChampionsResponse {
    champs: IChamp[]
}

interface IGetChampDetailsResponse {
    id: string,
    name: string,
    url: string,
    end_at: string,
    type: ChampType,
}
interface IGetChampTeamsResponse extends IGetChampDetailsResponse {
    teams: ITeam[]
}
interface TeamSummary {
    id: number,
    win: number,
    lost: number,
    name: string,
    play: number,
    abnat: string,
}
interface LeagueTeamSummary extends TeamSummary {
    totalScore: number,
    totalScoreForAbnat: number,
    totalNumberOfRounds: number
}
interface HezamTeamSummary extends TeamSummary {
    consecutiveWins: number,
}
interface IGetChampSummaryResponse extends IGetChampDetailsResponse {
    table: HezamTeamSummary[] | LeagueTeamSummary[] | ICupMatchNode
}
interface IGetChampStudiosResponse extends IGetChampDetailsResponse {
    studios: IStudio[]
}

interface IGetChampMatchesResponse extends IGetChampDetailsResponse {
    matches: IMatchLessDetails[]
}
export type { IChamp, IUpcomingChamp, IJoinChamp, IGetAllChampionsResponse, IGetChampTeamsResponse, IGetChampSummaryResponse, HezamTeamSummary, LeagueTeamSummary, IGetChampStudiosResponse, IGetChampMatchesResponse }
