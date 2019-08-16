import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-bid',
  templateUrl: './create-bid.component.html',
  styleUrls: ['./create-bid.component.css']
})
export class CreateBidComponent implements OnInit {
  bidtypes: string[] = ['LTE', 'OpenTender', 'Ammendment', 'SpotQuotation', 'SingleTender'];
  typeofBid = this.bidtypes[0];
  step = 0;
  generalbiddetails = this.formBuilder.group({
    indentNumber: new FormControl(0),
    bidSubject: new FormControl(''),
    typeofbid: new FormControl(this.bidtypes[0])
  });
  get indentNumber() {
    return this.generalbiddetails.get('indentNumber') as FormControl;
  }
  biddetails = {
    indentNumber: this.indentNumber.value,
  };
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
  }

}
