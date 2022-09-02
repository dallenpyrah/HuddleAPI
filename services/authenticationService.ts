import UserContract from "../contracts/userContract";
import { UserCredential } from "firebase/auth";
import { authenticationProvider } from "../providers/authenticationProvider";

class AuthenticationService {
    async addUser(user: UserContract): Promise<UserCredential> {
            user.fullName = user.fullName.toLowerCase();
            user.email = user.email.toLowerCase();

            if(user.email.length < 1 || user.password.length < 1 || user.fullName.length < 1) {
                throw new Error("All fields are required");
            }

            if(user.password !== user.confirmPassword) {
                throw new Error("Passwords do not match");
            }

            return await authenticationProvider.addUser(user);
    }
}

export const authenticationService = new AuthenticationService();