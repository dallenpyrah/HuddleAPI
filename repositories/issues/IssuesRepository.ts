import { Issue, PrismaClient } from "@prisma/client";
import IssueContract from "../../contracts/issue/IssueContract";

class IssuesRepository {
    async createIssue(issueToCreate: IssueContract) : Promise<Issue> { 
        const prisma = new PrismaClient();
        try {
            const createdIssue = await prisma.issue.create({
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
            await prisma.$disconnect();
        }
    }
}

export const issuesRepository = new IssuesRepository();

