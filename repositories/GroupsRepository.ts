import { PrismaClient } from "@prisma/client";
import GroupContract from "../contracts/GroupContract";

export default class GroupsRepository { 
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createGroup(groupToCreate: GroupContract) { 
        try {
            const createdGroup = await this.prisma.group.create({
                data: {
                    Name: groupToCreate.name,
                    Description: groupToCreate.description,
                    CreatorId: groupToCreate.userId,
                    Color: groupToCreate.color
                }
            });
            return createdGroup;
        } catch (error) {
            throw new Error(error);
        } finally {
            await this.prisma.$disconnect();
        }
    }
}