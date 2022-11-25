import {UserCredential} from '@firebase/auth'

export default class AuthenticationResponseContract {
    userCredentials: UserCredential | undefined
    isSuccess: boolean
    statusCode: number
    message: string

    constructor(isSuccess: boolean, statusCode: number, message: string, userCredentials?: UserCredential) {
        this.userCredentials = userCredentials
        this.isSuccess = isSuccess
        this.statusCode = statusCode
        this.message = message
    }
}
