import {Request, Response} from 'express'
import NotificationService from '../services/NotificationService'
import pino from 'pino'

export default class NotificationController {
    private readonly notificationService: NotificationService
    private readonly logger: pino.Logger

    constructor(notificationService: NotificationService, logger: pino.Logger) {
        this.notificationService = notificationService
        this.logger = logger

        this.getNotificationsByUserId = this.getNotificationsByUserId.bind(this)
    }

    async getNotificationsByUserId(req: Request, res: Response): Promise<Response> {
        try {
            const userId = parseInt(req.params.userId)
            const notifications = await this.notificationService.getNotificationsByUserId(userId)
            return res.status(200).send(notifications)
        } catch (error) {
            this.logger.error(error)
            return res.status(500).send(error)
        }
    }
}
