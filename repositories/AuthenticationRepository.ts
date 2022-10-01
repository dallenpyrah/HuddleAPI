import UserContract from "../contracts/UserContract";
import { createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { PrismaClient } from "@prisma/client";

export default class AuthenticationRepository  {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async signup(user: UserContract) : Promise<UserCredential> {
        try {
            const newUser = await createUserWithEmailAndPassword(auth, user.email, user.password);
            return newUser;
        } catch(error){
            throw new Error(error);
        } finally {
            await this.prisma.$disconnect();
        }
    }

    async login(user: UserContract) : Promise<UserCredential> {
        try {
            const loggedInUser = await signInWithEmailAndPassword(auth, user.email, user.password);
            return loggedInUser;
        } catch (error) {
            throw new Error(error);
        } finally {
            await this.prisma.$disconnect();
        }
    }
}