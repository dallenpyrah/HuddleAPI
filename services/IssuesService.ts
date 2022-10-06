import IIssue from "../interfaces/IIssue";
import {Issue} from "@prisma/client";


export default class IssuesService {
    private userIssuesRepository: IIssue;

    constructor(userIssuesRepository: IIssue) {
        this.userIssuesRepository = userIssuesRepository;
        this.getUserIssues = this.getUserIssues.bind(this);
    }

    async getUserIssues(userId: number): Promise<Issue[]> {
        return await this.userIssuesRepository.getUserIssues(userId);
    }
}