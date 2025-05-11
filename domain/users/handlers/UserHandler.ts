import { AddNewUserCommand } from "../command/AddNewUserCommand";
import { HandlerResponse } from "../models/HandlerResponse";
import { User } from "../models/User";
import { GetUserIdQuery } from "../queries/GetUserIdQuery";
import { RepositoryUser } from "../repositories/RepositoryUser";



export class UserHandler {
    constructor (readonly repositoryUser:RepositoryUser){}
    async handlerAddNewUser(command:AddNewUserCommand):Promise<HandlerResponse>{
        try {
            const user:User = {
                idUser:command.idUser,
                totalBalance:command.totalBalance
            }
            if (await this.repositoryUser.getUserById(user.idUser)){
                throw new Error("user already exist")
            }

            this.repositoryUser.addNewUser(user)

            return {
                status:200,
                message:"user created"
            }

        } catch (error:any) {
            return {
                status:202,
                message:error.message
            }
        }
        
       
    }
    async getUserById(query:GetUserIdQuery):Promise <User|HandlerResponse>{
        try {
            const result = await this.repositoryUser.getUserById(query.id)
            if (!result){
                throw new Error("user does not exist")}
            return result
        } catch (error:any) {
            return {
                status:404,
                message:error.message
            }
        }
        
    }

    async getAllUsers():Promise<User[]>{
        return this.repositoryUser.getAllUsers()
    }

}