import { Router } from "express";
import { UserHandler } from "../../domain/users/handlers/UserHandler";
import { ApiController } from "./ApiController";
export declare class UserControllers implements ApiController {
    readonly userHandler: UserHandler;
    readonly path = "/bank";
    constructor(userHandler: UserHandler);
    router(): Router;
}
