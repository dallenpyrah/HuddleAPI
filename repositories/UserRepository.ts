import IUserRepository from '../interfaces/IUserRepository'
import { PrismaClient, User } from '@prisma/client'
import pino from 'pino'

export default class UserRepository implements IUserRepository {
  private readonly prismaClient: PrismaClient
  private readonly logger = pino()

  constructor (prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
    this.getUserIdByFireBaseId = this.getUserIdByFireBaseId.bind(this)
  }

  async getUserIdByFireBaseId (fireBaseUserId: string): Promise<User | null | undefined> {
    try {
      return await this.prismaClient.user.findUnique({
        where: {
          fireBaseUserId
        }
      })
    } catch (error) {
      this.logger.error(error)
    } finally {
      await this.prismaClient.$disconnect()
    }
  }
}
