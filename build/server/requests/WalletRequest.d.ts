import { Request } from "express";
import { CreateWalletCommand } from "../../domain/wallets/command/CreateWalleteCommand";
export declare class WalletRequest {
    readonly req: Request;
    readonly idUser: string;
    readonly amount: number;
    errorMessage: string;
    constructor(req: Request);
    validate(): boolean;
    toCommand(): CreateWalletCommand;
    private isEmptyOrNullString;
    private isNotNumber;
    private isNotNegativeNumber;
}
