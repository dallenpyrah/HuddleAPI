import { User } from '@prisma/client'

export default interface IUserRepository {
  getUserByFireBaseId: (fireBaseUserId: string) => Promise<User | null | undefined>
}
