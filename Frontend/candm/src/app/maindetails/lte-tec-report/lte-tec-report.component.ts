import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import { CreateTenderService } from '../../create-tender.service';
import {DetailsserviceService} from '../detailsservice.service';
import { Employee } from '../../employee';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-lte-tec-report',
  templateUrl: './lte-tec-report.component.html',
  styleUrls: ['./lte-tec-report.component.css']
})
export class LteTecReportComponent implements OnInit {

  constructor(private cts: CreateTenderService, private fb: FormBuilder,public ds: DetailsserviceService) { }
  indentNo = 0;
  employees:Employee[] = [];
  candmBodFilteredEmployees: Observable<Employee[]>;
  indentBodFilteredEmployees: Observable<Employee[]>;
  fandaBodFilteredEmployees: Observable<Employee[]>;
  emdDetails = [
    'Paid EMD',
    'Submitted MSME',
    'Submitted NSIC',
    'Submitted MSME and NSIC'
  ];
  quotationDetailsChange() {
    this.tecform.controls.quotationDetails['controls'].forEach(
      (quotation) => {
          if(quotation.controls.participated.value){
            quotation.enable();
            quotation.controls.participated.enable();
            quotation.controls.vendor.enable();
          }else{
            quotation.disable();
            quotation.controls.participated.enable();
            quotation.controls.vendor.enable();
          }
      }
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
    this.tecform.controls.indentNo.setValue(this.indentNo);
    if(this.ds.biddetails.bodcomdetails) {
      this.tecform.controls.candmBodMem.setValue(this.ds.biddetails.bodcomdetails.candmBodMem);
      this.tecform.controls.indentBodMem.setValue(this.ds.biddetails.bodcomdetails.indentBodMem);
      this.tecform.controls.fandaBodMem.setValue(this.ds.biddetails.bodcomdetails.fandaBodMem);
      this.tecform.controls.bodDate.setValue(this.ds.biddetails.boddate);
    }
    let nitsentvendors = this.ds.biddetails.nitsentvendors;
    let quotation;
    nitsentvendors.forEach(
      (vendor) => {
        this.quotationDetails.push(this.createquotation(this.ds.biddetails.emdwaivedoff,vendor));
      }
    );
    this.quotationDetailsChange();
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

  prepareltetec(){
    this.ds.prepareltetec(this.tecform.value).subscribe(
      data => {
        if(data && data['issued']){
          window.alert('Prepared Corrigendum Files');
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

  createquotation(emdwaivedoff,vendor): FormGroup {
    if(emdwaivedoff){
      return this.fb.group({
        vendor:[vendor],
        quoteamount:[''],
        participated:[''],
        remarks: ['']
      });
    }
    else {
      return this.fb.group({
        vendor:[vendor],
        quoteamount:[''],
        participated:[''],
        emd:[''],
        remarks: ['']
      });
    }
  }

  filter_for_employees(){
    this.candmBodFilteredEmployees = this.tecform.controls.candmBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.indentBodFilteredEmployees = this.tecform.controls.indentBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.fandaBodFilteredEmployees = this.tecform.controls.fandaBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
  }

  tecform = this.fb.group({
    indentNo: [this.indentNo],
    bodDate: ['',Validators.required],
    quotationDetails: this.fb.array([]),
    candmBodMem: ['',[Validators.required, this.validateEmployee]],
    indentBodMem: ['',[Validators.required, this.validateEmployee]],
    fandaBodMem: ['',[Validators.required, this.validateEmployee]],
  })

  get quotationDetails() {
    return this.tecform.get('quotationDetails') as FormArray;
  }
}
