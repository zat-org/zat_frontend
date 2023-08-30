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
export { IBlogFullDetails }
export default IBlog; 