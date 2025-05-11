export interface TransactionsCreator {
    readonly walletSender: string;
    readonly walletReciving: string;
    readonly amountToTransaction: number;
}
