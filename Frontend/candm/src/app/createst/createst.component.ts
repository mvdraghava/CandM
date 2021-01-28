import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreatestServiceService } from './createst-service.service';
import { ProposaldetailsComponent } from './../formcomponents-module/proposaldetails/proposaldetails.component';
import { AmountDetailsComponent } from './../formcomponents-module/amount-details/amount-details.component';
import { TenderDetailsComponent } from './../formcomponents-module/tender-details/tender-details.component';
import { SinglevendorComponent } from './../formcomponents-module/singlevendor/singlevendor.component';
import { CombineCommitteMembersComponent } from '../formcomponents-module/combine-committe-members/combine-committe-members.component';

@Component({
  selector: 'app-createst',
  templateUrl: './createst.component.html',
  styleUrls: ['./createst.component.css']
})
export class CreatestComponent implements OnInit, AfterViewInit {

  @ViewChild(ProposaldetailsComponent)
  private pdc: ProposaldetailsComponent;
  @ViewChild(AmountDetailsComponent)
  private adc: AmountDetailsComponent;
  @ViewChild(TenderDetailsComponent)
  private tdc: TenderDetailsComponent;
  @ViewChild(CombineCommitteMembersComponent)
  private cmc: CombineCommitteMembersComponent;
  @ViewChild(SinglevendorComponent)
  private svc: SinglevendorComponent;
  createSt = this.fb.group({
    negotiationCommitte : [false, Validators.required],
    reason : ['', Validators.required]
  });
  ablesubmit = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private createstService: CreatestServiceService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createSt.addControl('proposalDetails', this.pdc.proposalDetails);
      this.createSt.addControl('amountDetails', this.adc.amountDetails);
      this.createSt.addControl('tenderDetails', this.tdc.tenderDetails);
      this.createSt.addControl('vendor', this.svc.vendor);
    });
  }

  negotiationChange() {
    if (this.createSt.controls.negotiationCommitte.value) {
      setTimeout(() => {
        this.createSt.addControl('commiteeMembers', this.cmc.committeeMembers);
      });
    } else {
      this.createSt.removeControl('commiteeMembers');
    }
    console.log(this.createSt);
  }

  createsttender() {
    this.ablesubmit = true;
    this.createstService.createst(this.createSt.value).subscribe(
      data => {
        if (data['success']) {
          window.alert('Created Single Tender');
          this.router.navigate(['open-bids']);
        } else {
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
