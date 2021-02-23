import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { ProposaldetailsComponent } from './../formcomponents-module/proposaldetails/proposaldetails.component';
import { AmountDetailsComponent } from './../formcomponents-module/amount-details/amount-details.component';
import { TenderDetailsComponent } from './../formcomponents-module/tender-details/tender-details.component';
import { LoaDetailsComponent } from './../formcomponents-module/loa-details/loa-details.component';
import {Router} from '@angular/router';
import { OldcontractserviceService } from './oldcontractservice.service';

@Component({
  selector: 'app-oldcontractcreate',
  templateUrl: './oldcontractcreate.component.html',
  styleUrls: ['./oldcontractcreate.component.css']
})
export class OldcontractcreateComponent implements OnInit, AfterViewInit {

  @ViewChild(ProposaldetailsComponent)
  private pdc: ProposaldetailsComponent;
  @ViewChild(TenderDetailsComponent)
  private tdc: TenderDetailsComponent;
  @ViewChild(LoaDetailsComponent)
  private loa: LoaDetailsComponent;
  @ViewChild('awardedAmount') awardedAmount;
  @ViewChild('estAmount') estAmount;
  eproc = false;
  awardedcontracts = this.fb.group({});
  ablesubmit = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private ocs: OldcontractserviceService) { }

  ngOnInit(): void {
  }
  get tenderDetails() {
    return this.awardedcontracts.get('tenderDetails') as FormGroup;
  }

  tenderDetailchange(){
    this.tenderDetails.get('modeofprocurment').valueChanges.subscribe(selectedmode => {
      if (selectedmode == 'Open Tender' || selectedmode == 'LTE E-procurment') {
        this.eproc = true;
      }else {
        this.eproc = false;
      }
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.awardedcontracts.addControl('proposalDetails', this.pdc.proposalDetails);
      this.awardedcontracts.addControl('tenderDetails', this.tdc.tenderDetails);
      this.awardedcontracts.addControl('loaDetails', this.loa.loaDetails);
      this.awardedcontracts.addControl('estAmount', this.estAmount.amountDetails);
      this.awardedcontracts.addControl('awardedAmount', this.awardedAmount.amountDetails);
      // this.awardedcontracts.addControl('commiteeMembers', this.cmc.committeeMembers);
      this.tenderDetailchange();
    });
  }

  saveTender(){
    this.ablesubmit = true;
    console.log(this.awardedcontracts.value);
    this.ocs.savetender(this.awardedcontracts.value).subscribe(
      data => {
        if (data['success']) {
          window.alert('Saved Tender');
          this.router.navigate(['open-bids']);
        } else {
          this.ablesubmit = false;
          window.alert('Some Error has occured');
        }
      },
      error => {
        this.ablesubmit = false;
        window.alert('Some Error has occured');
      }
    );
  }

}
