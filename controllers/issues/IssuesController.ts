import IssueContract from "../../contracts/issue/IssueContract";
import { Request, Response } from 'express';
import { issuesService } from "../../services/issues/IssuesService";


class IssuesController { 
    async createIssue(req: Request, res: Response) {
        try {
            const issueData = new IssueContract(req.body.title, req.body.description, req.body.status, req.body.createdBy, req.body.createdById);
            const createdIssue = await issuesService.createIssue(issueData);
            res.send(createdIssue);
        } catch (error) {
            console.log(error);
        }
    }

}

export default IssuesController;