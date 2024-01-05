import champState from "./ChampState"
import champType from "./ChampType"

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
    name: string,
    laws: string,
    start_at: string,
    end_at: string,
    description: string,
    type: champType,
    state: champState,
    winner_name: string | null,
    winner_logo: string | null,
    league_logo: string | null,
    url: string | null,
    commitments: string,
    leagueid: number
}

export type { IChamp, IUpcomingChamp, IJoinChamp }
