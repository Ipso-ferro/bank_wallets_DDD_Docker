

import { ApiController } from "../controllers/ApiController"
import { userController, userControllerSqlDb } from "./UserinItializing"
import { walletController,walletControllerSqlDB} from "./WalletinItializing"

export const createControllers = ():ApiController[] => {
    let controllers:ApiController[] = []
    controllers.push(userControllerSqlDb)
    // controllers.push(userController)
    controllers.push(walletControllerSqlDB)
    // controllers.push(walletController)
    return controllers
}