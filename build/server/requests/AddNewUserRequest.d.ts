import { Request } from "express";
import { AddNewUserCommand } from "../../domain/users/command/AddNewUserCommand";
export declare class AddNewUserRequest {
    readonly req: Request;
    readonly idUser: string;
    readonly totalBalance: number;
    errorMessage: string;
    constructor(req: Request);
    validate(): boolean;
    toCommand(): AddNewUserCommand;
    private isNotEmpty;
}
