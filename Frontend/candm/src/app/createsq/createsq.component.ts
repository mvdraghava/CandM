import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { CreatesqserviceService } from './createsqservice.service';
import { ProposaldetailsComponent } from './../formcomponents-module/proposaldetails/proposaldetails.component';
import { AmountDetailsComponent } from './../formcomponents-module/amount-details/amount-details.component';
import { TenderDetailsComponent } from './../formcomponents-module/tender-details/tender-details.component';
import { CombineCommitteMembersComponent } from './../formcomponents-module/combine-committe-members/combine-committe-members.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-createsq',
  templateUrl: './createsq.component.html',
  styleUrls: ['./createsq.component.css']
})
export class CreatesqComponent implements OnInit, AfterViewInit {

  @ViewChild(ProposaldetailsComponent)
  private pdc: ProposaldetailsComponent;
  @ViewChild(AmountDetailsComponent)
  private adc: AmountDetailsComponent;
  @ViewChild(TenderDetailsComponent)
  private tdc: TenderDetailsComponent;
  @ViewChild(CombineCommitteMembersComponent)
  private cmc: CombineCommitteMembersComponent;
  createSq = this.fb.group({});

  get proposalDetails() {
    return this.createSq.get('proposalDetails') as FormGroup;
  }

  constructor(private fb: FormBuilder, private createSqService: CreatesqserviceService, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createSq.addControl('proposalDetails', this.pdc.proposalDetails);
      this.createSq.addControl('amountDetails', this.adc.amountDetails);
      this.createSq.addControl('tenderDetails', this.tdc.tenderDetails);
      this.createSq.addControl('commiteeMembers', this.cmc.committeeMembers);
    });
    // console.log(this.pdc)
    // this.createSq.addControl('proposalDetails', this.pdc.proposalDetails);
    // this.createSq.addControl('amountDetails', this.adc.amountDetails);
    // this.createSq.addControl('tenderDetails', this.tdc.tenderDetails);
  }

  createsqtender() {
    this.createSqService.createsq(this.createSq.value).subscribe(
      data => {
        if (data['success']) {
          window.alert('Created Spot Quatation');
          this.router.navigate(['open-bids']);
        } else {
            window.alert('Some Error has occured');
        }
      },
      error => {
        window.alert('Some Error has occured');
      }
    );
  }

}
