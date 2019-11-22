import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Vendor } from '../vendor';

@Component({
  selector: 'app-displayvendors',
  templateUrl: './displayvendors.component.html',
  styleUrls: ['./displayvendors.component.css']
})
export class DisplayvendorsComponent implements OnInit, OnChanges{

  @Input() allVendors: Array<Vendor>;
  displayvendors: Array<Vendor> = [];
  vendorsDisplayed = 0;

  constructor() { }

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

}
