import GroupsService from '../services/GroupsService'
import pino from 'pino'
import {Request, Response} from 'express'

export default class GroupsController {
    private readonly groupsService: GroupsService
    private readonly logger: pino.Logger

    constructor(groupsService: GroupsService, logger: pino.Logger) {
        this.groupsService = groupsService
        this.logger = logger
        this.getNewestGroups = this.getNewestGroups.bind(this)
        this.createGroup = this.createGroup.bind(this)
        this.getGroupById = this.getGroupById.bind(this)
        this.getIssuesByGroupId = this.getIssuesByGroupId.bind(this)
    }

    async getNewestGroups(req: Request, res: Response): Promise<void> {
        try {
            const groups = await this.groupsService.getNewestGroups()
            res.send(groups).status(200)
        } catch (e) {
            this.logger.error(e)
            res.send(e).status(500)
        }
    }

    async createGroup(req: Request, res: Response): Promise<void> {
        try {
            req.body.groupId = req.params.groupId
            const group = await this.groupsService.createGroup(req.body)
            res.send(group).status(200)
        } catch (e) {
            this.logger.error(e)
            res.send(e).status(500)
        }
    }

    async getGroupById(req: Request, res: Response): Promise<void> {
        try {
            const groupId = parseInt(req.params.groupId)
            const group = await this.groupsService.getGroupById(groupId)
            res.send(group).status(200)
        } catch (e) {
            this.logger.error(e)
            res.send(e).status(500)
        }
    }

    async getIssuesByGroupId(req: Request, res: Response): Promise<void> {
        try {
            const groupId = parseInt(req.params.groupId)
            const issues = await this.groupsService.getIssuesByGroupId(groupId)
            res.send(issues).status(200)
        } catch (e) {
            this.logger.error(e)
            res.send(e).status(500)
        }
    }
}
