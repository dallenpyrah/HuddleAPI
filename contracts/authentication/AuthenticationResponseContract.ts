import { UserCredential } from "@firebase/auth";

export default class AuthenticationResponseContract {
    user: UserCredential;
    isSuccess: boolean;
    statusCode: number;
    message: string;

    constructor(user: UserCredential = null, isSuccess: boolean, statusCode: number, message: string) {
        this.user = user;
        this.isSuccess = isSuccess;
        this.statusCode = statusCode;
        this.message = message;
    }
}