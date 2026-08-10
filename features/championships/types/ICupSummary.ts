import MatchState from "./MatchState";

interface ICupMatchData {
    team1: ITeamData,
    team2: ITeamData,
    matchId: number,
    matchDate: Date,
    matchState: MatchState,
    team1Score: number,
    team2Score: number
}

interface ITeamData {
    name: string,
    teamId: number,
    logoUrl: string
}
export type { ICupMatchData, ITeamData };