import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {DetailsserviceService} from '../detailsservice.service';
@Component({
  selector: 'app-vendor-clarrifications',
  templateUrl: './vendor-clarrifications.component.html',
  styleUrls: ['./vendor-clarrifications.component.css']
})
export class VendorClarrificationsComponent implements OnInit {

  constructor(private fb:FormBuilder,
  						public ds: DetailsserviceService) { }

  ngOnInit(): void {
    this.indentNo = this.ds.biddetails.Indentno;
    this.clarrificationsform.controls.indentNo.setValue(this.indentNo);
    this.prepareclarrreqArray();
  }
  indentNo = 0;
  clarrificationsform = this.fb.group({
    indentNo:[0],
    clarrificationDate: ['',Validators.required],
    clarrificationEndDate: ['',Validators.required],
    clarrificationsRequired: this.fb.array([])
  });

  get clarrificationsRequired() {
   return this.clarrificationsform.get('clarrificationsRequired') as FormArray;
  }

  prepareclarrreqArray() {
    if(this.ds.biddetails.participatedvendors){
      this.ds.biddetails.participatedvendors.forEach(vendor => {
        this.clarrificationsRequired.push(this.createclarrReqformControl(vendor));
      });
    }
  }

  createclarrReqformControl(vendor): FormGroup {
    return this.fb.group({
      vendor:[vendor],
      clarrrequired:[false],
    });
  }

  prepareClarrifications(){
    console.log(this.clarrificationsform);
  }

}
