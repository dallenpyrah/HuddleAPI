import bodyParser from 'body-parser';
import UserContract from '../../contracts/user/UserContract';
import express from 'express'
import { authenticationService } from '../../services/authentication/AuthenticationService';

const router = express.Router()
const jsonParser = bodyParser.json();

class GoogleAuthenticationRouter {
    constructor(){
        const apiRoute = "/auth/google";
        router.post(`${apiRoute}/signup`, jsonParser, this.signup);
        router.get(`${apiRoute}/login`, jsonParser, this.login);
    }
    
    async signup(req: any, res: any){
    }

    async login(req: any, res: any){
    }
}

export default GoogleAuthenticationRouter;