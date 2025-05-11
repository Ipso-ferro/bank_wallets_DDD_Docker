
import { User } from "../models/User";

export interface RepositoryUser{
    addNewUser(user:User):Promise<void>
    getUserById(id:string|undefined):Promise<User|undefined>
    getAllUsers():Promise<User[]>
}