import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from '../../services/loan.service';
import { Loan } from '../../models/loan';
import { GenericService } from '../../services/generic.service';
import { BaseComponent } from '../base/base.component';
import { resources } from '../../constants/resources';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.css'],
})
export class ApplyLoanComponent extends BaseComponent implements OnInit {

  parentForm: FormGroup;
  loan: Loan;
  user: User;
  userList: User[];

  constructor(
    private _userService: UserService,
    private _utilityService: UtilityService,
    private fb: FormBuilder,
    protected _loanService: LoanService,
    protected _genericService: GenericService) {
    super(_genericService, _loanService);
  }

  ngOnInit(): void {
    this.validateForm();
    this.getLoans();
  }

  filterLoanByUserId(id: any){
    this.loanList.forEach(element => {
      if (element.id == id){
        this.loan = element;
      }
    });
  }

  saveData() {
    this.msgs = [];
    let loan: Loan = {
      id: this.parentForm.get('identification')?.value,
      amountLoan: this.parentForm.get('amountLoan')?.value,
      payDate: this.parentForm.get('payDate')?.value,
      payCredit: this.parentForm.get('payCredit')?.value,
      state: ""
    }

    this.filterLoanByUserId(this.parentForm.get('identification')?.value);

    if (this.loan) {
      this.executeUserExistingLoans(loan);
    } else {
      this.executeNewUserLoans(loan);
    }
  }
  
  executeNewUserLoans(loan: Loan){
    let randonApply: boolean = this._utilityService.processRandon();
    loan.state = randonApply ? resources.APPROVED : resources.REJECTED;
    let user: User = {
      identification: this.parentForm.get('identification')?.value,
      name: this.parentForm.get('name')?.value,
      mail: this.parentForm.get('mail')?.value,
    }
    this._userService.insertUser(user);
    this._loanService.insertApplyLoan(loan);
    this.doCreditDebit(loan);
    this.msgs = randonApply ? this.msgApproved() : this.msgRejected();
  }

  executeUserExistingLoans(loan: Loan) {
    if (this.loan.state == resources.APPROVED) {
      loan.state = resources.APPROVED;
      this._loanService.insertApplyLoan(loan);
      this.doCreditDebit(loan);
      this.msgs = this.msgApproved();
    } else {
        loan.state = resources.REJECTED;
        this._loanService.insertApplyLoan(loan);
        this.msgs = this.msgRejected();
    }

    this.loan = null;
  }

  validateForm() {
    this.loanList = [];
    this.userList = [];
    this.parentForm = this.fb.group({
      identification: ['', [Validators.required]],
      name: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      amountLoan: ['', [Validators.required]],
      payDate: [''],
      payCredit: ['', [Validators.required]]
    });
  }

  doCreditDebit(loan: Loan){
    this.setCreditDebit(loan.amountLoan, loan.payCredit);
  }

  msgApproved() {
    return [{ severity: 'success', summary: 'Success', detail: this.resourceBundle.success_loan_approved }];
  }

  msgRejected() {
    return [{ severity: 'error', summary: 'Error', detail: this.resourceBundle.error_loan_reject }];
  }

}
