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
        try {
            return await this.prisma.userGroups.findMany({
                where: {
                    userId
                },
                include: {
                    group: true
                }
            })
        } finally {
            await this.prisma.$disconnect()
        }
    }

    async addUserToGroup(groupId: number, userId: number): Promise<UserGroups> {
        try {
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
        } finally {
            await this.prisma.$disconnect()
        }
    }

    async getUsersByGroupId(groupId: number): Promise<UserGroups[]> {
        try {
            return await this.prisma.userGroups.findMany({
                where: {
                    groupId
                },
                include: {
                    user: true
                }
            })
        } finally {
            await this.prisma.$disconnect()
        }
    }
}
