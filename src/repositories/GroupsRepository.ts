import {Group, Issue, PrismaClient} from '@prisma/client'
import IGroupsRepository from '../interfaces/IGroupsRepository'
import IGroupContract from "../contracts/GroupContract";

export default class GroupsRepository implements IGroupsRepository {
    private readonly prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma
        this.getNewestGroups = this.getNewestGroups.bind(this)
        this.createGroup = this.createGroup.bind(this)
        this.getGroupById = this.getGroupById.bind(this)
        this.getIssuesByGroupId = this.getIssuesByGroupId.bind(this)
    }

    async getNewestGroups(): Promise<Group[] | undefined> {
        return await this.prisma.group.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                take: 4
            }
        )
    }

    async createGroup(groupToCreate: IGroupContract): Promise<Group> {
        return await this.prisma.group.create({
            data: {
                name: groupToCreate.name,
                description: groupToCreate.description,
                color: groupToCreate.color,
                created: {
                    connect: {
                        id: groupToCreate.user.id
                    }
                },
                createdAt: new Date(),
                updatedAt: new Date()
            },
            include: {
                created: true
            }
        })
    }

    async getGroupById(groupId: number): Promise<Group | null> {
        return await this.prisma.group.findUnique({
            where: {
                id: groupId
            },
            include: {
                created: true
            }
        })
    }

    async getIssuesByGroupId(groupId: number): Promise<Issue[] | null> {
        return await this.prisma.issue.findMany({
            where: {
                groupId
            },
            include: {
                user: true
            }
        })
    }
}
