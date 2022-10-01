import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import GroupsService from "../services/GroupsService";

class GroupsController {
    public router = express.Router();
    private jsonParser = bodyParser.json();
    private groupsService: GroupsService;

    constructor(apiRoute: string, groupsService: GroupsService) {
        this.router.post(`${apiRoute}/{userId}`, this.jsonParser, this.getUserGroups);
        this.groupsService = groupsService;
    }

    async getUserGroups(req: Request, res: Response ) {
        try {
            const groups = await this.groupsService.getUserGroups(parseInt(req.params.userId));
            res.status(200).send(groups);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
} 

export default GroupsController;