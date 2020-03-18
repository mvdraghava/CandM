import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import { CreateTenderService } from '../../create-tender.service';
import { Employee } from '../../employee';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {DetailsserviceService} from '../detailsservice.service';

@Component({
  selector: 'app-edit-lte-committee',
  templateUrl: './edit-lte-committee.component.html',
  styleUrls: ['./edit-lte-committee.component.css']
})
export class EditLteCommitteeComponent implements OnInit {
  candmBodFilteredEmployees: Observable<Employee[]>;
  indentBodFilteredEmployees: Observable<Employee[]>;
  fandaBodFilteredEmployees: Observable<Employee[]>;
  candmTecFilteredEmployees: Observable<Employee[]>;
  indentTecFilteredEmployees: Observable<Employee[]>;
  fandaTecFilteredEmployees: Observable<Employee[]>;
  employees:Employee[] = [];
  indentNo = 0;

  editcommiteForm = this.fb.group({
    indentNo: [this.indentNo],
    candmBodMem: ['',[Validators.required, this.validateEmployee]],
    indentBodMem: ['',[Validators.required, this.validateEmployee]],
    fandaBodMem: ['',[Validators.required, this.validateEmployee]],
    candmTecMem: ['',[Validators.required, this.validateEmployee]],
    indentTecMem: ['',[Validators.required, this.validateEmployee]],
    fandaTecMem: ['',[Validators.required, this.validateEmployee]],
  });

  constructor(private cts: CreateTenderService, private fb: FormBuilder,public ds: DetailsserviceService) { }

  filter_for_employees() {
    this.candmBodFilteredEmployees = this.editcommiteForm.controls.candmBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.indentBodFilteredEmployees = this.editcommiteForm.controls.indentBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.fandaBodFilteredEmployees = this.editcommiteForm.controls.fandaBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.candmTecFilteredEmployees = this.editcommiteForm.controls.candmTecMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.indentTecFilteredEmployees = this.editcommiteForm.controls.indentTecMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.fandaTecFilteredEmployees = this.editcommiteForm.controls.fandaTecMem.valueChanges
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
    this.editcommiteForm.controls.indentNo.setValue(this.indentNo);
    if(this.ds.biddetails.bodcomdetails) {
      this.editcommiteForm.controls.candmBodMem.setValue(this.ds.biddetails.bodcomdetails.candmBodMem);
      this.editcommiteForm.controls.indentBodMem.setValue(this.ds.biddetails.bodcomdetails.indentBodMem);
      this.editcommiteForm.controls.fandaBodMem.setValue(this.ds.biddetails.bodcomdetails.fandaBodMem);
    }
    if(this.ds.biddetails.teccomdetails) {
      this.editcommiteForm.controls.candmTecMem.setValue(this.ds.biddetails.teccomdetails.candmTecMem);
      this.editcommiteForm.controls.indentTecMem.setValue(this.ds.biddetails.teccomdetails.indentTecMem);
      this.editcommiteForm.controls.fandaTecMem.setValue(this.ds.biddetails.teccomdetails.fandaTecMem);
    }
  }

  private _filterEmployees(value: string): Employee[] {
    const filterValue = value.toLowerCase();

    return this.employees.filter(emp => emp.name.toLowerCase().includes(filterValue));
  }

  displayFn(emp?: Employee): String | undefined {
    return emp ? emp.name : undefined;
  }

  validateEmployee(c: FormControl) {
    return c.value.id ? null : {
      validateEmployee: {
        valid: false
      }
    };
  }

  editCommitte() {
    this.ds.editcommittee(this.editcommiteForm.value).subscribe(
      data => {
        if(data && data['edited']){
          window.alert('Edited Committee successfully');
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
