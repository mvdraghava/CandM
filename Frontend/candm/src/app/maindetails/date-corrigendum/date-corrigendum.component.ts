import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import { Employee } from '../../employee';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DetailsserviceService} from '../detailsservice.service';
import { CreateTenderService } from '../../create-tender.service';

@Component({
  selector: 'app-date-corrigendum',
  templateUrl: './date-corrigendum.component.html',
  styleUrls: ['./date-corrigendum.component.css']
})
export class DateCorrigendumComponent implements OnInit {
  issuedbyFilteredEmployees: Observable<Employee[]>;
  employees:Employee[] = [];
  indentNo = 0;
  datecorriForm = this.fb.group({
    indentNo: [this.indentNo],
    bodDate: ['',Validators.required],
    issueDate: ['',Validators.required],
    bidsubDate: [''],
    prebidDate: [''],
    reason: ['', Validators.required],
    issuedby: ['',[Validators.required, this.validateEmployee]]
  });

  constructor(private cts: CreateTenderService,private fb: FormBuilder,private ds: DetailsserviceService) { }

  ngOnInit() {
    this.cts.getemployees().subscribe(
      data => {
        this.employees = data;
        this.issuedbyFilteredEmployees = this.datecorriForm.controls.issuedby.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filterEmployees(name) : this.employees.slice())
        );
      }
    );
    this.indentNo = this.ds.biddetails.Indentno;
    this.datecorriForm.controls.indentNo.setValue(this.indentNo);

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

  issueCorrigendum() {
    this.ds.issuedateCorrigendum(this.datecorriForm.value).subscribe(
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

}
