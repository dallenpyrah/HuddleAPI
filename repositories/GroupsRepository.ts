import { Group, PrismaClient } from '@prisma/client'
import IGroupsRepository from '../interfaces/IGroupsRepository'

export default class GroupsRepository implements IGroupsRepository {
  private readonly prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
    this.getNewestGroups = this.getNewestGroups.bind(this)
  }

  async getNewestGroups (): Promise<Group[] | undefined> {
    try {
      return await this.prisma.group.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        take: 4
      }
      )
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
