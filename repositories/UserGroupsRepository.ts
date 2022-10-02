import { PrismaClient } from "@prisma/client";

export default class UserGroupsRepository {
    private prisma : PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }
    
    async getUserGroups(userId: number) { 
        try {
            const groups = await this.prisma.user.findMany({
                where: {
                    Id: userId
                },
                include: {
                    Groups: true
                }
            });
            
            return groups;
        } catch (error) {
            console.log(error);
        } finally {
            await this.prisma.$disconnect();
        }
    }
}