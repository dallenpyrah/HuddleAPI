import IIssue from '../interfaces/IIssue'
import { Issue } from '@prisma/client'
import IUserRepository from '../interfaces/IUserRepository'

export default class IssuesService {
  private readonly issuesRepository: IIssue
  private readonly userRepository: IUserRepository

  constructor (issuesRepository: IIssue, userRepository: IUserRepository) {
    this.issuesRepository = issuesRepository
    this.userRepository = userRepository
    this.getIssuesByFireBaseId = this.getIssuesByFireBaseId.bind(this)
    this.getCommunityIssues = this.getCommunityIssues.bind(this)
    this.getFilteredCommunityIssues = this.getFilteredCommunityIssues.bind(this)
  }

  async getIssuesByFireBaseId (fireBaseUserId: string): Promise<Issue[]> {
    const user = await this.userRepository.getUserIdByFireBaseId(fireBaseUserId)

    if (user != null) {
      return await this.issuesRepository.getIssuesByUserId(user.id)
    } else {
      return []
    }
  }

  async getCommunityIssues (): Promise<Issue[]> {
    const communityIssues = await this.issuesRepository.getCommunityIssues()

    if (communityIssues != null) {
      return communityIssues
    } else {
      return []
    }
  }

  async getFilteredCommunityIssues (filter: string): Promise<Issue[]> {
    const communityIssues = await this.issuesRepository.getFilteredCommunityIssues(filter)

    if (communityIssues != null) {
      return communityIssues
    } else {
      return []
    }
  }
}
