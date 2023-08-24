interface Player {
    id: number,
    name: string,
    image: string,
    is_captain: boolean
}

interface ITeam {
    name: string,
    id: number,
    logo: string,
    players: Player[]
}
export default ITeam; 