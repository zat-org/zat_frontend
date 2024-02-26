import type { IStartAt } from "./IStartAt";
import MatchState from "./MatchState";


interface IMatchLessDetails extends IStartAt {
    id: number,
    team_1_name: string,
    team_1_score: number,
    team_1_logo: string,
    team_2_name: string,
    team_2_score: number,
    team_2_logo: string,
    state: MatchState,
    url: string,
    tournament_name: string,
    name: string,
    type: "official" | "friendly"
    league_id: number
}

export type { IMatchLessDetails };
