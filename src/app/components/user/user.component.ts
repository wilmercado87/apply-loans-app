import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericService } from 'src/app/services/generic.service';
import { LoanService } from 'src/app/services/loan.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent extends BaseComponent implements OnInit {

  @Input() parentForm: FormGroup;

  constructor(
    protected _genericService: GenericService,
    protected _loanService: LoanService
    ) { 
    super(_genericService, _loanService);
  }

  ngOnInit(): void {
    
  }

}
