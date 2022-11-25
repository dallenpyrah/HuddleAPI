import IAuthentication from '../interfaces/IAuthentication'
import {User as FireBaseUser} from '@firebase/auth'
import {User} from '@prisma/client'

export default class AuthenticationService {
    private readonly authenticationRepository: IAuthentication

    constructor(authenticationRepository: IAuthentication) {
        this.authenticationRepository = authenticationRepository

        this.signup = this.signup.bind(this)
    }

    async signup(user: FireBaseUser): Promise<User> {
        const existingUser = await this.authenticationRepository.getUser(user)
        return existingUser ?? await this.authenticationRepository.signup(user)
    }
}
