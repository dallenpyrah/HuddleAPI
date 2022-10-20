import { Issue } from '@prisma/client'

export default interface IIssue {
  getIssuesByUserId: (userId: number) => Promise<Issue[]>
  getCommunityIssues: () => Promise<Issue[] | undefined>
  getFilteredCommunityIssues: (filter: string) => Promise<Issue[] | undefined>
}
