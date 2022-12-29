import IIssueRepo from '../interfaces/IIssueRepository'
import {Issue} from '@prisma/client'
import IUserRepository from '../interfaces/IUserRepository'
import IssueContract from "../contracts/IssueContract";

export default class IssuesService {
    private readonly issuesRepository: IIssueRepo
    private readonly userRepository: IUserRepository

    constructor(issuesRepository: IIssueRepo, userRepository: IUserRepository) {
        this.issuesRepository = issuesRepository
        this.userRepository = userRepository
        this.getIssuesByUserId = this.getIssuesByUserId.bind(this)
        this.getCommunityIssues = this.getCommunityIssues.bind(this)
        this.getFilteredCommunityIssues = this.getFilteredCommunityIssues.bind(this)
        this.createIssue = this.createIssue.bind(this)
        this.getIssueById = this.getIssueById.bind(this)
    }

    async getIssuesByUserId(userId: number): Promise<Issue[]> {
        if (userId > 0) {
            return await this.issuesRepository.getIssuesByUserId(userId)
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

    async createIssue(issue: IssueContract): Promise<Issue> {
        return await this.issuesRepository.createIssue(issue)
    }

    async getIssueById(issueId: number) {
        return await this.issuesRepository.getIssueById(issueId);
    }
}
