"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletTransactionService = void 0;
class WalletTransactionService {
    MemoryRepositoryWallet;
    constructor(MemoryRepositoryWallet) {
        this.MemoryRepositoryWallet = MemoryRepositoryWallet;
    }
    async transactionCreatorService(transaction) {
        (await this.MemoryRepositoryWallet.getAllWallets()).map((wallet) => {
            if (wallet.idWallet == transaction.walletSender) {
                if (wallet.amount >= transaction.amountToTransaction) {
                    this.MemoryRepositoryWallet.transactionMaker(transaction);
                    this.MemoryRepositoryWallet.updatingWallets(transaction);
                }
            }
        });
    }
}
exports.WalletTransactionService = WalletTransactionService;
