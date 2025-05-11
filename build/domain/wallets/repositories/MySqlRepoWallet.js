"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlRepoWallet = void 0;
//WALLETS
const SELECT_WALLET_BY_ID = (idWallet) => {
    return `SELECT * FROM wallets WHERE idWallet='${idWallet}'`;
};
const SELECT_ALL_WALLETS = "SELECT * FROM wallets";
const INSERT_WALLET = (newWallet) => {
    return `
      INSERT INTO wallets (idUser, amount,idWallet)
      VALUES ('${newWallet.idUser}', '${newWallet.amount}','${newWallet.idWallet}');
    `;
};
const SELECT_WALLETS_OF_USERID = (idWallet) => {
    return `SELECT * FROM wallets WHERE idWallet='${idWallet}'`;
};
//TRANSACTIONS
const GET_HISTORY_OF_ALL_TRANSACTIONS = () => {
    return "SELECT * FROM transactions";
};
const SELECT_TRANSACTIONS_OF_USERID = (idWallet) => {
    return `SELECT * FROM transactions WHERE idWallet='${idWallet}'`;
};
const INSERT_TRANSACTION = (transaction) => {
    return `
    INSERT INTO transactions (walletSender, walletReciving, amountToTransaction)
    VALUES ('${transaction.walletSender}', '${transaction.walletReciving}', '${transaction.amountToTransaction}');
  `;
};
//updating TOTAL BALANCE USERS
// const UPDATE_TOTALBALANCER_USER = (totalBalance:number, id:string) => {
//   return `UPDATE users SET ${totalBalance}  WHERE ${id}`
// }
class MySqlRepoWallet {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    //WALLETS
    async getWallet(idWallet) {
        try {
            const [rows] = (await this.pool.query(SELECT_WALLET_BY_ID(idWallet)));
            return rows[rows.length - 1];
        }
        catch (e) {
            if (e.message)
                throw new Error(e.message);
            throw new Error(e.sqlMessage, e.sql);
        }
    }
    async getAllWalletsOfUser(idUser) {
        try {
            const [rows] = (await this.pool.query(SELECT_WALLETS_OF_USERID(idUser)));
            const walletMap = new Map();
            const listOfWallets = [];
            rows.forEach((item) => {
                walletMap.set(item.idWallet, item);
            });
            walletMap.forEach((value) => {
                listOfWallets.push(value);
            });
            return listOfWallets;
        }
        catch (e) {
            if (e.message)
                throw new Error(e.message);
            throw new Error(e.sqlMessage, e.sql);
        }
    }
    async createWallet(newWallet) {
        try {
            await this.pool.execute(INSERT_WALLET(newWallet));
        }
        catch (e) {
            if (e.message)
                throw new Error(e.message);
            throw new Error(e.sqlMessage, e.sql);
        }
    }
    async getAllWallets() {
        try {
            const queryResult = await this.pool.execute(SELECT_ALL_WALLETS);
            const allWalletsList = this.mapRowToWallet(queryResult[0]);
            const walletMap = new Map();
            const listOfWallets = [];
            allWalletsList.forEach((item) => {
                walletMap.set(item.idWallet, item);
            });
            walletMap.forEach((value) => {
                listOfWallets.push(value);
            });
            return listOfWallets;
        }
        catch (e) {
            if (e.message)
                throw new Error(e.message);
            throw new Error(e.sqlMessage, e.sql);
        }
    }
    //TRANSACTIONS
    async getHistoryOfAllTransactions() {
        try {
            const queryResult = await this.pool.execute(GET_HISTORY_OF_ALL_TRANSACTIONS());
            return this.mapRowToTransaction(queryResult[0]);
        }
        catch (e) {
            if (e.message)
                throw new Error(e.message);
            throw new Error(e.sqlMessage, e.sql);
        }
    }
    async getHistoryOfUserTransactions(idPropieter) {
        try {
            const [rows] = (await this.pool.query(SELECT_TRANSACTIONS_OF_USERID(idPropieter)));
            return rows[0];
        }
        catch (e) {
            if (e.message)
                throw new Error(e.message);
            throw new Error(e.sqlMessage, e.sql);
        }
    }
    async transactionMaker(newTransaction) {
        try {
            await this.pool.execute(INSERT_TRANSACTION(newTransaction));
        }
        catch (e) {
            if (e.message)
                throw new Error(e.message);
            throw new Error(e.sqlMessage, e.sql);
        }
    }
    async updatingWallets(transaction) {
        const queryResult = await this.pool.query(SELECT_ALL_WALLETS);
        const listOfWallets = this.mapRowToWallet(queryResult[0]);
        if (!listOfWallets.find((wallet) => wallet.idWallet == transaction.walletSender) ||
            !listOfWallets.find((wallet) => wallet.idWallet == transaction.walletReciving)) {
            throw new Error("Invalid transaction: sender or receiver wallet not found");
        }
        //updating  wallets involved in the transaction
        listOfWallets.map((wallet) => {
            if (wallet.idWallet == transaction.walletSender) {
                const walletUpDate = {
                    ...wallet,
                    amount: wallet.amount - transaction.amountToTransaction,
                };
                this.pool.execute(INSERT_WALLET(walletUpDate));
            }
            if (wallet.idWallet == transaction.walletReciving) {
                const walletUpDate = {
                    ...wallet,
                    amount: wallet.amount + transaction.amountToTransaction,
                };
                this.pool.execute(INSERT_WALLET(walletUpDate));
            }
            return wallet;
        });
    }
    //creating list to return all wallets
    mapRowToWallet(queryResult) {
        const rows = queryResult;
        if (rows == undefined)
            throw new Error("Snapshot ticker does not exists: read");
        let list = [];
        rows.forEach((row) => {
            console.log(row);
            list.push({
                idUser: row.idUser,
                amount: row.amount,
                idWallet: row.idWallet,
            });
        });
        console.log(list);
        return list;
    }
    //creating list of transactions
    mapRowToTransaction(queryResult) {
        const rows = queryResult;
        if (rows == undefined)
            throw new Error("snapshot ticker does not exists: read");
        let list = [];
        rows.forEach((row) => {
            list.push({
                walletSender: row.walletSender,
                walletReciving: row.walletReciving,
                amountToTransaction: row.amountToTransaction,
            });
        });
        return list;
    }
}
exports.MySqlRepoWallet = MySqlRepoWallet;
