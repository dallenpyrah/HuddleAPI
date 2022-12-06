import {PrismaClient, User} from '@prisma/client'
import IAuthentication from '../interfaces/IAuthentication'
import {User as FireBaseUser} from '@firebase/auth'

export default class AuthenticationRepository implements IAuthentication {
    private readonly prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma
        this.signup = this.signup.bind(this)
    }

    async signup(user: FireBaseUser): Promise<User> {
        return await this.prisma.user.create({
            data: {
                email: user.email ?? '',
                name: user.displayName,
                fireBaseUserId: user.uid
            }
        })
    }

    async getUser(user: FireBaseUser): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                fireBaseUserId: user.uid
            }
        })
    }
}
