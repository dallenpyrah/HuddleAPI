import UserContract from "../../contracts/user/UserContract";
import { getAuth, createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import IAuthentication from "../../interfaces/authentication/IAuthentication";

class AuthenticationRepository  {
    async signup(user: UserContract) : Promise<UserCredential> {
        const newUser = await createUserWithEmailAndPassword(auth, user.email, user.password);
        return newUser;
    }

    async login(user: UserContract) : Promise<UserCredential> {
        const loggedInUser = await signInWithEmailAndPassword(auth, user.email, user.password);
        return loggedInUser;
    }
}

export const authenticationRepository = new AuthenticationRepository();