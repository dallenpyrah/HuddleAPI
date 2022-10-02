import {Request, Response} from "express";
import UserGroupsService from "../services/UserGroupsService";

class UserGroupsController {
    private userGroupsService: UserGroupsService;

    constructor(userGroupsService: UserGroupsService) {
        this.userGroupsService = userGroupsService;
        this.getUserGroups = this.getUserGroups.bind(this);
    }

    async getUserGroups(req: Request, res: Response ) {
        try {
            const groups = await this.userGroupsService.getUserGroups(parseInt(req.params.userId));
            res.status(200).send(groups);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
} 

export default UserGroupsController;