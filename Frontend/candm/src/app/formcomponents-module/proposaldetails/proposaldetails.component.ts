import { Component,
         OnInit,
         ViewChild,
         Input,
         AfterViewInit,
         Output,
         EventEmitter
} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { departments, tendercategories, contracttypes, productcategories } from './../../globalvariables';
import { EmployeeFieldComponent } from './../employee-field/employee-field.component';

@Component({
  selector: 'app-proposaldetails',
  templateUrl: './proposaldetails.component.html',
  styleUrls: ['./proposaldetails.component.css']
})
export class ProposaldetailsComponent implements OnInit, AfterViewInit {

  @Input() proposaldetails ?: any;
  @ViewChild(EmployeeFieldComponent) indentedByEmployee: EmployeeFieldComponent;
  @Output() addedemployee = new EventEmitter();
  constructor(private fb: FormBuilder) {

  }
  departments = departments;
  proposalDetails;

  ngOnInit(): void {
    this.proposalDetails =  this.fb.group({
      proposalRefNo: [this.proposaldetails ? this.proposaldetails.proposalRefNo : '', Validators.required],
      proposalDate: [this.proposaldetails ? this.proposaldetails.proposalDate : '', Validators.required],
      proposalRecievedDate: [this.proposaldetails ? this.proposaldetails.proposalRecievedDate : '', Validators.required],
      proposalApprovedDate: [this.proposaldetails ? this.proposaldetails.proposalApprovedDate : '', Validators.required],
      indentDept: [this.proposaldetails ? this.proposaldetails.indentDept : '', Validators.required],
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.proposalDetails.addControl('indentedBy', this.indentedByEmployee.inputEmployee);
    });

  }

}
