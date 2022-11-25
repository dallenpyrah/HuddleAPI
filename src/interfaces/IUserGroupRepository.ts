import {UserGroups} from '@prisma/client'

export default interface IUserGroupRepository {
    getUserGroupsByUserId: (userId: number) => Promise<UserGroups[]>
}
