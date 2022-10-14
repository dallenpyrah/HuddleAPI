import { Request, Response } from 'express'
import IssuesService from '../services/IssuesService'
import pino from 'pino'

export default class IssuesController {
  private readonly userIssuesService: IssuesService
  private readonly logger = pino()

  constructor (userIssuesService: IssuesService) {
    this.userIssuesService = userIssuesService
    this.getIssuesByFireBaseId = this.getIssuesByFireBaseId.bind(this)
  }

  async getIssuesByFireBaseId (req: Request, res: Response): Promise<void> {
    try {
      const fireBaseId = req.params.userId
      const issues = await this.userIssuesService.getIssuesByFireBaseId(fireBaseId)
      res.status(200).send(issues)
    } catch (error) {
      this.logger.error(error)
      res.status(500).send(error)
    }
  }
}
