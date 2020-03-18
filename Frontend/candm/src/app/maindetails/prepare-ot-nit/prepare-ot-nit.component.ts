import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {DetailsserviceService} from '../detailsservice.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-prepare-ot-nit',
  templateUrl: './prepare-ot-nit.component.html',
  styleUrls: ['./prepare-ot-nit.component.css']
})
export class PrepareOtNITComponent implements OnInit {
  indentNo;

  prepareotNITForm = this.fb.group({
    indentNo: [this.indentNo],
    qrapproveddate: ['',Validators.required],
  });

  constructor(private fb: FormBuilder,public ds: DetailsserviceService) { }

  ngOnInit() {
    this.indentNo = this.ds.biddetails.Indentno;
    this.prepareotNITForm.controls.indentNo.setValue(this.indentNo);
    if(this.ds.biddetails.qrdetails) {
      if(this.ds.biddetails.qrdetails.qrapproveddate) {
        this.prepareotNITForm.controls.qrapproveddate.setValue(this.ds.biddetails.qrdetails.qrapproveddate);
      }
    }
  }

  getOtNIT() {
    console.log("clicked");
    console.log(this.prepareotNITForm.value)
    this.ds.getotNIT(this.prepareotNITForm.value).subscribe(
      data => {
        saveAs(data, 'I_'+this.indentNo.toString()+'_Tender_Document.docx' );
      },
      error => {
        window.alert('Some Error has occured');
      }
    );
  }

}
