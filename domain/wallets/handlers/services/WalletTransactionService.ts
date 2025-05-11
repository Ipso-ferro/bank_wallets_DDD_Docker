import { TransactionsCreator } from "../../models/TransactionCreator";
import { Wallet } from "../../models/Wallet";


export class WalletTransactionService {
  constructor(readonly MemoryRepositoryWallet: any) { }

  async transactionCreatorService(transaction: TransactionsCreator):Promise <void> {
    (await this.MemoryRepositoryWallet.getAllWallets()).map((wallet:Wallet) => {
      if (wallet.idWallet == transaction.walletSender) {
        if (wallet.amount >= transaction.amountToTransaction) {
          this.MemoryRepositoryWallet.transactionMaker(transaction);
          this.MemoryRepositoryWallet.updatingWallets(transaction);
        }
      }
    });
  }
}
