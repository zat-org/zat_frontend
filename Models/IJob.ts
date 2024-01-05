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
interface IPagination {
    page: number,
    pageSize: number,
    pageCount: number,
    total: number
}
interface IMeta {
    pagination: IPagination
}

interface IJobsResponse {
    data: IJob[],
    meta: IMeta
}
export type { IJobsResponse, IJob };