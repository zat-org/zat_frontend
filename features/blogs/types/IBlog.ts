interface IBlog {
    id: number,
    title: string,
    description: string,
    published_at: string,
    image: string
}
interface IBlogFullDetails extends IBlog {
    details: string,

}
interface IBlogResponse {
    data: IBlogFullDetails
}
interface IBlogsResponse {
    blogs: IBlog[],
    totalCount: string
}

export type { IBlog, IBlogFullDetails, IBlogsResponse, IBlogResponse };