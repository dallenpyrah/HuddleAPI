import IssuesController from './controllers/IssuesController';
import express from 'express'
import AuthenticationController from './controllers/AuthenticationController'

const app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use("/api/v1", new AuthenticationController().router)
app.use("/api/v1", new IssuesController().router)

app.get('/', (req, res) => {  
    res.send('Hello World!');   
})

app.listen(8001, () => {
    // eslint-disable-next-line no-undef
    console.log('Server started again on port 8001 - http://localhost:8001');
});
