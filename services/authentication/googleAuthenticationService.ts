import UserContract from "../../contracts/user/userContract";
import { UserCredential } from "firebase/auth";
import IAuthenticationRepository from "../../interfaces/authentication/IAuthenticationRepository";

class GoogleAuthenticationService implements IAuthenticationRepository {
    login: (user: UserContract) => Promise<UserCredential>;
    signup: (user: UserContract) => Promise<UserCredential>;
}

export const googleAuthenticationService = new GoogleAuthenticationService();