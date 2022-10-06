import bodyParser from "body-parser";
import express, {Request, Response} from "express";
import GroupsService from "../services/GroupsService";

export default class GroupsController {
    public router = express.Router();
    private jsonParser = bodyParser.json();
    private groupsService: GroupsService;

    constructor(apiRoute: string, groupsService: GroupsService) {
        this.router.post(`${apiRoute}`, this.jsonParser, this.groupsService.createGroup);
        this.groupsService = groupsService;
    }

    async createGroup(req: Request, res: Response): Promise<void> {
        try {
            const groups = await this.groupsService.createGroup(req.body);
            res.status(200).send(groups);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}