export interface CreateWalletCommand{
    readonly idUser:string
    readonly amount:number
    readonly idWallet?:string|undefined
}