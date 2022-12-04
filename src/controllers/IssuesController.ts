import {Request, Response} from 'express'
import IssuesService from '../services/IssuesService'
import pino from 'pino'

export default class IssuesController {
    private readonly issuesService: IssuesService
    private readonly logger: pino.Logger

    constructor(issuesService: IssuesService, logger: pino.Logger) {
        this.issuesService = issuesService
        this.logger = logger
        this.getIssuesByUserId = this.getIssuesByUserId.bind(this)
        this.getCommunityIssues = this.getCommunityIssues.bind(this)
        this.getFilteredCommunityIssues = this.getFilteredCommunityIssues.bind(this)
        this.createIssue = this.createIssue.bind(this)
    }

    async getIssuesByUserId(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId)
            const issues = await this.issuesService.getIssuesByUserId(userId)
            res.status(200).send(issues)
        } catch (error) {
            this.logger.error(error)
            res.status(500).send(error)
        }
    }

    async getCommunityIssues(req: Request, res: Response): Promise<void> {
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

    async getFilteredCommunityIssues(req: Request, res: Response): Promise<void> {
        try {
            const filter = req.params.filter
            const issues = await this.issuesService.getFilteredCommunityIssues(filter)
            res.status(200).send(issues)
        } catch (error) {
            this.logger.error(error)
            res.status(500).send(error)
        }
    }

    async createIssue(req: Request, res: Response): Promise<void> {
        try {
            const issue = req.body
            const createdIssue = await this.issuesService.createIssue(issue)
            res.status(200).send(createdIssue)
        } catch (error) {
            this.logger.error(error)
            res.status(500).send(error)
        }
    }
}
