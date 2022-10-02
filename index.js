import express from 'express'
import AuthenticationController from './controllers/AuthenticationController'
import UserGroupsController from './controllers/UserGroupsController'
import UserGroupsService from './services/UserGroupsService';
import UserGroupsRepository from './repositories/UserGroupsRepository';
import { PrismaClient } from '@prisma/client';
import AuthenticationService from './services/AuthenticationService';
import AuthenticationRepository from './repositories/AuthenticationRepository';

const app = express();

const authenticationController = new AuthenticationController("/auth", new AuthenticationService(new AuthenticationRepository(new PrismaClient())));
const userGroupsController = new UserGroupsController("/usergroups", new UserGroupsService(new UserGroupsRepository(new PrismaClient())));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use("/api/v1", authenticationController.router)
app.use("/api/v1", userGroupsController.router)


app.get('/', (req, res) => {  
    res.send('Hello World!');   
})

app.listen(8001, () => {
    // eslint-disable-next-line no-undef
    console.log('Server started again on port 8001 - http://localhost:8001');
});
