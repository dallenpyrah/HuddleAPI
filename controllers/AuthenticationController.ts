import express from 'express'

const router = express.Router()

router.post("/auth/adduser", async (req: any, res: any) => {
        try {
            const user = req.body;
            user.fullName = user.fullName.toLowerCase();
            user.email = user.email.toLowerCase();

            if(user.email.length < 1 || user.password.length < 1 || user.fullName.length < 1) {
                throw new Error("All fields are required");
            }

            if(user.password !== user.confirmPassword) {
                throw new Error("Passwords do not match");
            }

        } catch (error) {
            res.sendStatus(500);
        }
    }
);

router.get("/auth/getuser", async (req: any, res: any) => {
        res.send("Hello World");
})

export default router;