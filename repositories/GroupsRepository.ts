import { Group, PrismaClient } from '@prisma/client'
import IGroupsRepository from '../interfaces/IGroupsRepository'

export default class GroupsRepository implements IGroupsRepository {
  private readonly prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
    this.getNewestGroups = this.getNewestGroups.bind(this)
    this.createGroup = this.createGroup.bind(this)
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

  async createGroup (groupToCreate: any): Promise<Group> {
    try {
      return await this.prisma.group.create({
        data: {
          name: groupToCreate.name,
          description: groupToCreate.description,
          color: groupToCreate.color,
          created: {
            connect: {
              id: groupToCreate.user.id
            }
          },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        include: {
          created: true
        }
      })
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
