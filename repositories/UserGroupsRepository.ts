import {PrismaClient, UserGroups} from "@prisma/client";
import IUserGroup from "../interfaces/IUserGroup";

export default class UserGroupsRepository implements IUserGroup {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
        this.getUserGroups = this.getUserGroups.bind(this);
    }

    async getUserGroups(userId: number): Promise<UserGroups[]> {
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