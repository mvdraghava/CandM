import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';

import { Vendor } from './vendor';
import { Employee } from '../employee';
import {map, startWith} from 'rxjs/operators';

import {CreatelteserviceService} from './createlteservice.service';

@Component({
  selector: 'app-create-lte',
  templateUrl: './create-lte.component.html',
  styleUrls: ['./create-lte.component.css']
})
export class CreateLteComponent implements OnInit {

  employees:Employee[] = [];
  vendors: Vendor[] = [];

  indentFilteredEmployees: Observable<Employee[]>;
  notebyFilteredEmployees: Observable<Employee[]>;
  lteFilteredVendors: Observable<Vendor[]>[] = [];

  createLte = this.fb.group({
    indent_no: ['',Validators.required],
    subject: ['',Validators.required],
    notesheetdate: [new Date(),Validators.required],
    noteby: ['',[Validators.required, this.validateEmployee]],
    proposalDetails: this.fb.group({
      proposalRefNo: ['',Validators.required],
      proposalDate: ['',Validators.required],
      proposalRecievedDate: ['',Validators.required],
      indentDept: ['',Validators.required],
      indentedBy: ['',[Validators.required, this.validateEmployee]]
    }),
    amountDetails: this.fb.group({
      estCost: ['',Validators.required],
      gstIncl: ['',Validators.required],
      completionperiod: ['',Validators.required],
      emdwaivedoff : ['',Validators.required]
    }),
    ltevendors: this.fb.array([['',[Validators.required, this.validateVendor]]])
  });

  constructor(private ltes:CreatelteserviceService,private fb: FormBuilder) { }

  ngOnInit() {
    this.ltes.getemployees().subscribe(
      data => {
        this.employees = data;
        this.notebyFilteredEmployees = this.createLte.controls.noteby.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filterEmployees(name) : this.employees.slice())
        );
        this.indentFilteredEmployees = this.proposalDetails.controls.indentedBy.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filterEmployees(name) : this.employees.slice())
        );
      },
      error => {
        console.log(error);
      }
    );

    this.ltes.getvendors().subscribe(
      data => {
        this.vendors = data;
        this.lteFilteredVendors.push(this.ltevendors.controls[0].valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filterVendors(name) : this.vendors.slice())
        ));
      }
    );

  }

  get ltevendors() {
    return this.createLte.get('ltevendors') as FormArray;
  }

  get proposalDetails() {
    return this.createLte.get('proposalDetails') as FormGroup;
  }

  removeLteVendor(i) {
    this.ltevendors.removeAt(i);
    this.lteFilteredVendors = [];
    for(let i=0;i<this.ltevendors.controls.length;i++){
      this.lteFilteredVendors.push(this.ltevendors.controls[i].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterVendors(name) : this.vendors.slice())
      ));
    }
  }

  addLteVendor() {
    this.ltevendors.push(new FormControl(''));
    this.lteFilteredVendors.push(this.ltevendors.controls[this.ltevendors.controls.length - 1].valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterVendors(name) : this.vendors.slice())
    ));
  }

  displayFnemp(emp?: Employee): String | undefined {
    return emp ? emp.name : undefined;
  }

  displayFnvendor(vendor?: Vendor): String | undefined {
    return vendor ? vendor.name : undefined;
  }

  private _filterEmployees(value: string): Employee[] {
    const filterValue = value.toLowerCase();

    return this.employees.filter(emp => emp.name.toLowerCase().includes(filterValue));
  }

  private _filterVendors(value: string): Vendor[] {
    const filterValue = value.toLowerCase();

    return this.vendors.filter(vendor => vendor.name.toLowerCase().includes(filterValue));
  }

  validateEmployee(c: FormControl) {
    return c.value.id ? null : {
      validateEmployee: {
        valid: false
      }
    };
  }

  validateVendor(c: FormControl) {
    return c.value.id ? null : {
      validateVendor: {
        valid: false
      }
    };
  }
}
