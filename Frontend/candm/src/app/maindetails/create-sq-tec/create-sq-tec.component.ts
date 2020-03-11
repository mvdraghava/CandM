import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import { Vendor } from './../vendor';
import { Employee } from './../../employee';
import {map, startWith} from 'rxjs/operators';
import { saveAs } from 'file-saver';
import {Router} from '@angular/router';
import {DetailsserviceService} from '../detailsservice.service';
import { CreateTenderService } from '../../create-tender.service';
import { AddvendordialogComponent } from './../../vendormanagement/addvendordialog/addvendordialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-create-sq-tec',
  templateUrl: './create-sq-tec.component.html',
  styleUrls: ['./create-sq-tec.component.css']
})
export class CreateSqTecComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private router: Router,
              private ds: DetailsserviceService,
              private cts: CreateTenderService,
              public dialog : MatDialog) {}

  ngOnInit() {
    this.cts.getemployees().subscribe(
      data => {
        this.employees = data;
        this.filter_for_employees();
      }
    );
    this.ds.getvendors().subscribe(
      data => {
        this.vendors = data;
        this.filter_for_vendors();
      }
    );
    this.indentNo = this.ds.biddetails.Indentno;
    this.sqtecForm.controls.indentNo.setValue(this.indentNo);
  }

  filter_for_employees(){
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

  filter_for_vendors(){
    this.participatedfilteredVendors = [];
    for(let i=0;i<this.participated_bidders.controls.length;i++){
      this.participatedfilteredVendors.push(this.participated_bidders['controls'][i].get('vendor').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterVendors(name) : this.vendors.slice())
      ));
    }
  }



  employees:Employee[] = [];
  vendors:Vendor[] = [];
  committeefilteredEmployees: Observable<Employee[]>[] = [];
  participatedfilteredVendors: Observable<Vendor[]>[] = [];
  indentNo = 0;
  ablesubmit = false;

  sqtecForm = this.fb.group({
    indentNo : ['', Validators.required],
    sqenquirydate: ['', Validators.required],
    sqboddate: ['', Validators.required],
    committeemembers: this.fb.array([['',[Validators.required, this.validateEmployee]],['',[Validators.required, this.validateEmployee]],['',[Validators.required, this.validateEmployee]]]),
    participated_bidders: this.fb.array([
      this.get_participated_bidder_form(),this.get_participated_bidder_form(),this.get_participated_bidder_form()
    ])
  });

  get committeemembers() {
    return this.sqtecForm.get('committeemembers') as FormArray;
  }

  get participated_bidders() {
    return this.sqtecForm.get('participated_bidders') as FormArray;
  }

  private get_participated_bidder_form(){
    return this.fb.group({
      vendor: ['',[Validators.required, this.validateVendor]],
      quoted_amount: ['', Validators.required],
      remarks: ''
    });
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

  displayFnvendor(vendor?: Vendor): String | undefined {
    return vendor ? vendor.name : undefined;
  }

  private _filterVendors(value: string): Vendor[] {
    const filterValue = value.toLowerCase();
    console.log(this.vendors.filter(vendor => vendor.name.toLowerCase().includes(filterValue)));
    return this.vendors.filter(vendor => vendor.name.toLowerCase().includes(filterValue));
  }

  validateVendor(c: FormControl) {
    return c.value.id ? null : {
      validateVendor: {
        valid: false
      }
    };
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

  addBidder() {
    this.participated_bidders.push(
      this.get_participated_bidder_form()
    );
    this.participatedfilteredVendors.push(this.participated_bidders['controls'][this.participated_bidders.controls.length - 1].get('vendor').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterVendors(name) : this.vendors.slice())
      ));
  }

  removeBidder(remove_index: number) {
    this.participated_bidders.removeAt(remove_index);
    this.participatedfilteredVendors = [];
    for(let i=0;i<this.participated_bidders.controls.length;i++){
      this.participatedfilteredVendors.push(this.participated_bidders['controls'][i].get('vendor').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterVendors(name) : this.vendors.slice())
      ));
    }
  }

  AddDialog(): void {
    const dialogRef = this.dialog.open(AddvendordialogComponent, {
      width: '1080px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if(result){
          this.ds.getvendors().subscribe(
            data => {
              this.vendors = data;
              this.filter_for_vendors();
            }
          );
        }
      }
    );
  }

  preparetec() {
    this.ablesubmit = true;
    this.ds.prepareSqTec(this.sqtecForm.value).subscribe(
      data => {
        saveAs(data, 'I_'+this.indentNo.toString()+'_CommitteReport.docx' );
        this.ablesubmit = false;
        this.router.navigate(['open-bids']);
      },
      error => {
        window.alert('Some Error has occured');
        this.ablesubmit = false;
      }
    );
  }

}
