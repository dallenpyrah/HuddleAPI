import { Group, Issue } from '@prisma/client'
import IGroupContract from "../contracts/IGroupContract";

export default interface IGroupsRepository {
  getNewestGroups: () => Promise<Group[] | undefined>
  createGroup: (groupToCreate: IGroupContract) => Promise<Group>
  getGroupById: (groupId: number) => Promise<Group | null>
  getIssuesByGroupId: (groupId: number) => Promise<Issue[] | null>
}
