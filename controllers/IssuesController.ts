import { Request, Response } from 'express'
import IssuesService from '../services/IssuesService'
import pino from 'pino'

export default class IssuesController {
  private readonly userIssuesService: IssuesService
  private readonly logger = pino({ prettyPrint: true })

  constructor (userIssuesService: IssuesService) {
    this.userIssuesService = userIssuesService
    this.getUserIssues = this.getUserIssues.bind(this)
  }

  async getUserIssues (req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId)
      const issues = await this.userIssuesService.getUserIssues(userId)
      res.status(200).send(issues)
    } catch (error) {
      this.logger.error(error)
      res.status(500).send(error)
    }
  }
}
