import IssuesRepository from "../repositories/IssuesRepository";
import IssuesService from "../services/IssuesService";
import IssuesController from "../controllers/IssuesController";
import {PrismaClient} from "@prisma/client";
import {Application} from "express";

export default class IssuesRoutes {
    private app: Application;
    private readonly apiPath: string;
    private issuesController: IssuesController;
    private readonly issuesService: IssuesService;
    private readonly issuesRepository: IssuesRepository;
    private readonly prismaClient: PrismaClient;

    constructor(app: Application) {
        this.app = app;
        this.apiPath = "/api/issues";
        this.prismaClient = new PrismaClient();
        this.issuesRepository = new IssuesRepository(this.prismaClient);
        this.issuesService = new IssuesService(this.issuesRepository);
        this.issuesController = new IssuesController(this.issuesService);
        this.createRoutes = this.createRoutes.bind(this);
    }

    createRoutes() {
        this.app.get(`${this.apiPath}/:userId`, this.issuesController.getUserIssues);
    }


}