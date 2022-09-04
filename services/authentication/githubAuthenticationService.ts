import UserContract from "../../contracts/user/UserContract";
import { UserCredential } from "firebase/auth";
import IAuthenticationRepository from "../../interfaces/authentication/IAuthentication";

export default class GithubAuthenticationService implements IAuthenticationRepository {
    login: (user: UserContract) => Promise<UserCredential>;
    signup: (user: UserContract) => Promise<UserCredential>;
}
