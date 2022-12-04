import {User} from "@prisma/client";

export default interface IFireBaseRepository {
    getUserByFireBaseId(fireBaseUserId: string): Promise<User | null>;
}
