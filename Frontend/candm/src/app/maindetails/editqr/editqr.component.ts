import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import { CreateTenderService } from '../../create-tender.service';
import { Employee } from '../../employee';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DetailsserviceService} from '../detailsservice.service';

@Component({
  selector: 'app-editqr',
  templateUrl: './editqr.component.html',
  styleUrls: ['./editqr.component.css']
})
export class EditqrComponent implements OnInit {
  indentNo;
  estCost = 0;
  candmQrFilteredEmployees: Observable<Employee[]>;
  indentQrFilteredEmployees: Observable<Employee[]>;
  fandaQrFilteredEmployees: Observable<Employee[]>;
  candmBodFilteredEmployees: Observable<Employee[]>;
  indentBodFilteredEmployees: Observable<Employee[]>;
  fandaBodFilteredEmployees: Observable<Employee[]>;
  candmTecFilteredEmployees: Observable<Employee[]>;
  indentTecFilteredEmployees: Observable<Employee[]>;
  fandaTecFilteredEmployees: Observable<Employee[]>;
  employees:Employee[] = [];
  editqrForm = this.fb.group({
    indentNo: [this.indentNo],
    qrapproveddate: [''],
    qrdate: [new Date(),Validators.required],
    candmQrMem: ['',[Validators.required, this.validateEmployee]],
    indentQrMem: ['',[Validators.required, this.validateEmployee]],
    fandaQrMem: ['',[Validators.required, this.validateEmployee]],
    candmBodMem: ['',[Validators.required, this.validateEmployee]],
    indentBodMem: ['',[Validators.required, this.validateEmployee]],
    fandaBodMem: ['',[Validators.required, this.validateEmployee]],
    candmTecMem: ['',[Validators.required, this.validateEmployee]],
    indentTecMem: ['',[Validators.required, this.validateEmployee]],
    fandaTecMem: ['',[Validators.required, this.validateEmployee]],
    maatvalue : ['',Validators.required],
    oneordervalue : ['',Validators.required],
    twoordervalue : ['',Validators.required],
    threeordervalue : ['',Validators.required]
  });
  constructor(private cts: CreateTenderService, private fb: FormBuilder,private ds: DetailsserviceService) { }

  filter_for_employees() {
    this.candmQrFilteredEmployees = this.editqrForm.controls.candmQrMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.indentQrFilteredEmployees = this.editqrForm.controls.indentQrMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.fandaQrFilteredEmployees = this.editqrForm.controls.fandaQrMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.candmBodFilteredEmployees = this.editqrForm.controls.candmBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.indentBodFilteredEmployees = this.editqrForm.controls.indentBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.fandaBodFilteredEmployees = this.editqrForm.controls.fandaBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.candmTecFilteredEmployees = this.editqrForm.controls.candmTecMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.indentTecFilteredEmployees = this.editqrForm.controls.indentTecMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.fandaTecFilteredEmployees = this.editqrForm.controls.fandaTecMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
  }

  set_values() {
    this.indentNo = this.ds.biddetails.Indentno;
    this.estCost = this.ds.biddetails.estCost;
    this.editqrForm.controls.indentNo.setValue(this.indentNo);
    if(this.ds.biddetails.qrdetails) {
      this.editqrForm.controls.candmQrMem.setValue(this.ds.biddetails.qrdetails.candmQrMem);
      this.editqrForm.controls.indentQrMem.setValue(this.ds.biddetails.qrdetails.indentQrMem);
      this.editqrForm.controls.fandaQrMem.setValue(this.ds.biddetails.qrdetails.fandaQrMem);
      this.editqrForm.controls.maatvalue.setValue(this.ds.biddetails.qrdetails.maatvalue);
      this.editqrForm.controls.oneordervalue.setValue(this.ds.biddetails.qrdetails.oneordervalue);
      this.editqrForm.controls.twoordervalue.setValue(this.ds.biddetails.qrdetails.twoordervalue);
      this.editqrForm.controls.threeordervalue.setValue(this.ds.biddetails.qrdetails.threeordervalue);
      if(this.ds.biddetails.qrdetails.qrapproveddate) {
        this.editqrForm.controls.qrapproveddate.setValue(this.ds.biddetails.qrdetails.qrapproveddate);
      }
      if(this.ds.biddetails.qrdetails.qrdate) {
        this.editqrForm.controls.qrdate.setValue(this.ds.biddetails.qrdetails.qrdate);
      }
    }
    if(this.ds.biddetails.bodcomdetails) {
      this.editqrForm.controls.candmBodMem.setValue(this.ds.biddetails.bodcomdetails.candmBodMem);
      this.editqrForm.controls.indentBodMem.setValue(this.ds.biddetails.bodcomdetails.indentBodMem);
      this.editqrForm.controls.fandaBodMem.setValue(this.ds.biddetails.bodcomdetails.fandaBodMem);
    }
    if(this.ds.biddetails.teccomdetails) {
      this.editqrForm.controls.candmTecMem.setValue(this.ds.biddetails.teccomdetails.candmTecMem);
      this.editqrForm.controls.indentTecMem.setValue(this.ds.biddetails.teccomdetails.indentTecMem);
      this.editqrForm.controls.fandaTecMem.setValue(this.ds.biddetails.teccomdetails.fandaTecMem);
    }
  }

  ngOnInit() {
    this.cts.getemployees().subscribe(
      data => {
        this.employees = data;
        this.filter_for_employees();
      }
    );
    this.set_values();
  }

  displayFn(emp?: Employee): String | undefined {
    return emp ? emp.name : undefined;
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

  editQR() {
    this.ds.editqr(this.editqrForm.value).subscribe(
      data => {
        if(data && data['edited']){
          window.alert('Edited QR successfully');
          this.ds.getbiddetails({'indent_no':this.indentNo}).subscribe(
            data => {
              this.ds.biddetails = data;
            }
          );
        }
        else{
          window.alert('Some Error has occured');
        }
      }
    );
  }

}
