import { Wallet } from "../models/Wallet";

export interface TransactionMakerQuery{
    walletSender: Wallet, 
    walletReciving: Wallet,
    amountToTransaction:number
}