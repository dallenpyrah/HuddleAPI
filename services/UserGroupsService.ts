import UserGroupsRepository from '../repositories/UserGroupsRepository'
import { UserGroups } from '@prisma/client'
import IUserRepository from '../interfaces/IUserRepository'

export default class UserGroupsService {
  private readonly userGroupsRepository
  private readonly userRepository

  constructor (userGroupsRepository: UserGroupsRepository, userRepository: IUserRepository) {
    this.userGroupsRepository = userGroupsRepository
    this.userRepository = userRepository
    this.getUserGroupsByFireBaseId = this.getUserGroupsByFireBaseId.bind(this)
  }

  async getUserGroupsByFireBaseId (fireBaseUserId: string): Promise<UserGroups[]> {
    const user = await this.userRepository.getUserIdByFireBaseId(fireBaseUserId)

    if (user != null) {
      return await this.userGroupsRepository.getUserGroupsByUserId(user.id)
    } else {
      return []
    }
  }
}
