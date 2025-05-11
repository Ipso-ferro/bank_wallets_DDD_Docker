import { Router, Request, Response } from "express";
import { WalletHandler } from "../../domain/wallets/handlers/WalletHandler";
import { GetIdPropieterOfUserQuery } from "../../domain/wallets/queries/GetIdPropieterOfUserQuery";
import { GetUserWalletQuery } from "../../domain/wallets/queries/GetUserWalletQuery";
import { TransactionsCreator } from "../../domain/wallets/models/TransactionCreator";
import { ApiController } from "./ApiController";

import { WalletRequest } from "../requests/WalletRequest";


export class WalletController implements ApiController {
  readonly path = "/bank";

  constructor(
    readonly walletHandler: WalletHandler,
  ) {}

  router(): Router {
    const router: Router = Router();

    router.get("/all/wallets",async (req: Request, res: Response) => {
      res.json(await this.walletHandler.getAllWallets());
    });
    

    router.get("/:user/wallets",async (req: Request, res: Response) => {
      const user: GetIdPropieterOfUserQuery = {
        idPropieter: req.params.user,
      };

      res.json(await this.walletHandler.getAllWalletsOfUser(user));
    });

    router.get("/history/transactions",async (req: Request, res: Response) => {
      res.json(await this.walletHandler.getHistoryOfAllTransactions());
    });

    router.post("/:user/transaction",async (req: Request, res: Response) => {
      req.params.user;
      const { walletSender, walletReciving, amountToTransaction } = req.body;
      const newTransaction: TransactionsCreator = {
        walletSender,
        walletReciving,
        amountToTransaction,
      };
      res
        .status(200)
        .send(await this.walletHandler.transactionCreatorService(newTransaction));
    }),
      router.get("/history/:user",async (req: Request, res: Response) => {
        const user: GetIdPropieterOfUserQuery = {
          idPropieter: req.params.user,
        };
        res.json(await this.walletHandler.getHistoryOfUserTransactions(user));
      });

    router.get("/wallet/id/:id",async (req: Request, res: Response) => {
      const id: GetUserWalletQuery = {
        id: req.params.id
      };
      res.json(await this.walletHandler.getWallet(id));
    });

    router.post("/new/wallet", async (req: Request, res: Response) => {
      try {
        const requestNewWallet = new WalletRequest(req)
        if (!requestNewWallet.validate()){
          throw new Error(requestNewWallet.errorMessage)
        }
        const response = await this.walletHandler.createWallet(requestNewWallet.toCommand())
        res.status(((response)).status).json(response)
      } catch (error:any) {
        res.status(400).json(error.message)
      }
    });

    return router;
  }
}
