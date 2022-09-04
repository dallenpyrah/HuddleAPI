import bodyParser from 'body-parser';
import express from 'express'

const router = express.Router()
const jsonParser = bodyParser.json();

class GithubAuthenticationRouter {
    constructor(){
        const apiRoute = "/auth/github";
        router.post(`${apiRoute}/signup`, jsonParser, this.signup);
        router.get(`${apiRoute}/login`, jsonParser, this.login);
    }
    
    async signup(req: any, res: any){
    }

    async login(req: any, res: any){
    }
}

export default GithubAuthenticationRouter;