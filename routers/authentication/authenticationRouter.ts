import bodyParser from 'body-parser';
import UserContract from '../../contracts/user/UserContract';
import express from 'express'
import IAuthentication from '../../interfaces/authentication/IAuthentication';

const router = express.Router()
const jsonParser = bodyParser.json();

export default class AuthenticationRouter {
    private authenticationService: IAuthentication;

    constructor(authenticationService: IAuthentication) {
        this.authenticationService = authenticationService;
        router.post("/auth/signup", jsonParser, this.signup);
        router.get("/auth/login", jsonParser, this.login);
    }
    
    async signup(req: any, res: any){
        try {
            const user = new UserContract(req.body.email, req.body.password, req.body.confirmPassword, req.body.fullName);
            const createdUser = await this.authenticationService.signup(user);
            res.send(createdUser);
        } catch (error) {
            res.sendStatus(500);
        }
    }

    async login(req: any, res: any){
        const user = new UserContract(req.body.email, req.body.password)
        const loggedInUser = await this.authenticationService.login(user);
    }
}