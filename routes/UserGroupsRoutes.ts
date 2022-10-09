import express, { RequestHandler } from 'express'
import UserGroupsController from '../controllers/UserGroupsController'
import UserGroupsService from '../services/UserGroupsService'
import UserGroupsRepository from '../repositories/UserGroupsRepository'
import { PrismaClient } from '@prisma/client'

export default class UserGroupsRoutes {
  private readonly app: express.Application
  private readonly apiPath: string
  private readonly userGroupsController: UserGroupsController
  private readonly userGroupsService: UserGroupsService
  private readonly userGroupsRepository: UserGroupsRepository
  private readonly prismaClient: PrismaClient

  constructor (app: express.Application) {
    this.app = app
    this.apiPath = '/api/usergroups'
    this.prismaClient = new PrismaClient()
    this.userGroupsRepository = new UserGroupsRepository(this.prismaClient)
    this.userGroupsService = new UserGroupsService(this.userGroupsRepository)
    this.userGroupsController = new UserGroupsController(this.userGroupsService)
    this.createRoutes = this.createRoutes.bind(this)
  }

  createRoutes (): void {
    this.app.get(`${this.apiPath}/:userId`, this.userGroupsController.getUserGroupsByUserId as RequestHandler)
  }
}
