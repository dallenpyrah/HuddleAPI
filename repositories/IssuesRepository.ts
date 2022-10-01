import { Issue, PrismaClient } from "@prisma/client";
import IssueContract from "../contracts/IssueContract";

export default class IssuesRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createIssue(issueToCreate: IssueContract) : Promise<Issue> { 
        try {
            const createdIssue = await this.prisma.issue.create({
                data: {
                    title: issueToCreate.title,
                    description: issueToCreate.description,
                    status: issueToCreate.status,
                    userId: issueToCreate.userId,
                    language: issueToCreate.language,
                    framework: issueToCreate.framework,
                }
            });
            return createdIssue;
        } catch (error) {
            throw new Error(error);
        } finally {
            await this.prisma.$disconnect();
        }
    }
}

