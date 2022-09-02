import UserContract from "../contracts/userContract";
import { getAuth, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../firebase-config";

class AuthenticationProvider {
    async addUser(user: UserContract) : Promise<UserCredential> {
        const newUser = await createUserWithEmailAndPassword(auth, user.email, user.password);
        return newUser;
    }
}

export const authenticationProvider = new AuthenticationProvider();