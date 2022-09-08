import UserContract from "../../contracts/user/UserContract";
import { createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { PrismaClient } from "@prisma/client";

class AuthenticationRepository  {

    async signup(user: UserContract) : Promise<UserCredential> {
        const prisma = new PrismaClient();

        try {
            const newUser = await createUserWithEmailAndPassword(auth, user.email, user.password);
            return newUser;
        } catch(error){
            throw new Error(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async login(user: UserContract) : Promise<UserCredential> {
        const prisma = new PrismaClient();

        try {
            const loggedInUser = await signInWithEmailAndPassword(auth, user.email, user.password);
            return loggedInUser;
        } catch (error) {
            throw new Error(error);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export const authenticationRepository = new AuthenticationRepository();