import bodyParser from 'body-parser';
import UserContract from '../contracts/UserContract';
import express from 'express'
import { Request, Response } from 'express';
import AuthenticationService from '../services/AuthenticationService';
import AuthenticationResponseContract from '../contracts/AuthenticationResponseContract';

class AuthenticationController {
    public router = express.Router();
    private jsonParser = bodyParser.json();
    private authenticationService: AuthenticationService;

    constructor(apiRoute: string, authenticationService: AuthenticationService){
        this.router.post(`${apiRoute}/signup`, this.jsonParser, this.signup);
        this.router.post(`${apiRoute}/login`, this.jsonParser, this.login);
        this.authenticationService = authenticationService
    }
    
    async signup(req: Request, res: Response){
        let isSignUpSuccessful = false;
        let statusCode = 0;
        let message = "";
        let authenticationResponse = null;

        try {
            const user = new UserContract(req.body.email, req.body.password, req.body.confirmPassword, req.body.fullName);
            const userCredentials = await this.authenticationService.signup(user);
            isSignUpSuccessful = userCredentials !== null ? true : false;
            statusCode = 200;
            message = isSignUpSuccessful ? "User created successfully" : "User creation failed";
            authenticationResponse = new AuthenticationResponseContract(userCredentials, isSignUpSuccessful, statusCode, message);

            res.send(authenticationResponse);
        } catch (error) {
            statusCode = 500;
            message = this.authenticationService.getErrorMessageFromErrorCode(error);
            authenticationResponse = new AuthenticationResponseContract(null, isSignUpSuccessful, statusCode, message);

            res.send(authenticationResponse)
        }
    }

    async login(req: Request, res: Response){
        let isLoginSuccessful = false;
        let statusCode = 0;
        let message = "";
        let authenticationResponse = null;

        try {
            const user = new UserContract(req.body.email, req.body.password)
            const userCredentials = await this.authenticationService.login(user);
            isLoginSuccessful = userCredentials !== null ? true : false;
            statusCode = 200;
            message = isLoginSuccessful ? "User logged in successfully" : "User login failed";
            authenticationResponse = new AuthenticationResponseContract(userCredentials, isLoginSuccessful, statusCode, message);

            res.send(authenticationResponse);
        } catch (error) {
            statusCode = 500;
            message = this.authenticationService.getErrorMessageFromErrorCode(error);
            authenticationResponse = new AuthenticationResponseContract(null, isLoginSuccessful, statusCode, message);

            res.send(authenticationResponse)
        }
    }
}

export default AuthenticationController;