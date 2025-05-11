import { TransactionsCreator } from "../models/TransactionCreator";
import { Wallet } from "../models/Wallet";

export interface RepositoryWallet{
    //wallets
    getWallet(idwallet:string|undefined):Promise <Wallet|undefined>
    getAllWalletsOfUser(idPropieter:string):Promise <Wallet[]|undefined>
    createWallet(newWallet:Wallet|undefined):Promise<void>
    getAllWallets():Promise <Wallet[]>
    //transactions
    getHistoryOfAllTransactions():Promise <TransactionsCreator[]|undefined>
    getHistoryOfUserTransactions(idPropieter:string):Promise <TransactionsCreator[]|undefined>
    transactionMaker(newTransaction:TransactionsCreator):void
    updatingWallets(transaction: TransactionsCreator):Promise <void>
}  