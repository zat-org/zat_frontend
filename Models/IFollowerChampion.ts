interface IFollowerChampion {
    id: number,
    attributes: {
        name: string,
        descriptions: string,
        IsApplyOpen: boolean,
        Commitments: string,
        createdAt: Date,
        updatedAt: Date,
        publishedAt: Date
    }
}
interface IFollowerChampionApplyRequest {
    teamName: string,
    email: string,
    phone: string,
    fpName: string,
    fpCity: string,
    fpBirthDate: string,
    fpExperience: number,
    spName: string,
    spCity: string,
    spBirthDate: string,
    spExperience: number,
    IsPlayedBefore: string,
    approveCommitments: boolean,
}

export type { IFollowerChampion, IFollowerChampionApplyRequest }; 