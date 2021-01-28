import { Component, OnInit } from '@angular/core';

import { VendorserviceService } from './vendorservice.service';
import { Vendor } from './vendor';

import { AddvendordialogComponent } from './addvendordialog/addvendordialog.component';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
        this.displayvendors = data;
      }
    );
  }

  changeDisplayVendors(filteredVendors:Vendor[]){
    this.displayvendors = filteredVendors;
  }

  constructor(private vs: VendorserviceService, public dialog : MatDialog) { }

  ngOnInit() {
    this.get_vendors();
  }

  AddDialog(): void {
    const dialogRef = this.dialog.open(AddvendordialogComponent, {
      width: '1080px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if(result){
          this.get_vendors();
        }

      }
    );
  }

}
