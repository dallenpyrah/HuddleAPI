import bodyParser from 'body-parser';
import UserContract from '../../contracts/user/UserContract';
import express from 'express'
import IAuthentication from '../../interfaces/authentication/IAuthentication';

const router = express.Router()
const jsonParser = bodyParser.json();

export default class GoogleAuthenticationRouter {
    private githubAuthenticationService: IAuthentication;

    constructor(githubAuthenticationService: IAuthentication) {
        this.githubAuthenticationService = githubAuthenticationService;
        router.post("/auth/github/signup", jsonParser, this.signup);
        router.get("/auth/github/login", jsonParser, this.login);
    }
    
    async signup(req: any, res: any){
    }

    async login(req: any, res: any){
    }
}