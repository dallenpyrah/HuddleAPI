import { Request, Response } from 'express'
import UserGroupsService from '../services/UserGroupsService'
import pino from 'pino'

export default class UserGroupsController {
  private readonly userGroupsService: UserGroupsService
  private readonly logger = pino({
    transport: {
      target: 'pino-pretty'
    }
  })

  constructor (userGroupsService: UserGroupsService) {
    this.userGroupsService = userGroupsService
    this.getUserGroupsByFireBaseId = this.getUserGroupsByFireBaseId.bind(this)
    this.createUserGroup = this.createUserGroup.bind(this)
  }

  async getUserGroupsByFireBaseId (req: Request, res: Response): Promise<void> {
    try {
      const groups = await this.userGroupsService.getUserGroupsByFireBaseId(req.params.userFireBaseId)
      res.status(200).send(groups)
    } catch (error) {
      this.logger.error(error)
      res.status(500).send(error)
    }
  }

  async createUserGroup (req: Request, res: Response): Promise<void> {
    try {
      const group = await this.userGroupsService.createUserGroup(req.body.data)
      res.status(200).send(group)
    } catch (error) {
      this.logger.error(error)
      res.status(500).send(error)
    }
  }
}
