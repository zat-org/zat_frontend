interface ICreateMatchEstimation {
  loserScore: number
  countOf400: number
  countOfKaboots: number
  countOfRedCards: number
  selectedWinnerId: number
  bestPlayerId: number
  matchId: number
}

interface IEstimationRelation {
  id: number
  name?: string | null
  image?: string | null
  logo?: string | null
}

interface IMatchEstimation {
  id: number
  loserScore: 0 | 1
  countOf400: number
  countOfKaboots: number
  countOfRedCards: number
  estimation_score: number | null
  winner_team?: IEstimationRelation | number | null
  best_player?: IEstimationRelation | number | null
}

interface IUserEstimationsResult {
  items: IMatchEstimation[]
  total: number
}

interface IEstimationRecord {
  id: number
  username: string
  avatar_url: string | null
  sum: string
  count: string
}

interface IEstimationTable {
  data: IEstimationRecord[]
}

export type {
  ICreateMatchEstimation,
  IMatchEstimation,
  IEstimationRelation,
  IUserEstimationsResult,
  IEstimationTable,
  IEstimationRecord,
}
