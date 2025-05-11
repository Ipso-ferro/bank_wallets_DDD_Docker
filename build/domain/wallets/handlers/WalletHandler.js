"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletHandler = void 0;
const uuid_1 = require("uuid");
class WalletHandler {
    repositoryWallet;
    walletTransactionService;
    constructor(repositoryWallet, walletTransactionService) {
        this.repositoryWallet = repositoryWallet;
        this.walletTransactionService = walletTransactionService;
    }
    async getWallet(query) {
        return this.repositoryWallet.getWallet(query.id);
    }
    async getAllWalletsOfUser(query) {
        return this.repositoryWallet.getAllWalletsOfUser(query.idPropieter);
    }
    async getHistoryOfAllTransactions() {
        return this.repositoryWallet.getHistoryOfAllTransactions();
    }
    async getHistoryOfUserTransactions(query) {
        this.repositoryWallet.getHistoryOfUserTransactions(query.idPropieter);
    }
    async createWallet(command) {
        try {
            if (await this.repositoryWallet.getWallet(command.idWallet))
                throw Error("wallet ID already created");
            const myuuid = (0, uuid_1.v4)();
            const newWallet = {
                idUser: command.idUser,
                amount: command.amount,
                idWallet: myuuid
            };
            this.repositoryWallet.createWallet(newWallet);
            return {
                status: 200,
                message: "wallet created"
            };
        }
        catch (error) {
            return {
                status: 202,
                message: error.message
            };
        }
    }
    async transactionCreatorService(query) {
        const newTransaction = {
            walletSender: query.walletSender,
            walletReciving: query.walletReciving,
            amountToTransaction: query.amountToTransaction,
        };
        this.walletTransactionService.transactionCreatorService(newTransaction);
    }
    async getAllWallets() {
        return this.repositoryWallet.getAllWallets();
    }
}
exports.WalletHandler = WalletHandler;
