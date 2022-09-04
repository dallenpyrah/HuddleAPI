import UserContract from "../../contracts/user/UserContract";
import { UserCredential } from "firebase/auth";
import IAuthentication from "../../interfaces/authentication/IAuthentication";
import { authenticationRepository } from "../../repositories/authentication/AuthenticationRepository";

class AuthenticationService implements IAuthentication {
    async signup(user: UserContract): Promise<UserCredential> {
            user.fullName = user.fullName.toLowerCase();
            user.email = user.email.toLowerCase();

            if(user.email.length < 1 || user.password.length < 1 || user.fullName.length < 1) {
                throw new Error("All fields are required");
            }

            if(user.password !== user.confirmPassword) {
                throw new Error("Passwords do not match");
            }

            return await authenticationRepository.signup(user);
    }

    async login(user: UserContract) : Promise<UserCredential> {
        if(user.email.length < 1 || user.password.length < 1) {
            throw new Error("All fields are required");
        }

        return await authenticationRepository.login(user);
    }
}

export const authenticationService = new AuthenticationService();