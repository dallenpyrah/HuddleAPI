import { Application, RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'
import AuthenticationService from '../services/AuthenticationService'
import AuthenticationRepository from '../repositories/AuthenticationRepository'
import AuthenticationController from '../controllers/AuthenticationController'

export default class AuthenticationRoutes {
  private readonly app: Application
  private readonly apiPath: string
  private readonly prismaClient: PrismaClient
  private readonly authenticationRepository: AuthenticationRepository
  private readonly authenticationService: AuthenticationService
  private readonly authenticationController: AuthenticationController

  constructor (app: Application) {
    this.app = app
    this.apiPath = '/api/auth'
    this.prismaClient = new PrismaClient()
    this.authenticationRepository = new AuthenticationRepository(this.prismaClient)
    this.authenticationService = new AuthenticationService(this.authenticationRepository)
    this.authenticationController = new AuthenticationController(this.authenticationService)
    this.createRoutes = this.createRoutes.bind(this)
  }

  createRoutes (): void {
    this.app.post(`${this.apiPath}/login`, this.authenticationController.login as RequestHandler)
    this.app.post(`${this.apiPath}/signup`, this.authenticationController.signup as RequestHandler)
  }
}
