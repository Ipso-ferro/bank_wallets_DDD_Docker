import { TransactionsCreator } from "../models/TransactionCreator";
import { Wallet } from "../models/Wallet";
import { RepositoryWallet } from "./RepositoryWallet";

export class InMemoryRespositoryWallet implements RepositoryWallet {
  private allWallets: Wallet[] = [];
  private historyTransactions: TransactionsCreator[] = [];

  async getWallet(id: string):Promise <Wallet | undefined> {
    return this.allWallets.find((item) => item.idWallet == id);
  }
  async getAllWalletsOfUser(idPropieter: string):Promise <Wallet[] | undefined> {
    return this.allWallets.filter(
      (wallet) => wallet.idUser === idPropieter
    );
  }
  async getHistoryOfAllTransactions():Promise <TransactionsCreator[]> {
    return this.historyTransactions;
  }
  async getHistoryOfUserTransactions(
    idPropieter: string
  ):Promise <TransactionsCreator[] | undefined> {
    const userWallets = this.allWallets.filter((wallet) => {
      return wallet.idUser === idPropieter;
    });

    const allTransactions = this.historyTransactions;

    const transactionsOfUser = userWallets?.flatMap((wallet) => {
      const transactionsSent = allTransactions.filter(
        (transaction) => transaction.walletSender === wallet.idWallet
      );

      const transactionsReceived = allTransactions.filter(
        (transaction) => transaction.walletReciving === wallet.idWallet
      );

      return [...transactionsSent, ...transactionsReceived];
    });

    return transactionsOfUser;
  }

  async createWallet(newWallet: Wallet):Promise <void> {
    this.allWallets.push(newWallet);
  }
  async getAllWallets():Promise <Wallet[]> {
    return this.allWallets;
  }
  transactionMaker(newTransaction: TransactionsCreator): void {
    this.historyTransactions.push(newTransaction);
  }

  async updatingWallets(transaction: TransactionsCreator):Promise <void> {
    const updatedWallets = this.allWallets.map((wallet) => {
      if (wallet.idWallet == transaction.walletSender) {

        return { ...wallet, amount: wallet.amount - transaction.amountToTransaction };
      }
      if (wallet.idWallet == transaction.walletReciving) {
        return { ...wallet, amount: wallet.amount + transaction.amountToTransaction };
      }
      return wallet;
    });

    this.allWallets = updatedWallets;

  }

}