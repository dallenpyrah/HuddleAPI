import bodyParser from 'body-parser';
import UserContract from '../../contracts/user/userContract';
import express from 'express'
import { authenticationService} from '../../services/authentication/authenticationService';

const router = express.Router()
const jsonParser = bodyParser.json();

router.post("/auth/signup", jsonParser, async (req: any, res: any) => {
        try {
            const user = new UserContract(req.body.email, req.body.password, req.body.confirmPassword, req.body.fullName);
            const createdUser = await authenticationService.signup(user);
            res.send(createdUser);
        } catch (error) {
            res.sendStatus(500);
        }
    }
);

router.get("/auth/login", jsonParser, async (req: any, res: any) => {
        const user = new UserContract(req.body.email, req.body.password)
        const loggedInUser = await authenticationService.login(user);
})

export default router;