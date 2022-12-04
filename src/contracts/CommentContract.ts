import IssueContract from "./IssueContract";
import UserContract from "./UserContract";

export default interface CommentContract {
  id: number
  issueId: number
  issue: IssueContract
  userId: number
  user: UserContract
  createdAt: Date
  updatedAt: Date
  content: string
}
