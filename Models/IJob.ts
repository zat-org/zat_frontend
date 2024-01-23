interface IJob {
    id: number,
    attributes: {
        jobTitle: string,
        jobDescription: string,
        responsibilities: string,
        isApplyingOpen: boolean,
        createdAt: Date,
        updatedAt: Date
    }
}
interface IApplyToJobRequest {
    name: string,
    email: string,
    phone: string,
    address: string,
    aboutMe: string,
    cv: File | null,
}



export type { IJob, IApplyToJobRequest };