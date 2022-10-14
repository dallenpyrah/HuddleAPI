export default interface INotificationRepository {
  getNotificationsByUserId: (userId: number) => Promise<Notification[]>
}
