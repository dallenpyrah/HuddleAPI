import { UserCredential } from "@firebase/auth";

export default class AuthenticationResponseContract {
    userCredentials: UserCredential;
    isSuccess: boolean;
    statusCode: number;
    message: string;

    constructor(userCredentials: UserCredential = null, isSuccess: boolean, statusCode: number, message: string) {
        this.userCredentials = userCredentials;
        this.isSuccess = isSuccess;
        this.statusCode = statusCode;
        this.message = message;
    }
}