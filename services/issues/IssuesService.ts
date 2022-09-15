import IssueContract from "../../contracts/issue/IssueContract";
import { issuesRepository } from "../../repositories/issues/IssuesRepository";

class IssuesService {
    async createIssue(issueToCreate: IssueContract) { 
        const isIssueValid = this.validateIssueFields(issueToCreate);

        if (isIssueValid) { 
            issuesRepository.createIssue(issueToCreate);
        }
    }

    validateIssueFields(issueToValidate: IssueContract) : boolean { 
        if (issueToValidate.createdByUser.length < 1) {
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