import {Request, Response} from 'express'
import UserGroupsService from '../services/UserGroupsService'
import pino from 'pino'

export default class UserGroupsController {
    private readonly userGroupsService: UserGroupsService
    private readonly logger: pino.Logger

    constructor(userGroupsService: UserGroupsService, logger: pino.Logger) {
        this.userGroupsService = userGroupsService
        this.logger = logger
        this.getUserGroupsByUserId = this.getUserGroupsByUserId.bind(this)
        this.addUserToGroup = this.addUserToGroup.bind(this)
        this.getUsersByGroupId = this.getUsersByGroupId.bind(this)
    }

    async getUserGroupsByUserId(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId)
            const groups = await this.userGroupsService.getUserGroupsByUserId(userId)
            res.status(200).send(groups)
        } catch (error) {
            this.logger.error(error)
            res.status(500).send(error)
        }
    }

    async addUserToGroup(req: Request, res: Response): Promise<void> {
        try {
            const groupId = parseInt(req.params.groupId)
            const userId = parseInt(req.params.userId)
            const group = await this.userGroupsService.addUserToGroup(groupId, userId)
            res.status(200).send(group)
        } catch (error) {
            this.logger.error(error)
            res.status(500).send(error)
        }
    }

    async getUsersByGroupId(req: Request, res: Response): Promise<void> {
        try {
            const groupId = parseInt(req.params.groupId)
            const users = await this.userGroupsService.getUsersByGroupId(groupId)
            res.status(200).send(users)
        } catch (e) {
            this.logger.error(e)
            res.status(500).send(e)
        }
    }
}
