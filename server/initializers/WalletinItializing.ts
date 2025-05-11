import { WalletTransactionService } from "../../domain/wallets/handlers/services/WalletTransactionService";
import { WalletHandler } from "../../domain/wallets/handlers/WalletHandler";
import { InMemoryRespositoryWallet} from "../../domain/wallets/repositories/InMemoryRespositoryWallet";
import { MySqlRepoWallet } from "../../domain/wallets/repositories/MySqlRepoWallet";
import { config } from "../config";
import { WalletController } from "../controllers/WalletController";
import { createPool } from "../pool";



//sql DB

export const sqlRepositoryUser = new MySqlRepoWallet(createPool(config.database))
const walletTransactionServicesSqlDb = new WalletTransactionService(sqlRepositoryUser)
const walletHandlerSqlDb = new WalletHandler(sqlRepositoryUser,walletTransactionServicesSqlDb);
export const walletControllerSqlDB = new WalletController(walletHandlerSqlDb)

//local memory

const walletInMemoryRepository = new InMemoryRespositoryWallet();
const walletTransactionServices = new WalletTransactionService(walletInMemoryRepository)
const walletHandler = new WalletHandler(walletInMemoryRepository,walletTransactionServices);
export const walletController = new WalletController(
  walletHandler,
);

