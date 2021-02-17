import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Loan } from '../models/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  loanList: AngularFireList<any>;

  constructor(private fireBase: AngularFireDatabase) { }

  getLoans() {
    return this.loanList = this.fireBase.list('loans');
  }

  insertApplyLoan(loan: Loan) {
    this.getLoans();
    this.loanList.push({
      id: loan.id,
      amountLoan: loan.amountLoan,
      payDate: loan.payDate ? loan.payDate.getTime() : null,
      payCredit: loan.payCredit,
      state: loan.state
    });
  }
}
