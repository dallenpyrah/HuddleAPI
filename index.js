import express from 'express'
import AuthenticationRouter from './routers/authentication/AuthenticationRouter'

const app = express();

app.use("/api/v1", AuthenticationRouter)

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(8001, () => {
    console.log('Server started again on port 8001 - http://localhost:8001');
});
