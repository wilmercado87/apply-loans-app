import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { Message } from 'primeng//api';
import { resources } from '../../constants/resources';
import { Loan } from 'src/app/models/loan';
import { LoanService } from 'src/app/services/loan.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent implements OnInit {
  
  msgs: Message[] = [];
  resourceBundle: any = new Object();
  amountCapitalBank: number;
  minDateValue: Date = new Date();
  creditPayOptions = [{ label: 'SI', value: true }, { label: 'NO', value: false }];
  loanList: Loan[];
  showLoanApplications: boolean;
  headerTitle: string;
  first = 0;
  firstUsers = 0;
  rows = 10;

  constructor(
    protected _genericService: GenericService,
    protected _loanService: LoanService) {
    this.loadMessagesApp();
    this.setBankAmountCapital();
  }

  ngOnInit(): void {
  }

  getLoans() {
    this._loanService.getLoans()
      .snapshotChanges()
      .subscribe(item => {
        this.loanList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.loanList.push(x as Loan);
        });
      });
  }

  setBankAmountCapital() {
    if (typeof (Storage) !== undefined && localStorage.getItem(resources.BASE_CAPITAL_BANK) === null) {
      localStorage.setItem(resources.BASE_CAPITAL_BANK, resources.AMOUNT_BASE_CAPITAL_BANK);
      this.amountCapitalBank = Number.parseInt(resources.AMOUNT_BASE_CAPITAL_BANK);
    }

    let amountCapitalBank: any = localStorage.getItem(resources.BASE_CAPITAL_BANK);
    this.amountCapitalBank = Number.parseInt(amountCapitalBank);
  }

  setCreditDebit(amount: number, payCredit: boolean) {
    this.amountCapitalBank = payCredit ?
      (this.amountCapitalBank + amount) :
      (this.amountCapitalBank - amount);
    localStorage.setItem(resources.BASE_CAPITAL_BANK, this.amountCapitalBank.toString());
  }

  loadMessagesApp() {
    this.resourceBundle = JSON.parse(localStorage.getItem(resources.MESSAGES));
    if (this.resourceBundle == null){
      this._genericService.loadMessagesApp().
      subscribe(resourceBundle => {
        this.resourceBundle = resourceBundle;
        localStorage.setItem(resources.MESSAGES, JSON.stringify(this.resourceBundle));
      });
    }
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(loanApplications: Loan[]): boolean {
    return loanApplications ? this.first === (loanApplications.length - this.rows) : true;
  }

  isFirstPage(loanApplications: Loan[]): boolean {
    return loanApplications ? this.first === 0 : true;
  }

  nextUsers() {
    this.firstUsers = this.firstUsers + this.rows;
  }

  prevUsers() {
    this.firstUsers = this.firstUsers - this.rows;
  }

  resetUsers() {
    this.firstUsers = 0;
  }

  isLastPageUsers(userList: User[]): boolean {
    return userList ? this.firstUsers === (userList.length - this.rows) : true;
  }

  isFirstPageUsers(userList: User[]): boolean {
    return userList ? this.firstUsers === 0 : true;
  }

}
