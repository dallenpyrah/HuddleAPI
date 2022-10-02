import UserContract from '../contracts/UserContract';
import {Request, Response} from 'express'
import AuthenticationService from '../services/AuthenticationService';
import AuthenticationResponseContract from '../contracts/AuthenticationResponseContract';

class AuthenticationController {
    private authenticationService: AuthenticationService;

    constructor(authenticationService: AuthenticationService) {
        this.authenticationService = authenticationService
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }
    
    async signup(req: Request, res: Response){
        let isSignUpSuccessful = false;
        let statusCode = 0;
        let message = "";
        let authenticationResponse = null;

        try {
            const user = new UserContract(req.body.email, req.body.password, req.body.confirmPassword, req.body.fullName);
            const userCredentials = await this.authenticationService.signup(user);
            isSignUpSuccessful = userCredentials !== null;
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
            isLoginSuccessful = userCredentials !== null;
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