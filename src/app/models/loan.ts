export interface Loan {
    id: number;
    amountLoan: number;
    payDate: Date;
    payCredit: boolean;
    state: string;
}