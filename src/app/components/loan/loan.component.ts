import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericService } from 'src/app/services/generic.service';
import { LoanService } from 'src/app/services/loan.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent extends BaseComponent implements OnInit {

  @Input() parentForm: FormGroup;

  constructor(
    protected _genericService: GenericService,
    protected _loanService: LoanService) { 
    super(_genericService, _loanService);
  }

  ngOnInit(): void {
    
  }

}
