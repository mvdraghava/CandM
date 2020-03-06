import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import { Vendor } from './../../vendor';
import { Employee } from './../../employee';
import {map, startWith} from 'rxjs/operators';
import { saveAs } from 'file-saver';
import {Router} from '@angular/router';
import {DetailsserviceService} from '../detailsservice.service';
import { CreateTenderService } from '../../create-tender.service';

@Component({
  selector: 'app-create-sq-tec',
  templateUrl: './create-sq-tec.component.html',
  styleUrls: ['./create-sq-tec.component.css']
})
export class CreateSqTecComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private router: Router,
              private ds: DetailsserviceService,
              private cts: CreateTenderService) {}

  ngOnInit() {
    this.cts.getemployees().subscribe(
      data => {
        this.employees = data;
        this.filter_for_employees();
      }
    );
  }

  filter_for_employees(){
    this.committeefilteredEmployees.push(this.committeemembers.controls[0].valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    ));
  }

  employees:Employee[] = [];
  committeefilteredEmployees: Observable<Employee[]>[] = [];
  indent_no = 0;

  sqtecForm = this.fb.group({
    indent_no : ['', Validators.required],
    sqenquirydate: [new Date(), Validators.required],
    sqboddate: [new Date(), Validators.required],
    committeemembers: this.fb.array([['',[Validators.required, this.validateEmployee]]])
  });

  get committeemembers() {
    return this.sqtecForm.get('committeemembers') as FormArray;
  }

  private _filterEmployees(value: string): Employee[] {
    const filterValue = value.toLowerCase();

    return this.employees.filter(emp => emp.name.toLowerCase().includes(filterValue));
  }

  validateEmployee(c: FormControl) {
    return c.value.id ? null : {
      validateEmployee: {
        valid: false
      }
    };
  }

  displayFnemp(emp?: Employee): String | undefined {
    return emp ? emp.name : undefined;
  }

  addCommitteeMember() {
    this.committeemembers.push(new FormControl(''));
    this.committeefilteredEmployees.push(this.committeemembers.controls[this.committeemembers.controls.length - 1].valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    ));
  }

  removeCommitteeMember(i) {
    this.committeemembers.removeAt(i);
    this.committeefilteredEmployees = [];
    for(let i=0;i<this.committeemembers.controls.length;i++){
      this.committeefilteredEmployees.push(this.committeemembers.controls[i].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterEmployees(name) : this.employees.slice())
      ));
    }
  }

  preparetec() {

  }

}
