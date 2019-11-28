import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import {DetailsserviceService } from './detailsservice.service';

@Component({
  selector: 'app-maindetails',
  templateUrl: './maindetails.component.html',
  styleUrls: ['./maindetails.component.css']
})
export class MaindetailsComponent implements OnInit {

  indentNo: string;
  tendersubject = "";

  bid;

  menustages = {
    'OpenTender' :{
      'Created Proposal Notesheet' : [{
        'stage': 'Prepare QR',
        'link' : 'qr'
      }],
      'QR to be Approved' : [{
        'stage' : 'Edit QR',
        'link' : 'editqr'
      },
      {
        'stage' : 'Prepare NIT',
        'link' : 'prepareotnit'
      },
      {
        'stage' : 'Prepare BOQ',
        'link' : 'prepareotboq'
      }],
    }
  };

  nextstageMenu = [];

  constructor(private route: ActivatedRoute, private ds: DetailsserviceService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.indentNo = params.get('indentno');
      this.tendersubject =params.get('tendersubject');
    });
    this.ds.getbiddetails({'indent_no':this.indentNo}).subscribe(
      data => {
        this.ds.biddetails = data;
        this.bid = data;
        this.nextstageMenu = this.menustages[this.bid.BidType][this.bid.BidStatus];
      }
    );
  }

}
