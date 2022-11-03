import { Application, RequestHandler } from 'express'
import GroupsService from '../services/GroupsService'
import GroupsRepository from '../repositories/GroupsRepository'
import { PrismaClient } from '@prisma/client'
import GroupsController from '../controllers/GroupsController'

export default class GroupsRoutes {
  private readonly app: Application
  private readonly apiPath: string
  private readonly groupsService: GroupsService
  private readonly groupsRepository: GroupsRepository
  private readonly prismaClient: PrismaClient
  private readonly groupsController: GroupsController

  constructor (app: Application) {
    this.app = app
    this.apiPath = '/api/groups'
    this.prismaClient = new PrismaClient()
    this.groupsRepository = new GroupsRepository(this.prismaClient)
    this.groupsService = new GroupsService(this.groupsRepository)
    this.groupsController = new GroupsController(this.groupsService)

    this.createRoutes = this.createRoutes.bind(this)
  }

  createRoutes (): void {
    this.app.get(`${this.apiPath}/newest`, this.groupsController.getNewestGroups as RequestHandler)
  }
}
