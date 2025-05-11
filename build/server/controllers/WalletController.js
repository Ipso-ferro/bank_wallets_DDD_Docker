"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const express_1 = require("express");
const WalletRequest_1 = require("../requests/WalletRequest");
class WalletController {
    walletHandler;
    path = "/bank";
    constructor(walletHandler) {
        this.walletHandler = walletHandler;
    }
    router() {
        const router = (0, express_1.Router)();
        router.get("/all/wallets", async (req, res) => {
            res.json(await this.walletHandler.getAllWallets());
        });
        router.get("/:user/wallets", async (req, res) => {
            const user = {
                idPropieter: req.params.user,
            };
            res.json(await this.walletHandler.getAllWalletsOfUser(user));
        });
        router.get("/history/transactions", async (req, res) => {
            res.json(await this.walletHandler.getHistoryOfAllTransactions());
        });
        router.post("/:user/transaction", async (req, res) => {
            req.params.user;
            const { walletSender, walletReciving, amountToTransaction } = req.body;
            const newTransaction = {
                walletSender,
                walletReciving,
                amountToTransaction,
            };
            res
                .status(200)
                .send(await this.walletHandler.transactionCreatorService(newTransaction));
        }),
            router.get("/history/:user", async (req, res) => {
                const user = {
                    idPropieter: req.params.user,
                };
                res.json(await this.walletHandler.getHistoryOfUserTransactions(user));
            });
        router.get("/wallet/id/:id", async (req, res) => {
            const id = {
                id: req.params.id
            };
            res.json(await this.walletHandler.getWallet(id));
        });
        router.post("/new/wallet", async (req, res) => {
            try {
                const requestNewWallet = new WalletRequest_1.WalletRequest(req);
                if (!requestNewWallet.validate()) {
                    throw new Error(requestNewWallet.errorMessage);
                }
                const response = await this.walletHandler.createWallet(requestNewWallet.toCommand());
                res.status(((response)).status).json(response);
            }
            catch (error) {
                res.status(400).json(error.message);
            }
        });
        return router;
    }
}
exports.WalletController = WalletController;
