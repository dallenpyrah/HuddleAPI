export default class IssueContract { 
    title: string;
    description: string;
    status: string;
    userId: number;
    language: string;
    framework: string;

    constructor(title: string, description: string, status: string, userId: number, language: string, framework: string) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.userId = userId;
        this.language = language;
        this.framework = framework;
    }
}