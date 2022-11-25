import { Notification } from '@prisma/client'

export default interface INotificationRepository {
  getNotificationsByUserId: (userId: number) => Promise<Notification[] | undefined>
}
