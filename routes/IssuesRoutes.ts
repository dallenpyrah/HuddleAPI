import IssuesRepository from '../repositories/IssuesRepository'
import IssuesService from '../services/IssuesService'
import IssuesController from '../controllers/IssuesController'
import { PrismaClient } from '@prisma/client'
import { Application, RequestHandler } from 'express'
import UserRepository from '../repositories/UserRepository'

export default class IssuesRoutes {
  private readonly app: Application
  private readonly apiPath: string
  private readonly issuesController: IssuesController
  private readonly issuesService: IssuesService
  private readonly issuesRepository: IssuesRepository
  private readonly prismaClient: PrismaClient
  private readonly userRepository: UserRepository

  constructor (app: Application) {
    this.app = app
    this.apiPath = '/api/issues'
    this.prismaClient = new PrismaClient()
    this.issuesRepository = new IssuesRepository(this.prismaClient)
    this.userRepository = new UserRepository(this.prismaClient)
    this.issuesService = new IssuesService(this.issuesRepository, this.userRepository)
    this.issuesController = new IssuesController(this.issuesService)
    this.createRoutes = this.createRoutes.bind(this)
  }

  createRoutes (): void {
    this.app.get(`${this.apiPath}/:userId`, this.issuesController.getIssuesByFireBaseId as RequestHandler)
    this.app.get(`${this.apiPath}/:limit/:afterId`, this.issuesController.getCommunityIssues as RequestHandler)
    this.app.get(`${this.apiPath}/:filter`, this.issuesController.getFilteredCommunityIssues as RequestHandler)
  }
}
