interface IResponse<T> {
    data: T,
    meta: IMeta
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

export type { IResponse };