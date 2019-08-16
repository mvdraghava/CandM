import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';


@Component({
  selector: 'app-lteform',
  templateUrl: './lteform.component.html',
  styleUrls: ['./lteform.component.css']
})

export class LteformComponent implements OnInit {
  ltebiddetails = this.formbuilder.group({
    date: new Date(),
    refNo: '',
    proposalDetails: this.formbuilder.group({
      proposalRefNo: '',
      proposalDate: '',
      proposalRecievedDate: ''
    }),
    amountDetails: this.formbuilder.group({
      estimatedAmount: '',
      emdAmount: '',
      emdwaivedstatus: ''
    }),
    listOfParties: this.formbuilder.array([
      this.formbuilder.group({
        partyName: '',
        Address: ''
      })
    ]),
  });
  constructor(private formbuilder: FormBuilder) { }

  get listOfParties() {
    return this.ltebiddetails.get('listOfParties') as FormArray;
  }

  addListOfParty() {
    this.listOfParties.push(this.formbuilder.group({
      partyName: '',
      Address: ''
    }));
  }

  ngOnInit() {
  }

}
