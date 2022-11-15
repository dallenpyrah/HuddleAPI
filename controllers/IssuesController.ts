import { Request, Response } from 'express'
import IssuesService from '../services/IssuesService'
import pino from 'pino'

export default class IssuesController {
  private readonly issuesService: IssuesService
  private readonly logger: pino.Logger

  constructor (issuesService: IssuesService, logger: pino.Logger) {
    this.issuesService = issuesService
    this.logger = logger
    this.getIssuesByFireBaseId = this.getIssuesByFireBaseId.bind(this)
    this.getCommunityIssues = this.getCommunityIssues.bind(this)
    this.getFilteredCommunityIssues = this.getFilteredCommunityIssues.bind(this)
  }

  async getIssuesByFireBaseId (req: Request, res: Response): Promise<void> {
    try {
      const fireBaseId = req.params.userId
      const issues = await this.issuesService.getIssuesByFireBaseId(fireBaseId)
      res.status(200).send(issues)
    } catch (error) {
      this.logger.error(error)
      res.status(500).send(error)
    }
  }

  async getCommunityIssues (req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.params.limit)
      const afterId = parseInt(req.params.afterId)
      const issues = await this.issuesService.getCommunityIssues(limit, afterId)
      res.status(200).send(issues)
    } catch (error) {
      this.logger.error(error)
      res.status(500).send(error)
    }
  }

  async getFilteredCommunityIssues (req: Request, res: Response): Promise<void> {
    try {
      const filter = req.params.filter
      const issues = await this.issuesService.getFilteredCommunityIssues(filter)
      res.status(200).send(issues)
    } catch (error) {
      this.logger.error(error)
      res.status(500).send(error)
    }
  }
}
