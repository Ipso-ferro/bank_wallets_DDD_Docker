import { AddNewUserCommand } from "../command/AddNewUserCommand";
import { HandlerResponse } from "../models/HandlerResponse";
import { User } from "../models/User";
import { GetUserIdQuery } from "../queries/GetUserIdQuery";
import { RepositoryUser } from "../repositories/RepositoryUser";
export declare class UserHandler {
    readonly repositoryUser: RepositoryUser;
    constructor(repositoryUser: RepositoryUser);
    handlerAddNewUser(command: AddNewUserCommand): Promise<HandlerResponse>;
    getUserById(query: GetUserIdQuery): Promise<User | HandlerResponse>;
    getAllUsers(): Promise<User[]>;
}
