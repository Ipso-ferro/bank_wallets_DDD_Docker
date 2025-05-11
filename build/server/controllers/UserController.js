"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const express_1 = require("express");
const AddNewUserRequest_1 = require("../requests/AddNewUserRequest");
class UserControllers {
    userHandler;
    path = "/bank";
    constructor(userHandler) {
        this.userHandler = userHandler;
    }
    router() {
        const router = (0, express_1.Router)();
        router.post("/add/user", async (req, res) => {
            try {
                const requestValidator = new AddNewUserRequest_1.AddNewUserRequest(req);
                if (!requestValidator.validate()) {
                    throw new Error(requestValidator.errorMessage);
                }
                const response = await this.userHandler.handlerAddNewUser(requestValidator.toCommand());
                res.status((response).status).json(response);
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
        router.get("/user/:id", async (req, res) => {
            const id = req.params.id;
            const customerId = { id };
            const customer = await this.userHandler.getUserById(customerId);
            const response = customer == undefined ? [] : customer;
            res.status(200).json(response);
        });
        router.get("/all/users", async (req, res) => {
            const response = await this.userHandler.getAllUsers();
            res.status(200).json(response);
        });
        return router;
    }
}
exports.UserControllers = UserControllers;
