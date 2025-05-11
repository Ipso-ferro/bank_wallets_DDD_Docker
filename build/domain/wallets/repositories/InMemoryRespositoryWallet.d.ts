import { TransactionsCreator } from "../models/TransactionCreator";
import { Wallet } from "../models/Wallet";
import { RepositoryWallet } from "./RepositoryWallet";
export declare class InMemoryRespositoryWallet implements RepositoryWallet {
    private allWallets;
    private historyTransactions;
    getWallet(id: string): Promise<Wallet | undefined>;
    getAllWalletsOfUser(idPropieter: string): Promise<Wallet[] | undefined>;
    getHistoryOfAllTransactions(): Promise<TransactionsCreator[]>;
    getHistoryOfUserTransactions(idPropieter: string): Promise<TransactionsCreator[] | undefined>;
    createWallet(newWallet: Wallet): Promise<void>;
    getAllWallets(): Promise<Wallet[]>;
    transactionMaker(newTransaction: TransactionsCreator): void;
    updatingWallets(transaction: TransactionsCreator): Promise<void>;
}
