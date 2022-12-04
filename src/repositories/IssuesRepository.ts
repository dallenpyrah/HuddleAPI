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
        try {
            return await this.prismaClient.issue.findMany({
                where: {
                    userId
                },
                include: {
                    group: true
                }
            })
        } finally {
            await this.prismaClient.$disconnect()
        }
    }

    async getCommunityIssues(limit: number, afterId: number): Promise<Issue[] | undefined> {
        try {
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
        } finally {
            await this.prismaClient.$disconnect()
        }
    }

    async getFilteredCommunityIssues(filter: string): Promise<Issue[] | undefined> {
        try {
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
        } finally {
            await this.prismaClient.$disconnect()
        }
    }

    async createIssue(issue: IssueContract): Promise<Issue> {
        try {
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
        } finally {
            await this.prismaClient.$disconnect()
        }
    }
}
