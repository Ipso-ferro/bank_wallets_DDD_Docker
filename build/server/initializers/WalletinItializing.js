"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletController = exports.walletControllerSqlDB = exports.sqlRepositoryUser = void 0;
const WalletTransactionService_1 = require("../../domain/wallets/handlers/services/WalletTransactionService");
const WalletHandler_1 = require("../../domain/wallets/handlers/WalletHandler");
const InMemoryRespositoryWallet_1 = require("../../domain/wallets/repositories/InMemoryRespositoryWallet");
const MySqlRepoWallet_1 = require("../../domain/wallets/repositories/MySqlRepoWallet");
const config_1 = require("../config");
const WalletController_1 = require("../controllers/WalletController");
const pool_1 = require("../pool");
//sql DB
exports.sqlRepositoryUser = new MySqlRepoWallet_1.MySqlRepoWallet((0, pool_1.createPool)(config_1.config.database));
const walletTransactionServicesSqlDb = new WalletTransactionService_1.WalletTransactionService(exports.sqlRepositoryUser);
const walletHandlerSqlDb = new WalletHandler_1.WalletHandler(exports.sqlRepositoryUser, walletTransactionServicesSqlDb);
exports.walletControllerSqlDB = new WalletController_1.WalletController(walletHandlerSqlDb);
//local memory
const walletInMemoryRepository = new InMemoryRespositoryWallet_1.InMemoryRespositoryWallet();
const walletTransactionServices = new WalletTransactionService_1.WalletTransactionService(walletInMemoryRepository);
const walletHandler = new WalletHandler_1.WalletHandler(walletInMemoryRepository, walletTransactionServices);
exports.walletController = new WalletController_1.WalletController(walletHandler);
