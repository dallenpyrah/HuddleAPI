import IssueContract from "../contracts/IssueContract";
import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import IssuesService from "../services/IssuesService";


class IssuesController { 
    public router = express.Router();
    public issuesService: IssuesService;
    private jsonParser = bodyParser.json();

    constructor(apiRoute: string, issuesService: IssuesService){
        this.router.post(`${apiRoute}/createIssue`, this.jsonParser, this.createIssue);
        this.issuesService = issuesService
    }

    async createIssue(req: Request, res: Response){
        try {
            const issueData = new IssueContract(req.body.title, req.body.description, req.body.status, req.body.userId, req.body.language, req.body.framework);
            const createdIssue = await this.issuesService.createIssue(issueData);
            res.status(200).send(createdIssue);
        } catch (error) {
            res.status(500).send(error);
        }
    }

}

export default IssuesController;