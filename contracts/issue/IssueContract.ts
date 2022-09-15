export default class IssueContract { 
    title: string;
    description: string;
    status: string;
    createdByUser: string;
    createdByUserId: Int16Array;

    constructor(title: string, description: string, status: string, createdByUser: string, createdByUserId: Int16Array) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.createdByUser = createdByUser;
        this.createdByUserId = createdByUserId;
    }
}