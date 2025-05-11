import mysql from "mysql2/promise";
import { RepositoryUser } from "./RepositoryUser";
import { User } from "../models/User";
import { TotalUserMoneyCalculatorService } from "../handlers/services/TotalUserMoneyCalculatorService";
import { Wallet } from "../../wallets/models/Wallet";

const SELECT_ALL_USERS = "SELECT * FROM `users`";
const INSERT_USER = (user: User) => {
    return `INSERT INTO users(idUser, totalBalance) VALUES ('${user.idUser}','${user.totalBalance}')`;
};

const SELECT_USER_BY_ID = (idUser: string | undefined) => {
    return `SELECT * FROM users WHERE idUser='${idUser}'`;
};

const UPDATE_TOTALBALANCER_USER = (totalBalance: number, idUser: string) => {
    return `UPDATE users SET totalBalance = ${totalBalance} WHERE idUser = '${idUser}'`;
  };
  
// wallets

const SELECT_ALL_WALLETS = "SELECT * FROM wallets";

export class MySqlRepoUser implements RepositoryUser {
    constructor(
        readonly pool: mysql.Pool,
        readonly serviceToDoTotalBalance: TotalUserMoneyCalculatorService
    ) { }

    async addNewUser(user: User): Promise<void> {
        try {
            await this.pool.execute(INSERT_USER(user));
        } catch (e: any) {
            if (e.message) throw new Error(e.message);
            throw new Error(e.sqlMessage, e.sql);
        }
    }
    async getUserById(idUser: string | undefined): Promise<User | undefined> {
        try {
            const [rows] = (await this.pool.query(SELECT_USER_BY_ID(idUser))) as [
                User[],
                any
            ];
            return rows[0];
        } catch (e: any) {
            if (e.message) throw new Error(e.message);
            throw new Error(e.sqlMessage, e.sql);
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            try {
                await this.updatingUserTotalBalance()
            } catch (e: any) {
                if (e.message) throw new Error(e.message);
                throw new Error(e.sqlMessage, e.sql);
            }
            const queryResult = await this.pool.query(SELECT_ALL_USERS);
            return this.mapRowToUser(queryResult[0]);
        } catch (e: any) {
            if (e.message) throw new Error(e.message);
            throw new Error(e.sqlMessage, e.sql);
        }
    }

    //importing wallets to calculate total balance

    async updatingUserTotalBalance() {
        const listOfWallets = await this.importingTotalWallets();
        const queryResult = await this.pool.query(SELECT_ALL_USERS);
        const listOfUsers = this.mapRowToUser(queryResult[0]);

        const listOfUsersWithTotalValue =
            this.serviceToDoTotalBalance.totalCalculationOfUsersWallet(
                listOfUsers,
                listOfWallets
            );

        //compare each list of objects

        const newTotalBalanceToDB = listOfUsersWithTotalValue.forEach(async (newUserBalance) => {
            const oldUserBalance = listOfUsers.find(
                (user) => user.idUser == newUserBalance.idUser
            );

            //if is something different upload the different one with  UPDATE_TOTALBALANCER_USER

            if (oldUserBalance?.totalBalance != newUserBalance.totalBalance) {
                return await this.pool.execute(
                    UPDATE_TOTALBALANCER_USER(
                        newUserBalance.totalBalance,
                        newUserBalance.idUser
                    )
                );
            }
        });
        return newTotalBalanceToDB
    }

    private async importingTotalWallets() {
        const queryResult = await this.pool.execute(SELECT_ALL_WALLETS);
        const allWalletsList = this.mapRowToWallet(queryResult[0]);

        const walletMap = new Map();
        const listOfWallets: Wallet[] = []

        allWalletsList.forEach((item) => {
            walletMap.set(item.idWallet, item)
        });

        walletMap.forEach((value) => {
            listOfWallets.push(value)
        });


        return listOfWallets
    }

    //creating list with wallets in DB
    private mapRowToWallet(queryResult: any) {
        const rows: Wallet[] = queryResult;
        if (rows == undefined)
            throw new Error("Snapshot ticker does not exists: read");
        let list: Wallet[] = [];
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
    private mapRowToUser(queryResult: any) {
        const rows: User[] = queryResult;
        if (rows == undefined)
            throw new Error("Snapshot ticker does not exists: read");
        let list: User[] = [];
        rows.forEach((row) => {
            list.push({
                idUser: row.idUser,
                totalBalance: row.totalBalance,
            });
        });
        return list;
    }
}
