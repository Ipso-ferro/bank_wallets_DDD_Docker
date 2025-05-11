import {Request} from "express"
import { CreateWalletCommand } from "../../domain/wallets/command/CreateWalleteCommand"


export class WalletRequest{
    readonly idUser:string
    readonly amount:number
    errorMessage:string = ""


    constructor(readonly req:Request){
        this.idUser = req.body.idUser
        this.amount = req.body.amount
    }
    validate(): boolean {
        //Empty Validations
        if (this.isEmptyOrNullString(this.idUser)) {
            this.errorMessage = `Input idUser is empty`;
            return false;
        }

        if (this.isEmptyOrNullString(this.amount)) {
            this.errorMessage = `Input totalAmount is empty`;
            return false;
        }

        //Number Validations create validation imput way
        
        // if (this.isNotNumber(this.idwallet)){
        //     this.errorMessage = `Input wallet is not a number`;
        //     return false;
        // }

        if (this.isNotNumber(this.amount)){
            this.errorMessage = `Input amount is not a number`;
            return false;
        }

        //Negative Number Validations


        if (this.isNotNegativeNumber(this.amount)){
            this.errorMessage = `Input amount is a negative number`;
            return false;
        }
        return true;
    }

    toCommand():CreateWalletCommand{
        return {
            idUser:this.idUser,
            amount:Number(this.amount)
        }
    }

    private isEmptyOrNullString(validation:string|number):boolean{
        if (validation === null || validation === undefined || validation  === ""){
            return true
        } 
        return false
    }

    private isNotNumber(validation:string|number):boolean{
        if(Number.isNaN(Number(validation) % 1  )){
            return true
        } 
        return false
    }

    private isNotNegativeNumber(validation:string|number):boolean{
        if(Number(validation) < 0){
            return true
        }
        return false
    }
    
}