
interface IError {
    data: any,
    error: {
        status: number,
        name: string,
        message: string,
        details: {
            code: string,
            message: string
        }
    }
}
interface ILoginConfirmed {
    jwt: string,
    user: IUser
}
interface IUser {
    id: number,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: Date,
    updatedAt: Date,
    qydha_Id: string,
    phone: string,
    avatar_url: string | null,
    name: string | null
}
export type { IError, ILoginConfirmed, IUser }; 