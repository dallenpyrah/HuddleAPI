import {Issue} from '@prisma/client'
import IssueContract from "../contracts/IssueContract";

export default interface IIssueRepository {
    getIssuesByUserId: (userId: number) => Promise<Issue[]>
    getCommunityIssues: (limit: number, afterId: number) => Promise<Issue[] | undefined>
    getFilteredCommunityIssues: (filter: string) => Promise<Issue[] | undefined>

    createIssue(issue: IssueContract): Promise<Issue>;
}
