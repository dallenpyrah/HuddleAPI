import UserContract from "../../contracts/user/userContract";
import { UserCredential } from "firebase/auth";
import { authenticationProvider } from "../../providers/authentication/authenticationProvider";
import IAuthenticationRepository from "../../interfaces/authentication/IAuthenticationRepository";

class AuthenticationService implements IAuthenticationRepository {
    async signup(user: UserContract): Promise<UserCredential> {
            user.fullName = user.fullName.toLowerCase();
            user.email = user.email.toLowerCase();

            if(user.email.length < 1 || user.password.length < 1 || user.fullName.length < 1) {
                throw new Error("All fields are required");
            }

            if(user.password !== user.confirmPassword) {
                throw new Error("Passwords do not match");
            }

            return await authenticationProvider.signup(user);
    }

    async login(user: UserContract) : Promise<UserCredential> {
        if(user.email.length < 1 || user.password.length < 1) {
            throw new Error("All fields are required");
        }

        return await authenticationProvider.login(user);
    }
}

export const authenticationService = new AuthenticationService();