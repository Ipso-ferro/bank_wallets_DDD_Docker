
import { TotalUserMoneyCalculatorService } from "../handlers/services/TotalUserMoneyCalculatorService";
import { User } from "../models/User";
import { RepositoryUser } from "./RepositoryUser";

export class InMemoryRepositoryUser implements RepositoryUser {
    private listOfUsers:User[] = []
    
    // constructor (readonly totalUserMoneyCalculatorService:TotalUserMoneyCalculatorService, readonly listOfWallets:any[]){}

    async addNewUser(user:User):Promise<void>{
        this.listOfUsers.push(user)
    }
    async getUserById(id:string):Promise<User|undefined>{
        
        return this.listOfUsers.find((item) => item.idUser === id);
        
    }

    async getAllUsers():Promise<User[]>{
        // this.totalUserMoneyCalculatorService.totalCalculationOfUsersWallet(this.listOfUsers,this.listOfWallets)
        return this.listOfUsers
    }

    
}