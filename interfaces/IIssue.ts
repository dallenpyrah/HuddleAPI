import {Issue} from "@prisma/client";

interface IIssue {
    getUserIssues(userId: number): Promise<Issue[]>;
}

export default IIssue;