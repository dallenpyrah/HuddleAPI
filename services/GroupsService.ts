import GroupContract from "../contracts/GroupContract";
import GroupsRepository from "../repositories/GroupsRepository";

export default class GroupsService {
    private groupsRepository;

    constructor(groupsRepository: GroupsRepository) {
        this.groupsRepository = groupsRepository;
    }

    async createGroup(groupToCreate: GroupContract) { 
        const group = await this.groupsRepository.createGroup(groupToCreate);
        return group;
    }
}