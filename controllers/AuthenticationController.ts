import UserContract from '../contracts/UserContract'
import { Request, Response } from 'express'
import AuthenticationService from '../services/AuthenticationService'
import AuthenticationResponseContract from '../contracts/AuthenticationResponseContract'
import pino from 'pino'

export default class AuthenticationController {
  private readonly authenticationService: AuthenticationService
  private readonly logger = pino({ prettyPrint: true })

  constructor (authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService
    this.signup = this.signup.bind(this)
    this.login = this.login.bind(this)
  }

  async signup (req: Request, res: Response): Promise<void> {
    let isSignUpSuccessful = false
    let statusCode = 0
    let message = ''
    let authenticationResponse = null

    try {
      const user = new UserContract(req.body.email, req.body.password, req.body.confirmPassword, req.body.fullName)
      const userCredentials = await this.authenticationService.signup(user)
      isSignUpSuccessful = userCredentials !== null
      statusCode = 200
      message = isSignUpSuccessful ? 'User created successfully' : 'User creation failed'
      authenticationResponse = new AuthenticationResponseContract(isSignUpSuccessful, statusCode, message, userCredentials)

      res.send(authenticationResponse)
    } catch (error) {
      statusCode = 500
      message = this.authenticationService.getErrorMessageFromErrorCode(error)
      authenticationResponse = new AuthenticationResponseContract(isSignUpSuccessful, statusCode, message)
      this.logger.error(authenticationResponse)
      res.send(authenticationResponse)
    }
  }

  async login (req: Request, res: Response): Promise<void> {
    let isLoginSuccessful = false
    let statusCode = 0
    let message = ''
    let authenticationResponse = null

    try {
      const user = new UserContract(req.body.email, req.body.password)
      const userCredentials = await this.authenticationService.login(user)
      isLoginSuccessful = userCredentials !== null
      statusCode = 200
      message = isLoginSuccessful ? 'User logged in successfully' : 'User login failed'
      authenticationResponse = new AuthenticationResponseContract(isLoginSuccessful, statusCode, message, userCredentials)

      res.send(authenticationResponse)
    } catch (error) {
      statusCode = 500
      message = this.authenticationService.getErrorMessageFromErrorCode(error)
      authenticationResponse = new AuthenticationResponseContract(isLoginSuccessful, statusCode, message)
      this.logger.error(authenticationResponse)
      res.send(authenticationResponse)
    }
  }
}
