interface IAnalyst {
    id: number,
    name: string
}

interface IStudio {
    name: string,
    id: number,
    url: string,
    start_at: string //date,
    tournament_name: string,
    analysts: IAnalyst[]
}
export type { IStudio, IAnalyst }; 