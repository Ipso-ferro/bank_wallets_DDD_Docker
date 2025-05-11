import { RepositoryWallet } from "./RepositoryWallet";
import { Wallet } from "../models/Wallet";
import { TransactionsCreator } from "../models/TransactionCreator";
import mysql from "mysql2/promise";


//WALLETS
const SELECT_WALLET_BY_ID = (idWallet: string) => {
  return `SELECT * FROM wallets WHERE idWallet='${idWallet}'`;
};

const SELECT_ALL_WALLETS = "SELECT * FROM wallets";

const INSERT_WALLET = (newWallet: Wallet): string => {
  return `
      INSERT INTO wallets (idUser, amount,idWallet)
      VALUES ('${newWallet.idUser}', '${newWallet.amount}','${newWallet.idWallet}');
    `;
};

const SELECT_WALLETS_OF_USERID = (idWallet: string) => {
  return `SELECT * FROM wallets WHERE idWallet='${idWallet}'`;
};

//TRANSACTIONS

const GET_HISTORY_OF_ALL_TRANSACTIONS = () => {
  return "SELECT * FROM transactions";
};

const SELECT_TRANSACTIONS_OF_USERID = (idWallet: string) => {
  return `SELECT * FROM transactions WHERE idWallet='${idWallet}'`;
};

const INSERT_TRANSACTION = (transaction: TransactionsCreator) => {
  return `
    INSERT INTO transactions (walletSender, walletReciving, amountToTransaction)
    VALUES ('${transaction.walletSender}', '${transaction.walletReciving}', '${transaction.amountToTransaction}');
  `;
};

//updating TOTAL BALANCE USERS

// const UPDATE_TOTALBALANCER_USER = (totalBalance:number, id:string) => {
//   return `UPDATE users SET ${totalBalance}  WHERE ${id}`
// }


export class MySqlRepoWallet implements RepositoryWallet {
  constructor(readonly pool: mysql.Pool) {}

  //WALLETS

  async getWallet(idWallet: string): Promise<Wallet | undefined> {
    try {
      const [rows] = (await this.pool.query(SELECT_WALLET_BY_ID(idWallet))) as [
        Wallet[],
        any
      ];
      return rows[rows.length-1];
    } catch (e: any) {
      if (e.message) throw new Error(e.message);
      throw new Error(e.sqlMessage, e.sql);
    }
  }

  async getAllWalletsOfUser(idUser:string):Promise <Wallet[]|undefined>{
    try {
        const [rows] = (await this.pool.query( SELECT_WALLETS_OF_USERID(idUser))) as [any[], any];
        
        const walletMap = new Map();
        const listOfWallets:Wallet[] = []
        
        rows.forEach((item) => {
            walletMap.set(item.idWallet, item)
        });
        
        walletMap.forEach((value) => {
            listOfWallets.push(value)
        });
        
    
    return listOfWallets 
    } 

  
    
    catch (e: any) {
      if (e.message) throw new Error(e.message);
      throw new Error(e.sqlMessage, e.sql);
    }
  }

  async createWallet(newWallet: Wallet): Promise<void> {
    try {
      await this.pool.execute(INSERT_WALLET(newWallet));
    } catch (e: any) {
      if (e.message) throw new Error(e.message);
      throw new Error(e.sqlMessage, e.sql);
    }
  }

  async getAllWallets(): Promise<Wallet[]> {
    try {
      const queryResult = await this.pool.execute(SELECT_ALL_WALLETS);
      const allWalletsList = this.mapRowToWallet(queryResult[0]);

      const walletMap = new Map();
      const listOfWallets:Wallet[] = []
      
      allWalletsList.forEach((item) => {
          walletMap.set(item.idWallet, item)
      });
      
      walletMap.forEach((value) => {
          listOfWallets.push(value)
      });
      
    
    return listOfWallets 

    } catch (e: any) {
      if (e.message) throw new Error(e.message);
      throw new Error(e.sqlMessage, e.sql);
    }
  }

  //TRANSACTIONS
  async getHistoryOfAllTransactions(): Promise<
    TransactionsCreator[] | undefined
  > {
    try {
      const queryResult = await this.pool.execute(
        GET_HISTORY_OF_ALL_TRANSACTIONS()
      );
      return this.mapRowToTransaction(queryResult[0]);
    } catch (e: any) {
      if (e.message) throw new Error(e.message);
      throw new Error(e.sqlMessage, e.sql);
    }
  }

  async getHistoryOfUserTransactions(
    idPropieter: string
  ): Promise<TransactionsCreator[] | undefined> {
    try {
      const [rows] = (await this.pool.query(
        SELECT_TRANSACTIONS_OF_USERID(idPropieter)
      )) as [any[], any];
      return rows[0];
    } catch (e: any) {
      if (e.message) throw new Error(e.message);
      throw new Error(e.sqlMessage, e.sql);
    }
  }

  async transactionMaker(newTransaction: TransactionsCreator): Promise<void> {
    try {
      await this.pool.execute(INSERT_TRANSACTION(newTransaction));

    } catch (e: any) {
      if (e.message) throw new Error(e.message);
      throw new Error(e.sqlMessage, e.sql);
    }
  }

  async updatingWallets(transaction: TransactionsCreator): Promise<void> {
    const queryResult = await this.pool.query(SELECT_ALL_WALLETS);
    const listOfWallets = this.mapRowToWallet(queryResult[0]);
    if (
      !listOfWallets.find(
        (wallet) => wallet.idWallet == transaction.walletSender
      ) ||
      !listOfWallets.find(
        (wallet) => wallet.idWallet == transaction.walletReciving
      )
    ) {
      throw new Error(
        "Invalid transaction: sender or receiver wallet not found"
      );
    }
 
    //updating  wallets involved in the transaction
    listOfWallets.map((wallet) => {
      if (wallet.idWallet == transaction.walletSender) {
        const walletUpDate = {
          ...wallet,
          amount: wallet.amount - transaction.amountToTransaction,
        };
        
        this.pool.execute(INSERT_WALLET(walletUpDate));
      }
      if (wallet.idWallet == transaction.walletReciving) {
        const walletUpDate = {
          ...wallet,
          amount: wallet.amount + transaction.amountToTransaction,
        };
       
        this.pool.execute(INSERT_WALLET(walletUpDate));
      }
      return wallet;

    });
  }

  //creating list to return all wallets
  private mapRowToWallet(queryResult: any) {
    const rows: Wallet[] = queryResult;
    if (rows == undefined)
      throw new Error("Snapshot ticker does not exists: read");
    let list: Wallet[] = [];
    rows.forEach((row) => {
      console.log(row)
      list.push({
        idUser: row.idUser,
        amount: row.amount,
        idWallet: row.idWallet,
      });
    });
    console.log(list)
    return list;
  }
  //creating list of transactions
  
  private mapRowToTransaction(queryResult: any) {
    const rows: TransactionsCreator[] = queryResult;
    if (rows == undefined)
      throw new Error("snapshot ticker does not exists: read");
    let list: TransactionsCreator[] = [];
    rows.forEach((row) => {
      list.push({
        walletSender: row.walletSender,
        walletReciving: row.walletReciving,
        amountToTransaction: row.amountToTransaction,
      });
    });
    return list;
  }
}
