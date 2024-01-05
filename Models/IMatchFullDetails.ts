
import MatchState from "./MatchState";

interface Person {
    id: number,
    name: string,
    image: string
}
interface KeyNamePair {
    value: number,
    name: string
}
interface IMatchFullDetails {
    leagueName: string,
    state: MatchState,
    start_at: string,
    url: string,
    numberOfRounds: number,
    tournament: string,
    referees: Person[],
    team1: {
        id: number,
        name: string,
        score: number,
        logo: string,
        players: Person[],
        statistics: KeyNamePair[]
    },
    team2: {
        id: number,
        name: string,
        score: number,
        logo: string,
        players: Person[],
        statistics: KeyNamePair[]
    },
}

export type { IMatchFullDetails };