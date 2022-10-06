import { Issue } from '@prisma/client'

export default interface IIssue {
  getUserIssues: (userId: number) => Promise<Issue[]>
}
