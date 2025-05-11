import { Router } from "express";
import { WalletHandler } from "../../domain/wallets/handlers/WalletHandler";
import { ApiController } from "./ApiController";
export declare class WalletController implements ApiController {
    readonly walletHandler: WalletHandler;
    readonly path = "/bank";
    constructor(walletHandler: WalletHandler);
    router(): Router;
}
