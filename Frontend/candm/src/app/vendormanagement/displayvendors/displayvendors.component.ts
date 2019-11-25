import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { EditvendordialogComponent } from '../editvendordialog/editvendordialog.component';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Vendor } from '../vendor';

@Component({
  selector: 'app-displayvendors',
  templateUrl: './displayvendors.component.html',
  styleUrls: ['./displayvendors.component.css']
})
export class DisplayvendorsComponent implements OnInit, OnChanges{


  @Output() edited = new EventEmitter();

  @Input() allVendors: Array<Vendor>;
  displayvendors: Array<Vendor> = [];
  vendorsDisplayed = 0;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.allVendors) {
      if (this.allVendors.length > 10) {
        this.vendorsDisplayed = 10;
      } else {
        this.vendorsDisplayed = this.allVendors.length;
      }
      this.displayvendors = this.allVendors.slice(0, this.vendorsDisplayed);
    }
  }

  onScroll() {
    this.vendorsDisplayed += 10;
    if(this.vendorsDisplayed > this.allVendors.length){
      this.vendorsDisplayed = this.allVendors.length;
    }
    this.displayvendors = this.allVendors.slice(0, this.vendorsDisplayed);
  }

  openEdit(vendor: Vendor){
    const dialogRef = this.dialog.open(EditvendordialogComponent, {
      width: '1080px',
      data: vendor
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.edited.emit("Edited");
      }
    );
  }

}
