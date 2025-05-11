"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TotalUserMoneyCalculatorService = void 0;
class TotalUserMoneyCalculatorService {
    totalCalculationOfUsersWallet(users, walletsOfUsers) {
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
    }
}
exports.TotalUserMoneyCalculatorService = TotalUserMoneyCalculatorService;
