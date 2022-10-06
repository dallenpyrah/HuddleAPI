import { Issue, PrismaClient } from '@prisma/client'
import IIssue from '../interfaces/IIssue'

export default class IssuesRepository implements IIssue {
  private readonly prismaClient: PrismaClient

  constructor (prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
    this.getUserIssues = this.getUserIssues.bind(this)
  }

  async getUserIssues (userId: number): Promise<Issue[]> {
    try {
      return await this.prismaClient.issue.findMany({
        where: {
          userId
        }
      })
    } finally {
      await this.prismaClient.$disconnect()
    }
  }
}
