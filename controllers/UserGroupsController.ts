import { Request, Response } from 'express'
import UserGroupsService from '../services/UserGroupsService'
import pino from 'pino'

export default class UserGroupsController {
  private readonly userGroupsService: UserGroupsService
  private readonly logger = pino({ prettyPrint: true })

  constructor (userGroupsService: UserGroupsService) {
    this.userGroupsService = userGroupsService
    this.getUserGroups = this.getUserGroups.bind(this)
  }

  async getUserGroups (req: Request, res: Response): Promise<void> {
    try {
      const groups = await this.userGroupsService.getUserGroups(parseInt(req.params.userId))
      res.status(200).send(groups)
    } catch (error) {
      this.logger.error(error)
      res.status(500).send(error)
    }
  }
}
