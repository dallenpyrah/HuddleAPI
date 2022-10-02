import UserGroupsRepository from "../repositories/UserGroupsRepository";

export default class UserGroupsService {
    private userGroupsRepository;

    constructor(userGroupsRepository: UserGroupsRepository) {
        this.userGroupsRepository = userGroupsRepository
        this.getUserGroups = this.getUserGroups.bind(this);
    }

    async getUserGroups(userId: number) { 
        const groups = await this.userGroupsRepository.getUserGroups(userId);
        return groups;
    }

}