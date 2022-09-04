import bodyParser from 'body-parser';
import UserContract from '../../contracts/user/UserContract';
import express from 'express'
import { authenticationService } from '../../services/authentication/AuthenticationService';
import AuthenticationResponseContract from '../../contracts/authentication/AuthenticationResponseContract';

const router = express.Router();
const jsonParser = bodyParser.json();

class AuthenticationRouter {
    constructor(){
        const apiRoute = "/auth";
        router.post(`${apiRoute}/signup`, jsonParser, this.signup);
        router.get(`${apiRoute}/login`, jsonParser, this.login);
    }
    
    async signup(req: any, res: any){
        let isSignUpSuccessful = false;
        let statusCode = 0;
        let message = "";
        let authenticationResponse = null;

        try {
            const user = new UserContract(req.body.email, req.body.password, req.body.confirmPassword, req.body.fullName);
            const userCredentials = await authenticationService.signup(user);
            isSignUpSuccessful = userCredentials !== null ? true : false;
            statusCode = 200;
            message = isSignUpSuccessful ? "User created successfully" : "User creation failed";
            authenticationResponse = new AuthenticationResponseContract(userCredentials, isSignUpSuccessful, statusCode, message);

            res.send(authenticationResponse);
        } catch (error) {
            isSignUpSuccessful = false;
            statusCode = 500;
            message = error.message;
            authenticationResponse = new AuthenticationResponseContract(null, isSignUpSuccessful, statusCode, message);

            res.send(authenticationResponse)
        }
    }

    async login(req: any, res: any){
        const user = new UserContract(req.body.email, req.body.password)
        const loggedInUser = await authenticationService.login(user);
    }
}

export default AuthenticationRouter;