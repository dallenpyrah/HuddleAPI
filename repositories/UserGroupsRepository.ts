import { PrismaClient, UserGroups } from '@prisma/client'
import IUserGroup from '../interfaces/IUserGroup'

export default class UserGroupsRepository implements IUserGroup {
  private readonly prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
    this.getUserGroupsByUserId = this.getUserGroupsByUserId.bind(this)
  }

  async getUserGroupsByUserId (userId: number): Promise<UserGroups[]> {
    try {
      return await this.prisma.userGroups.findMany({
        where: {
          userId
        },
        include: {
          group: true
        }
      })
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
