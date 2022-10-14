import IIssue from '../interfaces/IIssue'
import { Issue } from '@prisma/client'
import IUserRepository from '../interfaces/IUserRepository'

export default class IssuesService {
  private readonly userIssuesRepository: IIssue
  private readonly userRepository: IUserRepository

  constructor (userIssuesRepository: IIssue, userRepository: IUserRepository) {
    this.userIssuesRepository = userIssuesRepository
    this.userRepository = userRepository
    this.getIssuesByFireBaseId = this.getIssuesByFireBaseId.bind(this)
  }

  async getIssuesByFireBaseId (fireBaseUserId: string): Promise<Issue[]> {
    const user = await this.userRepository.getUserIdByFireBaseId(fireBaseUserId)

    if (user != null) {
      return await this.userIssuesRepository.getIssuesByUserId(user.id)
    } else {
      return []
    }
  }
}
