import {PrismaClient, UserGroups} from '@prisma/client'
import IUserGroupRepo from '../interfaces/IUserGroupRepository'

export default class UserGroupsRepository implements IUserGroupRepo {
    private readonly prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma
        this.getUserGroupsByUserId = this.getUserGroupsByUserId.bind(this)
        this.addUserToGroup = this.addUserToGroup.bind(this)
        this.getUsersByGroupId = this.getUsersByGroupId.bind(this)
    }

    async getUserGroupsByUserId(userId: number): Promise<UserGroups[]> {
        return await this.prisma.userGroups.findMany({
            where: {
                userId
            },
            include: {
                group: true
            }
        })
    }

    async addUserToGroup(groupId: number, userId: number): Promise<UserGroups> {
        return await this.prisma.userGroups.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
                group: {
                    connect: {
                        id: groupId
                    }
                }
            }
        })
    }

    async getUsersByGroupId(groupId: number): Promise<UserGroups[]> {
        return await this.prisma.userGroups.findMany({
            where: {
                groupId
            },
            include: {
                user: true
            }
        })
    }
}
