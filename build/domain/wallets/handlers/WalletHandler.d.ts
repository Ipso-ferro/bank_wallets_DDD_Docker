import { Wallet } from "../models/Wallet";
import { GetIdPropieterOfUserQuery } from "../queries/GetIdPropieterOfUserQuery";
import { GetUserWalletQuery } from "../queries/GetUserWalletQuery";
import { RepositoryWallet } from "../repositories/RepositoryWallet";
import { TransactionsCreator } from "../models/TransactionCreator";
import { WalletTransactionService } from "./services/WalletTransactionService";
import { CreateWalletCommand } from "../command/CreateWalleteCommand";
export declare class WalletHandler {
    readonly repositoryWallet: RepositoryWallet;
    readonly walletTransactionService: WalletTransactionService;
    constructor(repositoryWallet: RepositoryWallet, walletTransactionService: WalletTransactionService);
    getWallet(query: GetUserWalletQuery): Promise<Wallet | undefined>;
    getAllWalletsOfUser(query: GetIdPropieterOfUserQuery): Promise<Wallet[] | undefined>;
    getHistoryOfAllTransactions(): Promise<TransactionsCreator[] | undefined>;
    getHistoryOfUserTransactions(query: GetIdPropieterOfUserQuery): Promise<void>;
    createWallet(command: CreateWalletCommand): Promise<{
        status: number;
        message: any;
    }>;
    transactionCreatorService(query: TransactionsCreator): Promise<void>;
    getAllWallets(): Promise<Wallet[]>;
}
