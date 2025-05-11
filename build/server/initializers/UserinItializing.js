"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.userControllerSqlDb = void 0;
const UserHandler_1 = require("../../domain/users/handlers/UserHandler");
const InMemoryRepositoryUser_1 = require("../../domain/users/repositories/InMemoryRepositoryUser");
const MySqlRepoUser_1 = require("../../domain/users/repositories/MySqlRepoUser");
const UserController_1 = require("../controllers/UserController");
const config_1 = require("../config");
const pool_1 = require("../pool");
const TotalUserMoneyCalculatorService_1 = require("../../domain/users/handlers/services/TotalUserMoneyCalculatorService");
//initializing service
const serviceToDoTotalBalance = new TotalUserMoneyCalculatorService_1.TotalUserMoneyCalculatorService();
// sql DB
const sqlRepositoryUser = new MySqlRepoUser_1.MySqlRepoUser((0, pool_1.createPool)(config_1.config.database), serviceToDoTotalBalance);
const userHandlerSqlDb = new UserHandler_1.UserHandler(sqlRepositoryUser);
exports.userControllerSqlDb = new UserController_1.UserControllers(userHandlerSqlDb);
//local memory
const userInMemoryRepository = new InMemoryRepositoryUser_1.InMemoryRepositoryUser();
const userHandler = new UserHandler_1.UserHandler(userInMemoryRepository);
exports.userController = new UserController_1.UserControllers(userHandler);
