import mysql from "mysql2/promise";
import { RepositoryUser } from "./RepositoryUser";
import { User } from "../models/User";
import { TotalUserMoneyCalculatorService } from "../handlers/services/TotalUserMoneyCalculatorService";
export declare class MySqlRepoUser implements RepositoryUser {
    readonly pool: mysql.Pool;
    readonly serviceToDoTotalBalance: TotalUserMoneyCalculatorService;
    constructor(pool: mysql.Pool, serviceToDoTotalBalance: TotalUserMoneyCalculatorService);
    addNewUser(user: User): Promise<void>;
    getUserById(idUser: string | undefined): Promise<User | undefined>;
    getAllUsers(): Promise<User[]>;
    updatingUserTotalBalance(): Promise<void>;
    private importingTotalWallets;
    private mapRowToWallet;
    private mapRowToUser;
}
