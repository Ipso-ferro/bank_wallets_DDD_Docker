import { TransactionsCreator } from "../../models/TransactionCreator";
export declare class WalletTransactionService {
    readonly MemoryRepositoryWallet: any;
    constructor(MemoryRepositoryWallet: any);
    transactionCreatorService(transaction: TransactionsCreator): Promise<void>;
}
