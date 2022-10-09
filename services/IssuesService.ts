import IIssue from '../interfaces/IIssue'
import { Issue } from '@prisma/client'

export default class IssuesService {
  private readonly userIssuesRepository: IIssue

  constructor (userIssuesRepository: IIssue) {
    this.userIssuesRepository = userIssuesRepository
    this.getIssuesByUserId = this.getIssuesByUserId.bind(this)
  }

  async getIssuesByUserId (userId: number): Promise<Issue[]> {
    return await this.userIssuesRepository.getIssuesByUserId(userId)
  }
}
