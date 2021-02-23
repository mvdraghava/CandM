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
  selector: 'app-indenter-details',
  templateUrl: './indenter-details.component.html',
  styleUrls: ['./indenter-details.component.css']
})
export class IndenterDetailsComponent implements OnInit, AfterViewInit {

  @Input() proposaldetails ?: any;
  @ViewChild(EmployeeFieldComponent) indentedByEmployee: EmployeeFieldComponent;
  @Output() addedemployee = new EventEmitter();
  departments = departments;
  indenterDetails;
  ngOnInit(): void {
    this.indenterDetails =  this.fb.group({
      indentDept: [this.proposaldetails ? this.proposaldetails.indentDept : '', Validators.required],
    });
  }
  constructor(private fb: FormBuilder) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.indenterDetails.addControl('indentedBy', this.indentedByEmployee.inputEmployee);
    });

  }

}
