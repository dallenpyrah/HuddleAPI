import IUserRepository from '../interfaces/IUserRepository'
import INotificationRepository from '../interfaces/INotificationRepository'
import { Notification } from '@prisma/client'

export default class NotificationService {
  private readonly notificationRepository: INotificationRepository
  private readonly userRepository: IUserRepository

  constructor (notificationRepository: INotificationRepository, userRepository: IUserRepository) {
    this.notificationRepository = notificationRepository
    this.userRepository = userRepository
  }

  async getNotificationsByFireBaseUserId (fireBaseUserId: string): Promise<Notification[] | undefined> {
    const user = await this.userRepository.getUserByFireBaseId(fireBaseUserId)

    if (user != null) {
      return await this.notificationRepository.getNotificationsByUserId(user.id)
    } else {
      return []
    }
  }
}
