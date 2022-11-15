import express, { RequestHandler } from 'express'
import INotificationRepository from '../interfaces/INotificationRepository'
import NotificationController from '../controllers/NotificationController'
import NotificationService from '../services/NotificationService'
import { PrismaClient } from '@prisma/client'
import NotificationRepository from '../repositories/NotificationRepository'
import pino from 'pino'
import UserRepository from '../repositories/UserRepository'

export default class NotificationRoutes {
  private readonly app: express.Application
  private readonly apiPath: string
  private readonly logger: pino.Logger
  private readonly notificationController: NotificationController
  private readonly notificationService: NotificationService
  private readonly userRepository: UserRepository
  private readonly notificationRepository: INotificationRepository
  private readonly prismaClient: PrismaClient

  constructor (app: express.Application) {
    this.app = app
    this.apiPath = '/api/notifications'
    this.prismaClient = new PrismaClient()
    this.logger = pino({
      transport: {
        target: 'pino-pretty',
        options: { colorize: true }
      }
    })
    this.userRepository = new UserRepository(this.prismaClient)
    this.notificationRepository = new NotificationRepository(this.prismaClient)
    this.notificationService = new NotificationService(this.notificationRepository, this.userRepository)
    this.notificationController = new NotificationController(this.notificationService, this.logger)
    this.createRoutes = this.createRoutes.bind(this)
  }

  createRoutes (): void {
    this.app.get(`${this.apiPath}/:userFireBaseId`, this.notificationController.getNotificationsByFireBaseUserId as RequestHandler)
  }
}
