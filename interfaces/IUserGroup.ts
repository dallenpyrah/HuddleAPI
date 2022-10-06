import {UserGroups} from "@prisma/client";

export default interface IUserGroup {
    getUserGroups(userId: number): Promise<UserGroups[]>;
}