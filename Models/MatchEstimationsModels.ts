interface ICreateMatchEstimation{
    loserScore: 0 | 1 ,
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
    }
}
export type {  ICreateMatchEstimation ,IGetEstimationResponse } 