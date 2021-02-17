import { Component, OnInit } from '@angular/core';
import { Loan } from 'src/app/models/loan';
import { User } from 'src/app/models/user';
import { GenericService } from 'src/app/services/generic.service';
import { LoanService } from 'src/app/services/loan.service';
import { UserService } from 'src/app/services/user.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-users-lons-registered',
  templateUrl: './users-lons-registered.component.html',
  styleUrls: ['./users-lons-registered.component.css']
})
export class UsersLonsRegisteredComponent extends BaseComponent implements OnInit {

  userList: User[];
  loading: boolean;
  showLoanApplications: boolean;
  loanApplications: Loan[];

  constructor(
    private _userService: UserService,
    protected _genericService: GenericService,
    protected _loanService: LoanService
  ) {
    super(_genericService, _loanService);
  }

  ngOnInit(): void {
    this.onLoadUsers();
  }

  onPayAmount() {
    this.showLoanApplications = false;
    this.msgs = [{ severity: 'info', summary: 'Info', detail: this.resourceBundle.info_message_redirect_bank }];
  }

  onLoadUsers() {
    this.loading = true;
    setTimeout(() => {
      this.getUsers();
      this.loading = false;
    }, 1000);
  }

  getUsers() {
    this._userService.getUsers()
      .snapshotChanges()
      .subscribe(item => {
        this.userList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.userList.push(x as User);
        });
      });
  }

  onShowLoanApplications(user: User) {
    this.msgs = [];
    this.showLoanApplications = true;
    this.loanApplications = [];
    this.loading = true;
    setTimeout(() => {
      this.setTitleByUser(user);
      this.getLoansByUser(user.identification);
      this.loading = false;
    }, 1000);
  }

  getLoansByUser(identification: number) {
    this._loanService.getLoans()
      .snapshotChanges()
      .subscribe(item => {
        this.loanList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          let loan: Loan = x as Loan;
          if (loan && loan.id == identification) {
            this.loanApplications.push(loan);
          }
        });
      });
  }

  setTitleByUser(user: User) {
    this.headerTitle = this.resourceBundle.label_name + ": " + user.name +
      " - " + this.resourceBundle.label_identification + ": " + user.identification;
  }

}
