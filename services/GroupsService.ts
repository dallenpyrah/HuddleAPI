import IGroupsRepository from '../interfaces/IGroupsRepository'
import { Group } from '@prisma/client'

export default class GroupsService {
  private readonly groupsRepository: IGroupsRepository

  constructor (groupsRepository: IGroupsRepository) {
    this.groupsRepository = groupsRepository
    this.getNewestGroups = this.getNewestGroups.bind(this)
  }

  async getNewestGroups (): Promise<Group[] | undefined> {
    return await this.groupsRepository.getNewestGroups()
  }
}
