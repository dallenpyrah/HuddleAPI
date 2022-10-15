import INotificationRepository from '../interfaces/INotificationRepository'
import { Notification, PrismaClient } from '@prisma/client'
import pino from 'pino'

export default class NotificationRepository implements INotificationRepository {
  private readonly prismaClient: PrismaClient
  private readonly logger: pino.Logger

  constructor (prismaClient: PrismaClient, logger: pino.Logger) {
    this.prismaClient = prismaClient
    this.logger = logger
    this.getNotificationsByUserId = this.getNotificationsByUserId.bind(this)
  }

  async getNotificationsByUserId (userId: number): Promise<Notification[] | undefined> {
    try {
      return await this.prismaClient.notification.findMany({
        where: {
          userId
        }
      })
    } catch (error) {
      this.logger.error(error)
    } finally {
      await this.prismaClient.$disconnect()
    }
  }
}
