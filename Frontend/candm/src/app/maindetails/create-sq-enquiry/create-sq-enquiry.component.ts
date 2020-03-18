import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {DetailsserviceService} from '../detailsservice.service';
import { saveAs } from 'file-saver';
import {Router} from '@angular/router';
import { departments,designations } from './../../globalvariables';

@Component({
  selector: 'app-create-sq-enquiry',
  templateUrl: './create-sq-enquiry.component.html',
  styleUrls: ['./create-sq-enquiry.component.css']
})
export class CreateSqEnquiryComponent implements OnInit {

  constructor(private fb:FormBuilder,
  						public ds: DetailsserviceService,
              private router: Router) {}

  ngOnInit() {
    this.indentNo = this.ds.biddetails.Indentno;
    this.createsqform.controls.indentNo.setValue(this.indentNo);
  }

  departments = departments;
  designations = designations;
  indentNo = 0;
  ablesubmit = false;
  errormessage = '';
  createsqform = this.fb.group({
    indentNo:[0],
    specialConditions: [false,Validators.required],
    engineerInchargeDesg: ['',Validators.required],
    engineerInchargeDept: ['', Validators.required]
  });

  createSqEnquiry(){
    this.ablesubmit = true;
    this.ds.createsqenquiry(this.createsqform.value).subscribe(
      data => {
        saveAs(data, 'I_'+this.indentNo.toString()+'_SpotEnquiry.docx' );
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
