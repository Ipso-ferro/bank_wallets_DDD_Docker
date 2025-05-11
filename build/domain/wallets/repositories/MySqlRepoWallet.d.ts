import { RepositoryWallet } from "./RepositoryWallet";
import { Wallet } from "../models/Wallet";
import { TransactionsCreator } from "../models/TransactionCreator";
import mysql from "mysql2/promise";
export declare class MySqlRepoWallet implements RepositoryWallet {
    readonly pool: mysql.Pool;
    constructor(pool: mysql.Pool);
    getWallet(idWallet: string): Promise<Wallet | undefined>;
    getAllWalletsOfUser(idUser: string): Promise<Wallet[] | undefined>;
    createWallet(newWallet: Wallet): Promise<void>;
    getAllWallets(): Promise<Wallet[]>;
    getHistoryOfAllTransactions(): Promise<TransactionsCreator[] | undefined>;
    getHistoryOfUserTransactions(idPropieter: string): Promise<TransactionsCreator[] | undefined>;
    transactionMaker(newTransaction: TransactionsCreator): Promise<void>;
    updatingWallets(transaction: TransactionsCreator): Promise<void>;
    private mapRowToWallet;
    private mapRowToTransaction;
}
