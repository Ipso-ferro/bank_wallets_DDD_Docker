import { Wallet } from "../../../wallets/models/Wallet";
import { User } from "../../models/User";
export declare class TotalUserMoneyCalculatorService {
    totalCalculationOfUsersWallet(users: User[], walletsOfUsers: Wallet[] | undefined): User[];
}
