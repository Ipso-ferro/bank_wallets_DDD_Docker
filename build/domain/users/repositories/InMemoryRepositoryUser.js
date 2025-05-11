"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryRepositoryUser = void 0;
class InMemoryRepositoryUser {
    listOfUsers = [];
    // constructor (readonly totalUserMoneyCalculatorService:TotalUserMoneyCalculatorService, readonly listOfWallets:any[]){}
    async addNewUser(user) {
        this.listOfUsers.push(user);
    }
    async getUserById(id) {
        return this.listOfUsers.find((item) => item.idUser === id);
    }
    async getAllUsers() {
        // this.totalUserMoneyCalculatorService.totalCalculationOfUsersWallet(this.listOfUsers,this.listOfWallets)
        return this.listOfUsers;
    }
}
exports.InMemoryRepositoryUser = InMemoryRepositoryUser;
