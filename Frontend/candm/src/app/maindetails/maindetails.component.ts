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
  loaded = false;

  bid;

  ltemenustages = {
    'Created Proposal Notesheet' : [{
      'stage': 'Prepare NIT',
      'link' : 'prepareltenit'
    }],
    'NIT prepared for Vetting': [{
      'stage': 'Edit Commitee',
      'link': 'edit-lte-committee'
    },
    {
      'stage': 'Issue NIT',
      'link': 'issue-lte-nit'
    }],
    'NIT Issued' : [{
      'stage': 'Edit Commitee',
      'link': 'edit-lte-committee'
    },
    {
      'stage': 'Date Corrigendum',
      'link': 'datecorrigendum'
    },
    {
      'stage': 'Other Corrigendum',
      'link': 'othercorrigendum'
    },
    {
      'stage': 'TEC Report',
      'link': 'ltetecreport'
    }],
    'TEC Prepared for Vetting' : [{
      'stage' : 'Prepare LOA/PO',
      'link' : 'prepareloapo'
    }],
    'LOA Prepared for Vetting' : [{
      'stage' : 'Issue LOA' ,
      'link' : 'issueloa'
    }],
    'PO Prepared for Vetting' : [{
      'stage' : 'Issue PO' ,
      'link' : 'issuepo'
    }]
  }

  lteeprocmenustages = {
    'Created Proposal Notesheet' : [{
      'stage': 'Prepare NIT',
      'link' : 'preparelteeprocnit'
    }],
    'NIT prepared for Vetting': [{
      'stage': 'Edit Commitee',
      'link': 'edit-lte-committee'
    },
    {
      'stage': 'Issue NIT',
      'link': 'issue-lte-nit'
    }],
    'NIT Issued' : [{
      'stage': 'Edit Commitee',
      'link': 'edit-lte-committee'
    },
    {
      'stage': 'Date Corrigendum',
      'link': 'datecorrigendum'
    },
    {
      'stage': 'Other Corrigendum',
      'link': 'othercorrigendum'
    },
    {
      'stage': 'Bid Opening',
      'link': 'lte-eproc-bid-open'
    }],
    'Bid Opening Done' : [{
      'stage': 'TEC Template',
      'link': 'prepare-eproc-tec'
    }],
    'Prepared TEC for Vetting' : [{
      'stage': 'TEC Date',
      'link': 'record-eproc-tec-date'
    }],
    'Prepared TEC' : [{
      'stage': 'TEC Template',
      'link': 'prepare-eproc-tec'
    },
    {
      'stage': 'Qualify Vendors',
      'link': 'qualify-eproc-vendors'
    },
    {
      'stage': 'Prepare Clarrifications',
      'link': 'prepare-clarrification-letters'
    },
    {
      'stage' : 'Finance Bid Evaluation Committe Report',
      'link': 'prepare-eproc-fbecr'
    }]
  };

  sqmenustages = {
    'Recieved SpotQuotation Proposal':[
      {
        'stage': 'Edit Details',
        'link': 'edit-sq-details'
      },
      {
        'stage': 'Create Spot Enquiry',
        'link': 'create-sqenquiry'
      }
    ],
    'Spot Enquiry Prepared for Vetting': [
      {
        'stage': 'Edit Details',
        'link': 'edit-sq-details'
      },
      {
        'stage': 'TEC Report',
        'link': 'create-sq-tecreport'
      }],
  };

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
    },
    'LTE' : this.ltemenustages,
    'LTE-eproc' : this.lteeprocmenustages,
    'SpotQuotation' : this.sqmenustages
  };

  nextstageMenu = [];

  constructor(private route: ActivatedRoute, public ds: DetailsserviceService) { }

  ngOnInit() {
    this.loaded = false;
    this.route.paramMap.subscribe(params => {
      this.indentNo = params.get('indentno');
      this.tendersubject =params.get('tendersubject');
    });
    this.ds.getbiddetails({'indent_no':this.indentNo}).subscribe(
      data => {
        this.ds.biddetails = data;
        this.bid = data;
        console.log(this.bid);
        this.nextstageMenu = this.menustages[this.bid.BidType][this.bid.BidStatus];
        this.loaded = true;
      }
    );
  }


}
