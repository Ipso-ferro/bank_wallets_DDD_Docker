"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryRespositoryWallet = void 0;
class InMemoryRespositoryWallet {
    allWallets = [];
    historyTransactions = [];
    async getWallet(id) {
        return this.allWallets.find((item) => item.idWallet == id);
    }
    async getAllWalletsOfUser(idPropieter) {
        return this.allWallets.filter((wallet) => wallet.idUser === idPropieter);
    }
    async getHistoryOfAllTransactions() {
        return this.historyTransactions;
    }
    async getHistoryOfUserTransactions(idPropieter) {
        const userWallets = this.allWallets.filter((wallet) => {
            return wallet.idUser === idPropieter;
        });
        const allTransactions = this.historyTransactions;
        const transactionsOfUser = userWallets?.flatMap((wallet) => {
            const transactionsSent = allTransactions.filter((transaction) => transaction.walletSender === wallet.idWallet);
            const transactionsReceived = allTransactions.filter((transaction) => transaction.walletReciving === wallet.idWallet);
            return [...transactionsSent, ...transactionsReceived];
        });
        return transactionsOfUser;
    }
    async createWallet(newWallet) {
        this.allWallets.push(newWallet);
    }
    async getAllWallets() {
        return this.allWallets;
    }
    transactionMaker(newTransaction) {
        this.historyTransactions.push(newTransaction);
    }
    async updatingWallets(transaction) {
        const updatedWallets = this.allWallets.map((wallet) => {
            if (wallet.idWallet == transaction.walletSender) {
                return { ...wallet, amount: wallet.amount - transaction.amountToTransaction };
            }
            if (wallet.idWallet == transaction.walletReciving) {
                return { ...wallet, amount: wallet.amount + transaction.amountToTransaction };
            }
            return wallet;
        });
        this.allWallets = updatedWallets;
    }
}
exports.InMemoryRespositoryWallet = InMemoryRespositoryWallet;
