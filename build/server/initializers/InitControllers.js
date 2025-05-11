"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createControllers = void 0;
const UserinItializing_1 = require("./UserinItializing");
const WalletinItializing_1 = require("./WalletinItializing");
const createControllers = () => {
    let controllers = [];
    controllers.push(UserinItializing_1.userControllerSqlDb);
    // controllers.push(userController)
    controllers.push(WalletinItializing_1.walletControllerSqlDB);
    // controllers.push(walletController)
    return controllers;
};
exports.createControllers = createControllers;
