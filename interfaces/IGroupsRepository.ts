import { Group } from '@prisma/client'

export default interface IGroupsRepository {
  getNewestGroups: () => Promise<Group[] | undefined>
  createGroup: (groupToCreate: any) => Promise<Group>
}
