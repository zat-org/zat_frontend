import champState from "./ChampState"
import champType from "./champType"

export default interface IChamp {
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
    leagueid: number
}