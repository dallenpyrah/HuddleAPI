import {User} from "@prisma/client";

export default interface GroupContract {
    id: number
    name: string
    description: string
    color: string
    user: User
    fireBaseUserId: string

}
