import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import { CreateTenderService } from '../../create-tender.service';
import { Employee } from '../../employee';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { saveAs } from 'file-saver';

import {DetailsserviceService} from '../detailsservice.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-prepare-lte-eproc-nit',
  templateUrl: './prepare-lte-eproc-nit.component.html',
  styleUrls: ['./prepare-lte-eproc-nit.component.css']
})
export class PrepareLteEprocNitComponent implements OnInit {

  constructor(private cts: CreateTenderService, private fb: FormBuilder,private ds: DetailsserviceService,
              private router: Router) { }

  candmBodFilteredEmployees: Observable<Employee[]>;
  indentBodFilteredEmployees: Observable<Employee[]>;
  fandaBodFilteredEmployees: Observable<Employee[]>;
  candmTecFilteredEmployees: Observable<Employee[]>;
  indentTecFilteredEmployees: Observable<Employee[]>;
  fandaTecFilteredEmployees: Observable<Employee[]>;
  employees:Employee[] = [];
  indentNo = 0;
  typeofincharge = ['Enginner InCharge', 'Officer InCharge'];
  designations = ['Assistant Manager',
                  'Deputy Manager',
                  'Manager',
                  'Chief Manager',
                  'Deputy General Manager',
                  'Sr. Deputy General Manager',
                  'General Manager',
                  'Sr. General Manager',
                  'Chief General Manager'];
  departments = ['HR','SL-I','SL-II','SO-I','SO-II','Grid Management','Finance and Accounts','Contracts and Materials','MO'];
  tendercategories = ['Services','Goods','Works'];
  contracttypes = ['Work', 'Supply', 'Auction', 'Service', 'Buy', 'Empanelment', 'Sell'];
  productcategories = ['Civil','Electrical Works','Computer System','Fleet Management','Miscellaneous works'];
  bidvaliditydays = [180,120,90,60,30];
  ablesubmit = false; //to make submit button able and disable

  nitForm = this.fb.group({
    indentNo : [this.indentNo],
    candmBodMem: ['',[Validators.required, this.validateEmployee]],
    indentBodMem: ['',[Validators.required, this.validateEmployee]],
    fandaBodMem: ['',[Validators.required, this.validateEmployee]],
    candmTecMem: ['',[Validators.required, this.validateEmployee]],
    indentTecMem: ['',[Validators.required, this.validateEmployee]],
    fandaTecMem: ['',[Validators.required, this.validateEmployee]],
    proposalapprovedDate : ['',Validators.required],
    engineerincharge_type: ['Enginner InCharge',Validators.required],
    engineerincharge_desg: ['',Validators.required],
    engineerincharge_dept : ['', Validators.required],
    adressconsignee_desg: ['', Validators.required],
    adressconsignee_dept: ['', Validators.required],
    tender_category: ['', Validators.required],
    type_contract : ['', Validators.required],
    product_category: ['', Validators.required],
    bid_valid_days: ['',Validators.required],
  });

  ngOnInit() {
    this.cts.getemployees().subscribe(
      data => {
        this.employees = data;
        this.filter_for_employees();
      }
    );
    this.indentNo = this.ds.biddetails.Indentno;
    this.nitForm.controls.indentNo.setValue(this.indentNo);
  }

  filter_for_employees() {
    this.candmBodFilteredEmployees = this.nitForm.controls.candmBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.indentBodFilteredEmployees = this.nitForm.controls.indentBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.fandaBodFilteredEmployees = this.nitForm.controls.fandaBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.candmTecFilteredEmployees = this.nitForm.controls.candmTecMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.indentTecFilteredEmployees = this.nitForm.controls.indentTecMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.fandaTecFilteredEmployees = this.nitForm.controls.fandaTecMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
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

  getNIT() {
    this.ablesubmit = true;
    if(this.nitForm.valid){
      this.ds.getlteeprocNIT(this.nitForm.value).subscribe(
        data => {
          saveAs(data, 'I_'+this.indentNo.toString()+'_NIT.docx' );
          this.ablesubmit = false;
          window.alert('Created NIT');
          this.router.navigate(['open-bids']);
        },
        error => {
            window.alert('Some Error has occured');
            this.ablesubmit = false;
        }
      );
    }
    else{
      console.log(this.nitForm.value);
      console.log(this.ds.biddetails);
    }
  }

}
