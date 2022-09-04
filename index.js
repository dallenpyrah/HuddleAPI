import express from 'express'
import AuthenticationController from './routers/authentication/AuthenticationController'

const app = express();

app.use("/api/v1", new AuthenticationController().router)

app.get('/', (req, res) => {  
    res.send('Hello World!');   
})

app.listen(8001, () => {
    // eslint-disable-next-line no-undef
    console.log('Server started again on port 8001 - http://localhost:8001');
});
