import bodyParser from 'body-parser';
import UserContract from '../../contracts/user/userContract';
import express from 'express'
import { googleAuthenticationService} from '../../services/authentication/googleAuthenticationService';

const router = express.Router()
const jsonParser = bodyParser.json();

router.post("/auth/google/signup", jsonParser, async (req: any, res: any) => {
        try {
            const user = new UserContract(req.body.email, req.body.password, req.body.confirmPassword, req.body.fullName);
            const createdUser = await googleAuthenticationService.signup(user);
            res.send(createdUser);
        } catch (error) {
            res.sendStatus(500);
        }
    }
);

router.get("/auth/google/login", jsonParser, async (req: any, res: any) => {
        const user = new UserContract(req.body.email, req.body.password)
        const loggedInUser = await googleAuthenticationService.login(user);
})

export default router;