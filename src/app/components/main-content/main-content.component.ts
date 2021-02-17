import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { GenericService } from 'src/app/services/generic.service';
import { LoanService } from 'src/app/services/loan.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent extends BaseComponent implements OnInit {
  
  items: MenuItem[];

  constructor(
    protected _genericService: GenericService,
    protected _loanService: LoanService) {
    super(_genericService, _loanService);
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.items = [
      {
        label: 'Loan',
        icon:'pi pi-fw pi-file',
        items: [{
          label: 'New',
          icon:'pi pi-fw pi-plus',
          routerLink: ['/main_content', {outlets: {'router_contenido': 'apply_loan'}}]
        }]
      },
      {
        label: 'Users',
        icon:'pi pi-fw pi-user',
        items: [{
          label: 'List',
          icon:'pi pi-fw pi-bars',
          routerLink: ['/main_content', {outlets: {'router_contenido': 'users_loans_registered'}}]
        }]
      }
    ]
  }

}
