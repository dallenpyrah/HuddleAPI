import IUserRepository from '../interfaces/IUserRepository'
import INotificationRepository from '../interfaces/INotificationRepository'
import {Notification} from '@prisma/client'

export default class NotificationService {
    private readonly notificationRepository: INotificationRepository
    private readonly userRepository: IUserRepository

    constructor(notificationRepository: INotificationRepository, userRepository: IUserRepository) {
        this.notificationRepository = notificationRepository
        this.userRepository = userRepository
        this.getNotificationsByUserId = this.getNotificationsByUserId.bind(this)
    }

    async getNotificationsByUserId(userId: number): Promise<Notification[] | undefined> {
        if (userId > 0) {
            return await this.notificationRepository.getNotificationsByUserId(userId)
        } else {
            return []
        }
    }
}
