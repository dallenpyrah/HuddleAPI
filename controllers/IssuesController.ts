import IssueContract from "../contracts/IssueContract";
import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import IssuesService from "../services/IssuesService";


class IssuesController { 
    public router = express.Router();
    public issuesService: IssuesService;
    private jsonParser = bodyParser.json();

    constructor(apiRoute: string, issuesService: IssuesService){
        this.issuesService = issuesService
    }
}

export default IssuesController;