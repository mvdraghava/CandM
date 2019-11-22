import { Component, OnInit } from '@angular/core';

import { VendorserviceService } from './vendorservice.service';
import { Vendor } from './vendor';

@Component({
  selector: 'app-vendormanagement',
  templateUrl: './vendormanagement.component.html',
  styleUrls: ['./vendormanagement.component.css']
})
export class VendormanagementComponent implements OnInit {

  allvendors: Array<Vendor> = [];
  displayvendors: Array<Vendor> = [];

  constructor(private vs: VendorserviceService) { }

  ngOnInit() {
    this.vs.getvendors().subscribe(
      data => {
        this.allvendors = data;
      }
    );
  }

}
