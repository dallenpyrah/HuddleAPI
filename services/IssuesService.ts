import IssueContract from "../contracts/IssueContract";
import IssuesRepository from "../repositories/IssuesRepository";

export default class IssuesService {
    private issuesRepository: IssuesRepository;

    constructor(issuesRepository: IssuesRepository) {
        this.issuesRepository = issuesRepository;
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