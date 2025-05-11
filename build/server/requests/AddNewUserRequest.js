"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewUserRequest = void 0;
class AddNewUserRequest {
    req;
    idUser;
    totalBalance;
    errorMessage = "";
    constructor(req) {
        this.req = req;
        this.idUser = req.body.idUser;
        this.totalBalance = req.body.totalBalance;
    }
    validate() {
        //empty validation 
        if (this.isNotEmpty(this.idUser)) {
            this.errorMessage = "empty id";
            return true;
        }
        if (this.isNotEmpty(this.totalBalance)) {
            return true;
        }
        return false;
    }
    toCommand() {
        return {
            idUser: this.idUser,
            totalBalance: this.totalBalance
        };
    }
    isNotEmpty(validation) {
        if (validation == null || validation == "" || validation == undefined) {
            return false;
        }
        return true;
    }
}
exports.AddNewUserRequest = AddNewUserRequest;
