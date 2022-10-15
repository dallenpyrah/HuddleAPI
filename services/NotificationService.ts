import IUserRepository from '../interfaces/IUserRepository'
import INotificationRepository from '../interfaces/INotificationRepository'
import pino from 'pino'
import { Notification } from '@prisma/client'

export default class NotificationService {
  private readonly notificationRepository: INotificationRepository
  private readonly userRepository: IUserRepository
  private readonly logger: pino.Logger

  constructor (notificationRepository: INotificationRepository, userRepository: IUserRepository, logger: pino.Logger) {
    this.notificationRepository = notificationRepository
    this.userRepository = userRepository
    this.logger = logger
  }

  async getNotificationsByFireBaseUserId (fireBaseUserId: string): Promise<Notification[] | undefined> {
    try {
      const user = await this.userRepository.getUserIdByFireBaseId(fireBaseUserId)

      if (user != null) {
        return await this.notificationRepository.getNotificationsByUserId(user.id)
      } else {
        return []
      }
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
