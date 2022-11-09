import GroupsService from '../services/GroupsService'
import pino from 'pino'
import { Request, Response } from 'express'

export default class GroupsController {
  private readonly groupsService: GroupsService
  private readonly logger = pino({
    transport: {
      target: 'pino-pretty'
    }
  })

  constructor (groupsService: GroupsService) {
    this.groupsService = groupsService
    this.getNewestGroups = this.getNewestGroups.bind(this)
    this.createGroup = this.createGroup.bind(this)
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

  async createGroup (req: Request, res: Response): Promise<void> {
    try {
      const group = await this.groupsService.createGroup(req.body)
      res.send(group).status(200)
    } catch (e) {
      this.logger.error(e)
      res.send(e).status(500)
    }
  }
}
