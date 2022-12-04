import UserGroupsRepository from '../repositories/UserGroupsRepository'
import {UserGroups} from '@prisma/client'
import IUserRepository from '../interfaces/IUserRepository'

export default class UserGroupsService {
    private readonly userGroupsRepository
    private readonly userRepository

    constructor(userGroupsRepository: UserGroupsRepository, userRepository: IUserRepository) {
        this.userGroupsRepository = userGroupsRepository
        this.userRepository = userRepository
        this.getUserGroupsByUserId = this.getUserGroupsByUserId.bind(this)
        this.addUserToGroup = this.addUserToGroup.bind(this)
        this.getUsersByGroupId = this.getUsersByGroupId.bind(this)
    }

    async getUserGroupsByUserId(userId: number): Promise<UserGroups[]> {
        if (userId > 0) {
            return await this.userGroupsRepository.getUserGroupsByUserId(userId)
        } else {
            return []
        }
    }

    async addUserToGroup(groupId: number, userId: number): Promise<UserGroups> {
        return await this.userGroupsRepository.addUserToGroup(groupId, userId)
    }

    async getUsersByGroupId(groupId: number): Promise<UserGroups[]> {
        return await this.userGroupsRepository.getUsersByGroupId(groupId)
    }
}
