import { PrismaClient } from "@prisma/client";

export default class GroupsRepository {
    private prisma : PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }
    
    async getUserGroups(userId: number) { 
        const groups = await this.prisma.group.findMany({
            where: {
                userId: userId
            }
        });

        return groups;
    }
}