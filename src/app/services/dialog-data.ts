export interface confirmDialogData {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
}


export interface transactionDialogData {
    title: string;
    issuer: string;
    amount: number;
    price: number;
    maxInput: number;
    userEBalance: number;
    userCBalance: number;
}