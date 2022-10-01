import IssuesController from './controllers/IssuesController';
import express from 'express'
import AuthenticationController from './controllers/AuthenticationController'
import GroupsController from './controllers/GroupsController'
import "reflect-metadata";
import GroupsService from './services/GroupsService';
import GroupsRepository from './repositories/GroupsRepository';
import { PrismaClient } from '@prisma/client';
import AuthenticationService from './services/AuthenticationService';
import AuthenticationRepository from './repositories/AuthenticationRepository';
import IssuesService from './services/IssuesService';
import IssuesRepository from './repositories/IssuesRepository';

const app = express();

const authenticationController = new AuthenticationController("/auth", new AuthenticationService(new AuthenticationRepository(new PrismaClient())));
const issuesController = new IssuesController("/issues", new IssuesService(new IssuesRepository(new PrismaClient())));
const groupsController = new GroupsController("/groups", new GroupsService(new GroupsRepository(new PrismaClient())));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use("/api/v1", authenticationController.router)
app.use("/api/v1", issuesController.router)
app.use("/api/v1", groupsController.router)


app.get('/', (req, res) => {  
    res.send('Hello World!');   
})

app.listen(8001, () => {
    // eslint-disable-next-line no-undef
    console.log('Server started again on port 8001 - http://localhost:8001');
});
