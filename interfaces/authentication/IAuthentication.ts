import UserContract from "../../contracts/user/UserContract";
import { User, UserCredential } from "firebase/auth";
import AuthenticationResponseContract from "../../contracts/authentication/AuthenticationResponseContract";

interface IAuthentication {
    login: (user: UserContract) => Promise<UserCredential>;
    signup: (user: UserContract) => Promise<UserCredential>;
}

export default IAuthentication;