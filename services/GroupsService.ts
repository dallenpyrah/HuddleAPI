import GroupsRepository from "../repositories/GroupsRepository";

export default class GroupsService {
    private groupsRepository;

    constructor(groupsRepository: GroupsRepository) {
        this.groupsRepository = groupsRepository
    }

    async getUserGroups(userId: number) { 
        const groups = await this.groupsRepository.getUserGroups(userId);
        return groups;
    }

}