import INotificationRepository from '../interfaces/INotificationRepository'
import { Notification, PrismaClient } from '@prisma/client'

export default class NotificationRepository implements INotificationRepository {
  private readonly prismaClient: PrismaClient

  constructor (prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
    this.getNotificationsByUserId = this.getNotificationsByUserId.bind(this)
  }

  async getNotificationsByUserId (userId: number): Promise<Notification[] | undefined> {
    try {
      return await this.prismaClient.notification.findMany({
        where: {
          userId
        }
      })
    } finally {
      await this.prismaClient.$disconnect()
    }
  }
}
