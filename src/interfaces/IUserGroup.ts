import { UserGroups } from '@prisma/client'

export default interface IUserGroup {
  getUserGroupsByUserId: (userId: number) => Promise<UserGroups[]>
}
