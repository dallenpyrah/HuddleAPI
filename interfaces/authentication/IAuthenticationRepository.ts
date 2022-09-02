import UserContract from "../../contracts/user/userContract";
import { User, UserCredential } from "firebase/auth";

interface IAuthenticationRepository {
    login: (user: UserContract) => Promise<UserCredential>;
    signup: (user: UserContract) => Promise<UserCredential>;
}

export default IAuthenticationRepository;