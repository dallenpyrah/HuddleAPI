import IUserRepository from '../interfaces/IUserRepository'
import {PrismaClient, User} from '@prisma/client'

export default class UserRepository implements IUserRepository {
    private readonly prismaClient: PrismaClient

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
        this.getUserByFireBaseId = this.getUserByFireBaseId.bind(this)
    }

    async getUserByFireBaseId(fireBaseUserId: string): Promise<User | null | undefined> {
        try {
            return await this.prismaClient.user.findFirst({
                where: {
                    fireBaseUserId
                }
            })
        } finally {
            await this.prismaClient.$disconnect()
        }
    }
}
