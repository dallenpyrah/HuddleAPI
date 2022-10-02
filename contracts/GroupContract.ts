export default class GroupContract {
    name: string;
    description: string;
    userId: number;
    color: string; 

    constructor(name: string, description: string, userId: number, color: string) {
        this.name = name;
        this.description = description;
        this.userId = userId;
        this.color = color;
    }
}