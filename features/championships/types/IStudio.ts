import type { IStartAt } from "~/features/shared/types/IStartAt";

interface IAnalyst {
    id: number,
    name: string
}

interface IStudio extends IStartAt {
    name: string,
    id: number,
    url: string,
    tournament_name: string,
    analysts: IAnalyst[]
}
export type { IStudio, IAnalyst }; 