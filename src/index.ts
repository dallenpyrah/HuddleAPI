import express from 'express'
import UserGroupsRoutes from './routes/UserGroupsRoutes'
import AuthenticationRoutes from './routes/AuthenticationRoutes'
import IssuesRoutes from './routes/IssuesRoutes'
import bodyParser from 'body-parser'
import NotificationRoutes from './routes/NotificationRoutes'
import GroupsRoutes from './routes/GroupsRoutes'
import * as https from "https";
import * as fs from "fs";

const app = express()
const jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})

const userGroupsRoutes = new UserGroupsRoutes(app)
const authenticationRoutes = new AuthenticationRoutes(app)
const issuesRoutes = new IssuesRoutes(app)
const notificationRoutes = new NotificationRoutes(app)
const groupRoutes = new GroupsRoutes(app)

userGroupsRoutes.createRoutes()
authenticationRoutes.createRoutes()
issuesRoutes.createRoutes()
notificationRoutes.createRoutes()
groupRoutes.createRoutes()

app.get('/', (req, res) => {
    res.send('API is running')
})

https
    .createServer(
        {
            key: fs.readFileSync("server.key"),
            cert: fs.readFileSync("server.cert"),
        },
        app
    )
    .listen(8001, function () {
        console.log(
            "Example app listening on port 8001! Go to https://localhost:8001/"
        );
    });
