import { Issue } from '@prisma/client'

export default interface IIssue {
  getIssuesByUserId: (userId: number) => Promise<Issue[]>
}
