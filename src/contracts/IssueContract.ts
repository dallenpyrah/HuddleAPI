import GroupContract from "./GroupContract";
import UserContract from "./UserContract";
import CommentContract from "./CommentContract";

export default interface IssueContract {
  id: number
  groupId: number
  group: GroupContract
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  status: string
  userId: number
  user: UserContract
  comments: CommentContract[]
  language: string
  framework: string
}
