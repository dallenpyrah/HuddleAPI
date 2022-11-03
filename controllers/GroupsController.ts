import GroupsService from '../services/GroupsService'
import pino from 'pino'
import { Request, Response } from 'express'

export default class GroupsController {
  private readonly groupsService: GroupsService
  private readonly logger = pino()

  constructor (groupsService: GroupsService) {
    this.groupsService = groupsService
    this.getNewestGroups = this.getNewestGroups.bind(this)
  }

  async getNewestGroups (req: Request, res: Response): Promise<void> {
    try {
      const groups = await this.groupsService.getNewestGroups()
      res.send(groups).status(200)
    } catch (e) {
      this.logger.error(e)
      res.send(e).status(500)
    }
  }
}
