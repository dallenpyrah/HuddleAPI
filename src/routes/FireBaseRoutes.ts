import {Application} from "express";
import FireBaseController from "../controllers/FireBaseController";
import FireBaseService from "../services/FireBaseService";
import IFireBaseRepository from "../interfaces/IFireBaseRepository";
import {PrismaClient} from "@prisma/client";
import pino from "pino";
import FireBaseRepository from "../repositories/FireBaseRepository";

export default class FireBaseRoutes {
    private readonly app: Application
    private readonly apiPath: string
    private readonly fireBaseController: FireBaseController
    private readonly fireBaseService: FireBaseService
    private readonly prismaClient: PrismaClient
    private readonly fireBaseRepository: IFireBaseRepository
    private readonly logger: pino.Logger

    constructor(app: Application) {
        this.app = app
        this.apiPath = '/api/firebase'
        this.prismaClient = new PrismaClient()
        this.fireBaseRepository = new FireBaseRepository(this.prismaClient)
        this.fireBaseService = new FireBaseService(this.fireBaseRepository)
        this.logger = pino({
            transport: {
                target: 'pino-pretty',
                options: {colorize: true}
            }
        })
        this.fireBaseController = new FireBaseController(this.fireBaseService, this.logger)
        this.createRoutes = this.createRoutes.bind(this)
    }

    createRoutes(): void {
        this.app.get(`${this.apiPath}/:fireBaseUserId`, this.fireBaseController.getUserByFireBaseId)
    }

}
