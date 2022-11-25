import IIssueRepo from '../interfaces/IIssueRepository'
import {Issue} from '@prisma/client'
import IUserRepository from '../interfaces/IUserRepository'

export default class IssuesService {
    private readonly issuesRepository: IIssueRepo
    private readonly userRepository: IUserRepository

    constructor(issuesRepository: IIssueRepo, userRepository: IUserRepository) {
        this.issuesRepository = issuesRepository
        this.userRepository = userRepository
        this.getIssuesByFireBaseId = this.getIssuesByFireBaseId.bind(this)
        this.getCommunityIssues = this.getCommunityIssues.bind(this)
        this.getFilteredCommunityIssues = this.getFilteredCommunityIssues.bind(this)
    }

    async getIssuesByFireBaseId(fireBaseUserId: string): Promise<Issue[]> {
        const user = await this.userRepository.getUserByFireBaseId(fireBaseUserId)

        if (user != null) {
            return await this.issuesRepository.getIssuesByUserId(user.id)
        } else {
            return []
        }
    }

    async getCommunityIssues(limit: number, afterId: number): Promise<Issue[]> {
        const communityIssues = await this.issuesRepository.getCommunityIssues(limit, afterId)

        if (communityIssues != null) {
            return communityIssues
        } else {
            return []
        }
    }

    async getFilteredCommunityIssues(filter: string): Promise<Issue[]> {
        const communityIssues = await this.issuesRepository.getFilteredCommunityIssues(filter)

        if (communityIssues != null) {
            return communityIssues
        } else {
            return []
        }
    }
}
