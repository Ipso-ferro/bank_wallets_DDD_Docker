"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHandler = void 0;
class UserHandler {
    repositoryUser;
    constructor(repositoryUser) {
        this.repositoryUser = repositoryUser;
    }
    async handlerAddNewUser(command) {
        try {
            const user = {
                idUser: command.idUser,
                totalBalance: command.totalBalance
            };
            if (await this.repositoryUser.getUserById(user.idUser)) {
                throw new Error("user already exist");
            }
            this.repositoryUser.addNewUser(user);
            return {
                status: 200,
                message: "user created"
            };
        }
        catch (error) {
            return {
                status: 202,
                message: error.message
            };
        }
    }
    async getUserById(query) {
        try {
            const result = await this.repositoryUser.getUserById(query.id);
            if (!result) {
                throw new Error("user does not exist");
            }
            return result;
        }
        catch (error) {
            return {
                status: 404,
                message: error.message
            };
        }
    }
    async getAllUsers() {
        return this.repositoryUser.getAllUsers();
    }
}
exports.UserHandler = UserHandler;
