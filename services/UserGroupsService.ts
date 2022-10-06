import UserGroupsRepository from "../repositories/UserGroupsRepository";
import {UserGroups} from "@prisma/client";

export default class UserGroupsService {
    private userGroupsRepository;

    constructor(userGroupsRepository: UserGroupsRepository) {
        this.userGroupsRepository = userGroupsRepository
        this.getUserGroups = this.getUserGroups.bind(this);
    }

    async getUserGroups(userId: number): Promise<UserGroups[]> {
        return await this.userGroupsRepository.getUserGroups(userId);
    }

}