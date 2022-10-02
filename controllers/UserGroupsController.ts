import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import UserGroupsService from "../services/UserGroupsService";

class UserGroupsController {
    public router = express.Router();
    private jsonParser = bodyParser.json();
    private userGroupsService: UserGroupsService;

    constructor(apiRoute: string, userGroupsService: UserGroupsService) {
        this.router.get(`${apiRoute}/:userId`, this.jsonParser, this.getUserGroups);
        this.userGroupsService = userGroupsService;
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