import { Request, Response } from 'express'
import NotificationService from '../services/NotificationService'
import pino from 'pino'

export default class NotificationController {
  private readonly notificationService: NotificationService
  private readonly logger: pino.Logger

  constructor (notificationService: NotificationService, logger: pino.Logger) {
    this.notificationService = notificationService
    this.logger = logger

    this.getNotificationsByFireBaseUserId = this.getNotificationsByFireBaseUserId.bind(this)
  }

  async getNotificationsByFireBaseUserId (req: Request, res: Response): Promise<Response> {
    try {
      const fireBaseUserId = req.params.userFireBaseId
      const notifications = await this.notificationService.getNotificationsByFireBaseUserId(fireBaseUserId)
      return res.status(200).send(notifications)
    } catch (error) {
      this.logger.error(error)
      return res.status(500).send(error)
    }
  }
}
