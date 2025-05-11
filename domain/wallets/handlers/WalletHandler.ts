
import { Wallet } from "../models/Wallet";
import { GetIdPropieterOfUserQuery } from "../queries/GetIdPropieterOfUserQuery";
import { GetUserWalletQuery } from "../queries/GetUserWalletQuery";
import { RepositoryWallet } from "../repositories/RepositoryWallet";
import { TransactionsCreator } from "../models/TransactionCreator";
import { WalletTransactionService } from "./services/WalletTransactionService";
import { CreateWalletCommand } from "../command/CreateWalleteCommand";
import {v4 as uuidv4} from 'uuid';




export class WalletHandler {
  constructor(readonly repositoryWallet: RepositoryWallet, readonly walletTransactionService: WalletTransactionService) { }

  async getWallet(query: GetUserWalletQuery):Promise <Wallet | undefined> {
    return this.repositoryWallet.getWallet(query.id)
  }
  async getAllWalletsOfUser(query: GetIdPropieterOfUserQuery):Promise <Wallet[] | undefined> {
    return this.repositoryWallet.getAllWalletsOfUser(query.idPropieter)
  }
  async getHistoryOfAllTransactions():Promise <TransactionsCreator[] | undefined> {
    return this.repositoryWallet.getHistoryOfAllTransactions()
  }
  async getHistoryOfUserTransactions(query: GetIdPropieterOfUserQuery) {
    this.repositoryWallet.getHistoryOfUserTransactions(query.idPropieter)
  }

  async createWallet(command: CreateWalletCommand) {

    try {
      if (await this.repositoryWallet.getWallet(command.idWallet)) throw Error("wallet ID already created")
      const myuuid = uuidv4();
      const newWallet: CreateWalletCommand = {
        idUser: command.idUser,
        amount: command.amount,
        idWallet: myuuid
      }
      
      this.repositoryWallet.createWallet(newWallet)
      return {
        status: 200,
        message: "wallet created"
      }

    } catch (error: any) {
      return {
        status: 202,
        message: error.message
      }
    }

  }

  async transactionCreatorService(query: TransactionsCreator) {

    const newTransaction: TransactionsCreator = {
      walletSender: query.walletSender,
      walletReciving: query.walletReciving,
      amountToTransaction: query.amountToTransaction,
    };
    this.walletTransactionService.transactionCreatorService(newTransaction)

  }

  async getAllWallets() {
    return this.repositoryWallet.getAllWallets()
  }

}