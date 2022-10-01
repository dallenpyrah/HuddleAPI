import IssueContract from "../contracts/IssueContract";
import express, { Request, Response } from 'express';
import { issuesService } from "../services/IssuesService";
import bodyParser from "body-parser";


class IssuesController { 
    public router = express.Router();
    private jsonParser = bodyParser.json();

    constructor(){
        const apiRoute = "/issues";
        this.router.post(`${apiRoute}/createIssue`, this.jsonParser, this.createIssue);
    }

    async createIssue(req: Request, res: Response){
        try {
            const issueData = new IssueContract(req.body.title, req.body.description, req.body.status, req.body.userId, req.body.language, req.body.framework);
            const createdIssue = await issuesService.createIssue(issueData);
            res.status(200).send(createdIssue);
        } catch (error) {
            res.status(500).send(error);
        }
    }

}

export default IssuesController;