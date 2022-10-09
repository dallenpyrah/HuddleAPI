import UserGroupsRepository from '../repositories/UserGroupsRepository'
import { UserGroups } from '@prisma/client'

export default class UserGroupsService {
  private readonly userGroupsRepository

  constructor (userGroupsRepository: UserGroupsRepository) {
    this.userGroupsRepository = userGroupsRepository
    this.getUserGroupsByUserId = this.getUserGroupsByUserId.bind(this)
  }

  async getUserGroupsByUserId (userId: number): Promise<UserGroups[]> {
    return await this.userGroupsRepository.getUserGroupsByUserId(userId)
  }
}
