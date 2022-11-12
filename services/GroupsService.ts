import IGroupsRepository from '../interfaces/IGroupsRepository'
import { Group, User } from '@prisma/client'
import IUserRepository from '../interfaces/IUserRepository'

export default class GroupsService {
  private readonly groupsRepository: IGroupsRepository
  private readonly userRepository: IUserRepository

  constructor (groupsRepository: IGroupsRepository, userRepository: IUserRepository) {
    this.groupsRepository = groupsRepository
    this.userRepository = userRepository
    this.getNewestGroups = this.getNewestGroups.bind(this)
    this.createGroup = this.createGroup.bind(this)
    this.getGroupById = this.getGroupById.bind(this)
  }

  async getNewestGroups (): Promise<Group[] | undefined> {
    return await this.groupsRepository.getNewestGroups()
  }

  async createGroup (groupToCreate: any): Promise<Group> {
    const user = await this.userRepository.getUserByFireBaseId(groupToCreate.fireBaseUserId)

    if (user !== undefined) {
      groupToCreate.user = user as User
      return await this.groupsRepository.createGroup(groupToCreate)
    } else {
      throw new Error('User could not be found with the given fireBaseUserId')
    }
  }

  async getGroupById (groupId: number): Promise<Group | null> {
    const group = await this.groupsRepository.getGroupById(groupId)

    if (group !== null) {
      return group
    } else {
      throw new Error('Group could not be found with the given id')
    }
  }
}
