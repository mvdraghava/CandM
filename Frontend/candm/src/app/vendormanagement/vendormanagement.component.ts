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

  get_vendors() {
    this.vs.getvendors().subscribe(
      data => {
        this.allvendors = data;
      }
    );
  }

  constructor(private vs: VendorserviceService) { }

  ngOnInit() {
    this.get_vendors();
  }

}
