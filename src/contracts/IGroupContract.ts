import {User} from "@prisma/client";


export default interface IGroupContract {
    id: number
    name: string
    description: string
    color: string
    user: User
    fireBaseUserId: string

}
