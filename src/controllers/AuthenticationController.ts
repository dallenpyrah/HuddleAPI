import {Request, Response} from 'express'
import AuthenticationService from '../services/AuthenticationService'
import pino from 'pino'
import {User} from '@firebase/auth'

export default class AuthenticationController {
    private readonly authenticationService: AuthenticationService
    private readonly logger: pino.Logger

    constructor(authenticationService: AuthenticationService, logger: pino.Logger) {
        this.authenticationService = authenticationService
        this.logger = logger
        this.signup = this.signup.bind(this)
    }

    async signup(req: Request, res: Response): Promise<void> {
        try {
            const user: User = req.body
            const dbUser = await this.authenticationService.signup(user)
            res.status(200).send(dbUser)
        } catch (error) {
            this.logger.error(error)
            res.status(500).send(error)
        }
    }
}
