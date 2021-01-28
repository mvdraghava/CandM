import { Component,
         OnInit,
         ViewChild,
         AfterViewInit,
         AfterViewChecked
} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProposaldetailsComponent } from './../../formcomponents-module/proposaldetails/proposaldetails.component';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild(ProposaldetailsComponent)
  private pdc: ProposaldetailsComponent;
  @ViewChild('pd1') pd1;
  display = false;
  constructor(private fb: FormBuilder) { }
  editform = this.fb.group({});
  proposalDetails = {
    proposalRefNo: 'sfgdsf',
    proposalDate: new Date(2020, 2, 26),
    proposalRecievedDate: new Date(2020, 2, 25),
    proposalApprovedDate: new Date(2020, 2, 24),
    indentDept: 'Grid Management',
    indentedBy: 'MVD Raghava'
  };

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    // console.log(this.pdc)
    this.editform.addControl('proposalDetails', this.pdc.proposalDetails);
  }

  ngAfterViewChecked() {

  }

  addform() {
  }

  onSubmit() {
    console.log(this.editform.value);
  }

}
