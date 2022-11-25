import {User} from '@prisma/client'
import {User as FireBaseUser} from '@firebase/auth'

export default interface IAuthentication {
  signup: (user: FireBaseUser) => Promise<User>
  getUser: (user: FireBaseUser) => Promise<User | null>
}

