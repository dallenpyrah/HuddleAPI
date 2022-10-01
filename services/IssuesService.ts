import { Issue } from "@prisma/client";
import IssueContract from "../contracts/IssueContract";
import { issuesRepository } from "../repositories/IssuesRepository";

class IssuesService {
    async createIssue(issueToCreate: IssueContract) : Promise<Issue> { 
        const isIssueValid = this.validateIssueFields(issueToCreate);
        let issue = {} as Issue;

        if (isIssueValid) { 
            issue = await issuesRepository.createIssue(issueToCreate);
        }

        return issue;
    }

    validateIssueFields(issueToValidate: IssueContract) : boolean { 
        if (issueToValidate.userId > 0) {
            throw new Error("User is required");
        }

        if (issueToValidate.title.length < 1) { 
            throw new Error("Title is required");
        }

        if (issueToValidate.description.length < 1) { 
            throw new Error("Description is required");
        }

        if (issueToValidate.status.length < 1) {
            throw new Error("Status is required");
        }

        return true;
    }
}

export const issuesService = new IssuesService();