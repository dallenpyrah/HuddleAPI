import UserContract from "../../contracts/user/UserContract";
import { createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { Prisma, PrismaClient } from "@prisma/client";

class AuthenticationRepository  {

    async signup(user: UserContract) : Promise<UserCredential> {
        const prisma = new PrismaClient();

        try {
            const newUser = await createUserWithEmailAndPassword(auth, user.email, user.password);

            if(newUser?.user !== null) {
                await prisma.user.create({
                    data: {
                        email: user.email,
                        name: user.fullName,
                        updatedAt: new Date(),
                    }
                })
            }
    
            return newUser;
        } finally {
            await prisma.$disconnect();
        }
    }

    async login(user: UserContract) : Promise<UserCredential> {
        const loggedInUser = await signInWithEmailAndPassword(auth, user.email, user.password);
        return loggedInUser;
    }
}

export const authenticationRepository = new AuthenticationRepository();