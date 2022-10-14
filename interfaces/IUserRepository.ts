import { User } from '@prisma/client'

export default interface IUserRepository {
  getUserIdByFireBaseId: (fireBaseUserId: string) => Promise<User | null | undefined>
}
