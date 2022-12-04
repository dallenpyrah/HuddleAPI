import {PrismaClient, User} from "@prisma/client";
import IFireBaseRepository from "../interfaces/IFireBaseRepository";

export default class FireBaseRepository implements IFireBaseRepository {
    private readonly prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma
        this.getUserByFireBaseId = this.getUserByFireBaseId.bind(this)
    }

    async getUserByFireBaseId(fireBaseUserId: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                fireBaseUserId: fireBaseUserId
            }
        })
    }
}
