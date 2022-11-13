import { Group, Issue, PrismaClient } from '@prisma/client'
import IGroupsRepository from '../interfaces/IGroupsRepository'

export default class GroupsRepository implements IGroupsRepository {
  private readonly prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
    this.getNewestGroups = this.getNewestGroups.bind(this)
    this.createGroup = this.createGroup.bind(this)
    this.getGroupById = this.getGroupById.bind(this)
    this.getIssuesByGroupId = this.getIssuesByGroupId.bind(this)
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

  async getGroupById (groupId: number): Promise<Group | null> {
    try {
      return await this.prisma.group.findUnique({
        where: {
          id: groupId
        },
        include: {
          created: true
        }
      })
    } finally {
      await this.prisma.$disconnect()
    }
  }

  async getIssuesByGroupId (groupId: number): Promise<Issue[] | null> {
    try {
      return await this.prisma.issue.findMany({
        where: {
          groupId
        },
        include: {
          user: true
        }
      })
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
