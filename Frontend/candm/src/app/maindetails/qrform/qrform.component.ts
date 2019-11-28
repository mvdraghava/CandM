import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import { CreateTenderService } from '../../create-tender.service';
import { Employee } from '../../employee';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { saveAs } from 'file-saver';

import {DetailsserviceService} from '../detailsservice.service';

@Component({
  selector: 'app-qrform',
  templateUrl: './qrform.component.html',
  styleUrls: ['./qrform.component.css']
})
export class QrformComponent implements OnInit {
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
  qrForm = this.fb.group({
    indentNo: [this.indentNo],
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
    this.candmQrFilteredEmployees = this.qrForm.controls.candmQrMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.indentQrFilteredEmployees = this.qrForm.controls.indentQrMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.fandaQrFilteredEmployees = this.qrForm.controls.fandaQrMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.candmBodFilteredEmployees = this.qrForm.controls.candmBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.indentBodFilteredEmployees = this.qrForm.controls.indentBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.fandaBodFilteredEmployees = this.qrForm.controls.fandaBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.candmTecFilteredEmployees = this.qrForm.controls.candmTecMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.indentTecFilteredEmployees = this.qrForm.controls.indentTecMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.fandaTecFilteredEmployees = this.qrForm.controls.fandaTecMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
  }

  ngOnInit() {
    this.cts.getemployees().subscribe(
      data => {
        this.employees = data;
        this.filter_for_employees();
      }
    );
    this.indentNo = this.ds.biddetails.Indentno;
    this.estCost = this.ds.biddetails.estCost;
    this.setmaatvalues()
    this.qrForm.controls.indentNo.setValue(this.indentNo);
  }

  private setmaatvalues() {
    let maat = Math.round((this.ds.biddetails.estCost*1.5)/(this.ds.biddetails.completionperiod * 1000)) / 100
    this.qrForm.controls.maatvalue.setValue(maat);
    let oneordervalue = Math.round((this.ds.biddetails.estCost*0.8)/1000)/100;
    let twoordervalue = Math.round((this.ds.biddetails.estCost*0.5)/1000)/100;
    let threeordervalue = Math.round((this.ds.biddetails.estCost*0.4)/1000)/100;
    this.qrForm.controls.oneordervalue.setValue(oneordervalue);
    this.qrForm.controls.twoordervalue.setValue(twoordervalue);
    this.qrForm.controls.threeordervalue.setValue(threeordervalue);
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

  getQR() {
    this.ds.prepareqr(this.qrForm.value).subscribe(
      data => {
        saveAs(data, 'QR.docx' );
      }
    );
    console.log(this.qrForm.value);
    console.log(this.ds.biddetails);
  }

}
