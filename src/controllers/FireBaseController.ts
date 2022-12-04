import {Request, Response} from "express";
import pino from "pino";
import FireBaseService from "../services/FireBaseService";

export default class FireBaseController {
    private readonly fireBaseService: FireBaseService
    private readonly logger: pino.Logger

    constructor(fireBaseUserService: FireBaseService, logger: pino.Logger) {
        this.fireBaseService = fireBaseUserService
        this.logger = logger
        this.getUserByFireBaseId = this.getUserByFireBaseId.bind(this)
    }

    async getUserByFireBaseId(req: Request, res: Response): Promise<void> {
        try {
            const fireBaseUserId: string = req.params.fireBaseUserId
            const user = await this.fireBaseService.getUserByFireBaseId(fireBaseUserId)
            res.status(200).send(user)
        } catch (error) {
            this.logger.error(error)
            res.status(500).send(error);
        }
    }

}
