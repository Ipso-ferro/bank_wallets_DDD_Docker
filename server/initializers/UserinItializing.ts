import { UserHandler } from "../../domain/users/handlers/UserHandler";
import { InMemoryRepositoryUser } from "../../domain/users/repositories/InMemoryRepositoryUser";
import { MySqlRepoUser } from "../../domain/users/repositories/MySqlRepoUser";
import { UserControllers } from "../controllers/UserController";
import { config } from "../config";
import { createPool } from "../pool";
import { TotalUserMoneyCalculatorService } from "../../domain/users/handlers/services/TotalUserMoneyCalculatorService";

//initializing service
const serviceToDoTotalBalance = new TotalUserMoneyCalculatorService()

// sql DB

const sqlRepositoryUser = new MySqlRepoUser(createPool(config.database),serviceToDoTotalBalance)
const userHandlerSqlDb =  new UserHandler(sqlRepositoryUser)
export const userControllerSqlDb = new UserControllers(userHandlerSqlDb)


//local memory
const userInMemoryRepository = new InMemoryRepositoryUser()
const userHandler = new UserHandler(userInMemoryRepository)
export const userController = new UserControllers(userHandler)