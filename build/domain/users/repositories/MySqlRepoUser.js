"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlRepoUser = void 0;
const SELECT_ALL_USERS = "SELECT * FROM `users`";
const INSERT_USER = (user) => {
    return `INSERT INTO users(idUser, totalBalance) VALUES ('${user.idUser}','${user.totalBalance}')`;
};
const SELECT_USER_BY_ID = (idUser) => {
    return `SELECT * FROM users WHERE idUser='${idUser}'`;
};
const UPDATE_TOTALBALANCER_USER = (totalBalance, idUser) => {
    return `UPDATE users SET totalBalance = ${totalBalance} WHERE idUser = '${idUser}'`;
};
// wallets
const SELECT_ALL_WALLETS = "SELECT * FROM wallets";
class MySqlRepoUser {
    pool;
    serviceToDoTotalBalance;
    constructor(pool, serviceToDoTotalBalance) {
        this.pool = pool;
        this.serviceToDoTotalBalance = serviceToDoTotalBalance;
    }
    async addNewUser(user) {
        try {
            await this.pool.execute(INSERT_USER(user));
        }
        catch (e) {
            if (e.message)
                throw new Error(e.message);
            throw new Error(e.sqlMessage, e.sql);
        }
    }
    async getUserById(idUser) {
        try {
            const [rows] = (await this.pool.query(SELECT_USER_BY_ID(idUser)));
            return rows[0];
        }
        catch (e) {
            if (e.message)
                throw new Error(e.message);
            throw new Error(e.sqlMessage, e.sql);
        }
    }
    async getAllUsers() {
        try {
            try {
                await this.updatingUserTotalBalance();
            }
            catch (e) {
                if (e.message)
                    throw new Error(e.message);
                throw new Error(e.sqlMessage, e.sql);
            }
            const queryResult = await this.pool.query(SELECT_ALL_USERS);
            return this.mapRowToUser(queryResult[0]);
        }
        catch (e) {
            if (e.message)
                throw new Error(e.message);
            throw new Error(e.sqlMessage, e.sql);
        }
    }
    //importing wallets to calculate total balance
    async updatingUserTotalBalance() {
        const listOfWallets = await this.importingTotalWallets();
        const queryResult = await this.pool.query(SELECT_ALL_USERS);
        const listOfUsers = this.mapRowToUser(queryResult[0]);
        const listOfUsersWithTotalValue = this.serviceToDoTotalBalance.totalCalculationOfUsersWallet(listOfUsers, listOfWallets);
        //compare each list of objects
        const newTotalBalanceToDB = listOfUsersWithTotalValue.forEach(async (newUserBalance) => {
            const oldUserBalance = listOfUsers.find((user) => user.idUser == newUserBalance.idUser);
            //if is something different upload the different one with  UPDATE_TOTALBALANCER_USER
            if (oldUserBalance?.totalBalance != newUserBalance.totalBalance) {
                return await this.pool.execute(UPDATE_TOTALBALANCER_USER(newUserBalance.totalBalance, newUserBalance.idUser));
            }
        });
        return newTotalBalanceToDB;
    }
    async importingTotalWallets() {
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
    //creating list with wallets in DB
    mapRowToWallet(queryResult) {
        const rows = queryResult;
        if (rows == undefined)
            throw new Error("Snapshot ticker does not exists: read");
        let list = [];
        rows.forEach((row) => {
            list.push({
                idUser: row.idUser,
                idWallet: row.idWallet,
                amount: row.amount,
            });
        });
        return list;
    }
    //creating list to return all users
    mapRowToUser(queryResult) {
        const rows = queryResult;
        if (rows == undefined)
            throw new Error("Snapshot ticker does not exists: read");
        let list = [];
        rows.forEach((row) => {
            list.push({
                idUser: row.idUser,
                totalBalance: row.totalBalance,
            });
        });
        return list;
    }
}
exports.MySqlRepoUser = MySqlRepoUser;
