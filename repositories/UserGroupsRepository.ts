import {PrismaClient} from "@prisma/client";

export default class UserGroupsRepository {
    private prisma : PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
        this.getUserGroups = this.getUserGroups.bind(this);
    }
    
    async getUserGroups(userId: number) { 
        try {
            return await this.prisma.userGroups.findMany({
                where: {
                    userId: userId
                }, include: {
                    group: true
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            await this.prisma.$disconnect();
        }
    }
}