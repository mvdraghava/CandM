import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import { CreateTenderService } from '../../create-tender.service';
import {DetailsserviceService} from '../detailsservice.service';
import { Employee } from '../../employee';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lte-eproc-bid-opening',
  templateUrl: './lte-eproc-bid-opening.component.html',
  styleUrls: ['./lte-eproc-bid-opening.component.css']
})
export class LteEprocBidOpeningComponent implements OnInit {

  constructor(private cts: CreateTenderService,
              private fb: FormBuilder,
              public ds: DetailsserviceService,
              private router: Router,
              private route: ActivatedRoute) { }
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
  documentSubmissionDetails = [
    'Participated in Online Bidding',
    'Only Offline Documents'
  ];
  ablesubmit = false;
  errormessage = '';
  indentNo = 0;

  bodform = this.fb.group({
    indentNo: [this.indentNo],
    bodDate: ['',Validators.required],
    bidsubmissionDetails: this.fb.array([]),
    candmBodMem: ['',[Validators.required, this.validateEmployee]],
    indentBodMem: ['',[Validators.required, this.validateEmployee]],
    fandaBodMem: ['',[Validators.required, this.validateEmployee]]
  })

  get bidsubmissionDetails() {
    return this.bodform.get('bidsubmissionDetails') as FormArray;
  }

  // Activates and Deactivate the vendor form elements based on checkbox
  bidsubmissionDetailsChange() {
    this.ablesubmit = false;
    this.errormessage = '';
    this.bodform.controls.bidsubmissionDetails['controls'].forEach(
      (quotation) => {
          if(quotation.controls.participated.value){
            quotation.enable();
            quotation.controls.participated.enable();
            quotation.controls.vendor.enable();
            if(quotation.controls.emd){
              if(quotation.controls.emd.value == 'Paid EMD'){
                quotation.controls.emddetails.enable();
              }
              else {
                quotation.controls.emddetails.disable();
              }
            }
          }else{
            quotation.disable();
            quotation.controls.participated.enable();
            quotation.controls.vendor.enable();
          }
      }
    );
  }

  emdChange(event) {
    if(event.value == 'Paid EMD') {
      this.bodform.controls.bidsubmissionDetails['controls'][event.source.ngControl._parent.name].controls.emddetails.enable();
    }
    if(event.value != 'Paid EMD' && this.bodform.controls.bidsubmissionDetails['controls'][event.source.ngControl._parent.name].controls.emddetails) {
      this.bodform.controls.bidsubmissionDetails['controls'][event.source.ngControl._parent.name].controls.emddetails.disable();
    }
  }

  ngOnInit() {
    this.cts.getemployees().subscribe(
      data => {
        this.employees = data;
        this.filter_for_employees();
      }
    );
    this.indentNo = this.ds.biddetails.Indentno;
    this.bodform.controls.indentNo.setValue(this.indentNo);
    if(this.ds.biddetails.bodcomdetails) {
      this.bodform.controls.candmBodMem.setValue(this.ds.biddetails.bodcomdetails.candmBodMem);
      this.bodform.controls.indentBodMem.setValue(this.ds.biddetails.bodcomdetails.indentBodMem);
      this.bodform.controls.fandaBodMem.setValue(this.ds.biddetails.bodcomdetails.fandaBodMem);
      this.bodform.controls.bodDate.setValue(this.ds.biddetails.impdates.boddate);
    }
    let nitsentvendors = this.ds.biddetails.nitsentvendors;
    nitsentvendors.forEach(
      (vendor) => {
        this.bidsubmissionDetails.push(this.createbidsubmissionvendor(this.ds.biddetails.emdwaivedoff,vendor));
      }
    ); // Add form elements for each vendor whom we have sent the NIT
    this.bidsubmissionDetailsChange(); // Function to activate and deactivate form elements based on participated value
  }



  filter_for_employees(){
    this.candmBodFilteredEmployees = this.bodform.controls.candmBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.indentBodFilteredEmployees = this.bodform.controls.indentBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.fandaBodFilteredEmployees = this.bodform.controls.fandaBodMem.valueChanges
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


  // Creates form group for vendors whom we have sent NIT
  // the form group will be added to the template
  createbidsubmissionvendor(emdwaivedoff,vendor): FormGroup{
    if(emdwaivedoff){
      return this.fb.group({
        vendor:[vendor],
        participated:[false,Validators.required],
        submittedonline: [' ',Validators.required],
        remarks: ['']
      });
    }
    else{
      return this.fb.group({
        vendor:[vendor],
        participated:[false,Validators.required],
        submittedonline: ['',Validators.required],
        emd:['',Validators.required],
        emddetails:[{value: '',disabled: true},Validators.required],
        remarks: ['']
      });
    }
  }

  // Function to submit the bod details to backend
  lteeprocbidopening() {
    console.log(this.bodform.value);
    this.ablesubmit = true;
    let participatedvendors = 0;
    this.bodform.controls.bidsubmissionDetails['controls'].forEach(
      (quotation) => {
        if(quotation.controls.participated.value){
          participatedvendors++;
        }
      }
    );
    if(!participatedvendors){
      this.errormessage = 'Select atleast One Vendor';
      console.log(this.errormessage);
    }
    else{
      this.ds.lteeprocbidopening(this.bodform.value).subscribe(
        data => {
          if(data && data['issued']){
            window.alert('Bid Opening Report and other files are prepared');
            this.router.navigate(['showfiles'], {relativeTo: this.route.parent.parent});
          }
          else {
            window.alert('Some Error has Occured! Please Try again');
          }
        },
        error => {
          window.alert('Some Error has Occured! Please Try again');
        }
      )
    }
  }

}
