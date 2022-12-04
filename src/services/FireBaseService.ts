import {User} from "@prisma/client";
import IFireBaseRepository from "../interfaces/IFireBaseRepository";

export default class FireBaseService {
    private readonly fireBaseRepository: IFireBaseRepository

    constructor(fireBaseRepository: IFireBaseRepository) {
        this.fireBaseRepository = fireBaseRepository
        this.getUserByFireBaseId = this.getUserByFireBaseId.bind(this)
    }

    async getUserByFireBaseId(fireBaseUserId: string): Promise<User | null> {
        return await this.fireBaseRepository.getUserByFireBaseId(fireBaseUserId)
    }
}
