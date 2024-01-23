interface IReferee {
    id: number,
    name: string,
    start_refereeing_at: string,
    image: string,
    refereed_matches_count: string
}
interface IJoinAsRefereeRequest {
    name: string,
    email: string,
    phone: string,
    address: string,
    birthDate: string,
    experience: number,
    IsJudgedBefore: string,
}
export type { IReferee, IJoinAsRefereeRequest };