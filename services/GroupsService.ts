import GroupsRepository from '../repositories/GroupsRepository'

export default class GroupsService {
  private readonly groupsRepository

  constructor (groupsRepository: GroupsRepository) {
    this.groupsRepository = groupsRepository
  }

  async createGroup (groupToCreate: any): Promise<any> {
    return await this.groupsRepository.createGroup(groupToCreate)
  }
}
