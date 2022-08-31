import express from 'express'
import AuthenticationController from './controllers/AuthenticationController'

const app = express();

app.use("/api/v1", AuthenticationController)

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(8001, () => {
    console.log('Server started again on port 8001 - http://localhost:8001');
});
