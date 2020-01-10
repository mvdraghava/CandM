import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Router} from '@angular/router';

import {DetailsserviceService} from '../detailsservice.service';
@Component({
  selector: 'app-issue-lte-nit',
  templateUrl: './issue-lte-nit.component.html',
  styleUrls: ['./issue-lte-nit.component.css']
})
export class IssueLteNitComponent implements OnInit {

  indentNo = 0;
  issuenitForm = this.fb.group({
    indentNo: [this.indentNo],
    bodDate: ['',Validators.required],
    issueDate: ['',Validators.required]
  });


  constructor(private fb: FormBuilder,private ds: DetailsserviceService,private router: Router) { }

  ngOnInit() {
    this.indentNo = this.ds.biddetails.Indentno;
    this.issuenitForm.controls.indentNo.setValue(this.indentNo);
    if(this.ds.biddetails.boddate){
      this.issuenitForm.controls.bodDate.setValue(this.ds.biddetails.boddate);
    }
    if(this.ds.biddetails.BidType == 'LTE-eproc' || this.ds.biddetails.BidType == 'OpenTender'){
      this.issuenitForm.addControl('bidsubDate',this.fb.control('',Validators.required));
    }
    if(this.ds.biddetails.BidType == 'OpenTender'){
      this.issuenitForm.addControl('prebidDate',this.fb.control('',Validators.required));
    }

  }

  issueNIT() {
    this.ds.issuelteNIT(this.issuenitForm.value).subscribe(
      data => {
        if(data && data['issued']){
          window.alert('Updated Issue Date');
          this.router.navigate(['open-bids']);
        }
        else{
          window.alert('Some Error has occured');
        }
      }
    );
  }

}
