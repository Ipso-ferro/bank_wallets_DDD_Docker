import {Request} from "express"
import { AddNewUserCommand } from "../../domain/users/command/AddNewUserCommand";


export class AddNewUserRequest {
  readonly idUser:string
  readonly totalBalance:number;
  errorMessage:string = ""

  constructor (readonly req:Request){
    this.idUser = req.body.idUser
    this.totalBalance = req.body.totalBalance
  }

  validate():boolean{

    //empty validation 

    if (this.isNotEmpty(this.idUser)){
       this.errorMessage = "empty id"
       return true
    }

   if (this.isNotEmpty(this.totalBalance)){
    return true
 }
    return false


  


  }

  toCommand():AddNewUserCommand{
    return {
      idUser:this.idUser,
      totalBalance:this.totalBalance
    }
  }
  private isNotEmpty(validation:string|number):boolean{
    if (validation== null||validation== ""||validation == undefined){
      return false
  }
  return true
  }
}

