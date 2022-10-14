import { Request, Response } from 'express'
import NotificationService from '../services/NotificationService'

export default class NotificationController {
  private readonly notificationService: NotificationService

  constructor (notificationService: NotificationService) {
    this.notificationService = notificationService

    this.getNotificationsByFireBaseUserId = this.getNotificationsByFireBaseUserId.bind(this)
  }

  async getNotificationsByFireBaseUserId (req: Request, res: Response): Promise<Response> {
    try {
      const fireBaseUserId = req.params.userId
      const notifications = await this.notificationService.getNotificationsByFireBaseUserId(fireBaseUserId)
      return res.status(200).send(notifications)
    } catch (error) {
      return res.status(500).send(error)
    }
  }
}
