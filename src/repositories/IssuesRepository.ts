import {Issue, PrismaClient} from '@prisma/client'
import IIssueRepo from '../interfaces/IIssueRepository'
import IssueContract from "../contracts/IssueContract";

export default class IssuesRepository implements IIssueRepo {
    private readonly prismaClient: PrismaClient

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
        this.getIssuesByUserId = this.getIssuesByUserId.bind(this)
        this.getCommunityIssues = this.getCommunityIssues.bind(this)
        this.getFilteredCommunityIssues = this.getFilteredCommunityIssues.bind(this)
        this.createIssue = this.createIssue.bind(this)
    }

    async getIssuesByUserId(userId: number): Promise<Issue[]> {
        return await this.prismaClient.issue.findMany({
            where: {
                userId
            },
            include: {
                group: true
            }
        })
    }

    async getCommunityIssues(limit: number, afterId: number): Promise<Issue[] | undefined> {
        return await this.prismaClient.issue.findMany({
            where: {
                id: {
                    gt: afterId
                }
            },
            take: limit,
            include: {
                user: true,
                group: true
            }
        })
    }

    async getFilteredCommunityIssues(filter: string): Promise<Issue[] | undefined> {
        return await this.prismaClient.issue.findMany({
            where: {
                title: {
                    contains: filter
                }
            },
            include: {
                user: true,
                group: true
            }
        })
    }

    async createIssue(issue: IssueContract): Promise<Issue> {
        return await this.prismaClient.issue.create({
            data: {
                title: issue.title,
                description: issue.description,
                status: 'OPEN',
                language: issue.language,
                framework: issue.framework,
                user: {
                    connect: {
                        id: issue.userId
                    }
                },
                group: {
                    connect: {
                        id: issue.groupId
                    }
                },
            },
            include: {
                user: true,
                group: true
            }
        })
    }

    async getIssueById(issueId: number): Promise<Issue | null> {
        return await this.prismaClient.issue.findUnique({
            where: {
                id: issueId
            },
            include: {
                user: true,
                group: true
            }
        })
    }
}
