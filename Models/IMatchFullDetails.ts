
import type { IStartAt } from "./IStartAt";
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
interface IMatchFullDetails extends IStartAt {
    leagueName: string,
    state: MatchState,
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