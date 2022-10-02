import UserContract from "../contracts/UserContract";
import {UserCredential} from "firebase/auth";
import IAuthentication from "../interfaces/IAuthentication";
import AuthenticationRepository from "../repositories/AuthenticationRepository";

export default class AuthenticationService implements IAuthentication {
    private authenticationRepository: AuthenticationRepository;

    constructor(authenticationRepository: AuthenticationRepository) {
        this.authenticationRepository = authenticationRepository;

        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }
    
    async signup(user: UserContract): Promise<UserCredential> {
            user.fullName = user.fullName.toLowerCase();
            user.email = user.email.toLowerCase();

            if(user.email.length < 1 || user.password.length < 1 || user.fullName.length < 1) {
                throw new Error("All fields are required");
            }

            if(user.password !== user.confirmPassword) {
                throw new Error("Passwords do not match");
            }

            return await this.authenticationRepository.signup(user);
    }

    async login(user: UserContract) : Promise<UserCredential> {
        if(user.email.length < 1 || user.password.length < 1) {
            throw new Error("All fields are required");
        }

        return await this.authenticationRepository.login(user);
    }

    getErrorMessageFromErrorCode(error: any) : string {
        switch(error?.code) {
            case "auth/user-not-found":
                return "User not found";
            case "auth/wrong-password":
                return "Wrong password";
            case "auth/email-already-in-use":
                return "Email already in use";
            case "auth/invalid-email":
                return "Invalid email";
            case "auth/weak-password":
                return "Password is too weak";
            default:
                return error?.message;
        }
    }
}