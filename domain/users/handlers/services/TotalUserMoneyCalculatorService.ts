import { Wallet } from "../../../wallets/models/Wallet";
import { User } from "../../models/User";


export class TotalUserMoneyCalculatorService {

    
totalCalculationOfUsersWallet(
  users: User[],
  walletsOfUsers: Wallet[] | undefined
): User[] {
  if (!walletsOfUsers) {
    return users;
  }

  const updatedUsers = users.map((user) => {
    const walletOfUser = walletsOfUsers.filter((wallet) => {
      return wallet.idUser === user.idUser;
    });

    const totalAmount = walletOfUser.reduce((sum, wallet) => sum + wallet.amount, 0);
    return { ...user, totalBalance: totalAmount };
  });

  return updatedUsers;
}}