import type { Person } from "./IMatchFullDetails"

interface IPlayerLessDetails {
    id: number,
    name: string,
    image: string,
    isCaptain: boolean
}
interface IPlayerFullDetails {
    player_id: number,
    player_name: string,
    twitter_link: string | null,
    tiktok_link: string | null,
    youtube_link: string | null,
    snap_link: string | null,
    player_image: string,
    team_name: string,
    team_id: number,
    team_logo: string,
    transfers: ITransfer[]

}
interface ITeam {
    name: string,
    id: number,
    team_logo: string,
    players: IPlayerLessDetails[],
    coaches: Person[]
}

interface ITeamLessDetails {
    id: number,
    name: string,
    founded_in: string,
    team_logo: string,
    winning_count: string
}
interface ITeamFullDetails {
    id: number,
    name: string,
    founded_in: string,
    team_logo: string,
    winning_count: string,
    players: IPlayerLessDetails[],
    champs: IChampLessDetails[],
    statistics: ITeamStatistics,
    transfers: ITransfer[],
    coaches: Person[]
}
interface ITeamStatistics {
    "عدد المباريات": number,
    "عدد الصكات الملعوبة": number,
    "عدد الصكات المربوحة": number,
    "عدد الصكات الخاسرة": number,
    "الابناط": number,
    "الاكك": number,
    "الأكلات": number,
    "مشترى صن": number,
    "مشترى حكم": number,
    "مشتريات ناجحة": number,
    "مشتريات خسرانة": number,
    "سرا": number,
    "بلوت": number,
    "خمسين": number,
    "مية": number,
    "أربعمية": number,
    "عدد الكبابيت صن": number,
    "عدد الكبابيت حكم": number
}
interface IChampLessDetails {
    name: string,
    end_at: string,
    logo: string,
    id: number
}
interface ITransfer {
    transfered_at: string,
    from_team_name: string,
    from_team_logo: string,
    name: string,
    image: string,
    to_team_name: string,
    to_team_logo: string,
    player_id: number
}
interface GetAllTeamsResponse {
    teams: ITeamLessDetails[]
}
interface GetTeamByIdResponse {
    data: ITeamFullDetails
}
interface GetPlayerByIdResponse {
    data: IPlayerFullDetails
}
export type {
    ITeam, ITeamLessDetails, ITeamFullDetails, IPlayerFullDetails, IPlayerLessDetails, IChampLessDetails, ITransfer, ITeamStatistics, GetAllTeamsResponse, GetTeamByIdResponse, GetPlayerByIdResponse
}