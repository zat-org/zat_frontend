interface ICreateMatchEstimation{
    loserScore: number ,
    countOf400: number,
    countOfKaboots: number,
    countOfRedCards: number,
    selectedWinnerId: number,
    bestPlayerId: number ,
    matchId : number
}
interface IGetEstimationResponse{
    id: number , 
    attributes:{
        loserScore: 0 | 1 ,
        countOf400: number,
        countOfKaboots: number,
        countOfRedCards: number,
        estimation_score:number | null
    }
}
interface IEstimationRecord {
    id: number,
    username: string,
    avatar_url: string|null,
    sum: string,
    count: string
}
interface IEstimationTable {
    data : IEstimationRecord[]
}
export type {  ICreateMatchEstimation ,IEstimationTable,IGetEstimationResponse } 