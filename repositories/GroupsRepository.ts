import { Group, PrismaClient } from '@prisma/client'

export default class GroupsRepository {
  private readonly prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
  }

  async createGroup (groupToCreate: any): Promise<Group> {
    try {
      return await this.prisma.group.create({
        data: {
          name: groupToCreate.name,
          description: groupToCreate.description,
          creatorId: groupToCreate.userId,
          color: groupToCreate.color
        }
      })
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
