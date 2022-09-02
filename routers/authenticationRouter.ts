import bodyParser from 'body-parser';
import express from 'express'
import * as authenticationService from '../services/authenticationService';

const router = express.Router()
const jsonParser = bodyParser.json();

router.post("/auth/adduser", jsonParser, async (req: any, res: any) => {
        try {
            const user = new UserContract(req.body.email, req.body.password, req.body.confirmPassword, req.body.fullName);
            const createdUser = await authenticationService.authenticationService.addUser(user);
            res.send(createdUser);
        } catch (error) {
            res.sendStatus(500);
        }
    }
);

router.get("/auth/getuser", async (req: any, res: any) => {
        res.send("Hello World");
})

export default router;