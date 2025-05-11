"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletRequest = void 0;
class WalletRequest {
    req;
    idUser;
    amount;
    errorMessage = "";
    constructor(req) {
        this.req = req;
        this.idUser = req.body.idUser;
        this.amount = req.body.amount;
    }
    validate() {
        //Empty Validations
        if (this.isEmptyOrNullString(this.idUser)) {
            this.errorMessage = `Input idUser is empty`;
            return false;
        }
        if (this.isEmptyOrNullString(this.amount)) {
            this.errorMessage = `Input totalAmount is empty`;
            return false;
        }
        //Number Validations create validation imput way
        // if (this.isNotNumber(this.idwallet)){
        //     this.errorMessage = `Input wallet is not a number`;
        //     return false;
        // }
        if (this.isNotNumber(this.amount)) {
            this.errorMessage = `Input amount is not a number`;
            return false;
        }
        //Negative Number Validations
        if (this.isNotNegativeNumber(this.amount)) {
            this.errorMessage = `Input amount is a negative number`;
            return false;
        }
        return true;
    }
    toCommand() {
        return {
            idUser: this.idUser,
            amount: Number(this.amount)
        };
    }
    isEmptyOrNullString(validation) {
        if (validation === null || validation === undefined || validation === "") {
            return true;
        }
        return false;
    }
    isNotNumber(validation) {
        if (Number.isNaN(Number(validation) % 1)) {
            return true;
        }
        return false;
    }
    isNotNegativeNumber(validation) {
        if (Number(validation) < 0) {
            return true;
        }
        return false;
    }
}
exports.WalletRequest = WalletRequest;
