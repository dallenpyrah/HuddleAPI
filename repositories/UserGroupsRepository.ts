import { PrismaClient, UserGroups } from '@prisma/client'
import IUserGroup from '../interfaces/IUserGroup'

export default class UserGroupsRepository implements IUserGroup {
  private readonly prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
    this.getUserGroupsByUserId = this.getUserGroupsByUserId.bind(this)
    this.createUserGroup = this.createUserGroup.bind(this)
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

  async createUserGroup (userGroup: any): Promise<UserGroups> {
    try {
      return await this.prisma.userGroups.create({
        data: {
          user: {
            connect: {
              id: userGroup.created.id
            }
          },
          group: {
            connect: {
              id: userGroup.id
            }
          }
        }
      })
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
