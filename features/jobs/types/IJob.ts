interface IJob {
  id: number
  jobTitle: string
  jobDescription: string
  responsibilities: string
  isApplyingOpen: boolean
  createdAt: Date
  updatedAt: Date
}

interface IJobsListResult {
  jobs: IJob[]
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

interface IApplyToJobRequest {
  name: string
  email: string
  phone: string
  address: string
  aboutMe: string
  cv: File | null
}

export type { IJob, IJobsListResult, IApplyToJobRequest }
