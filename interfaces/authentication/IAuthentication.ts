import UserContract from "../../contracts/user/UserContract";
import { UserCredential } from "firebase/auth";

interface IAuthentication {
    login: (user: UserContract) => Promise<UserCredential>;
    signup: (user: UserContract) => Promise<UserCredential>;
}

export default IAuthentication;