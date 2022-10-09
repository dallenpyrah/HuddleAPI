import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import GroupsService from '../services/GroupsService'
import pino from 'pino'

export default class GroupsController {
  public router = express.Router()
  private readonly jsonParser = bodyParser.json()
  private readonly groupsService: GroupsService
  private readonly logger = pino({ prettyPrint: true })

  constructor (apiRoute: string, groupsService: GroupsService) {
    this.router.post(`${apiRoute}`, this.jsonParser, this.groupsService.createGroup)
    this.groupsService = groupsService
  }

  async createGroup (req: Request, res: Response): Promise<void> {
    try {
      const groups = await this.groupsService.createGroup(req.body)
      res.status(200).send(groups)
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
