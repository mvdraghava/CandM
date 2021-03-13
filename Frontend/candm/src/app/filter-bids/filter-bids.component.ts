import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, AfterViewInit } from '@angular/core';

import { Bid } from '../bid-data-type';
import { VendorFieldComponent } from './../formcomponents-module/vendor-field/vendor-field.component';
import { departments, optionsformodeofProcurments } from './../globalvariables';

@Component({
  selector: 'app-filter-bids',
  templateUrl: './filter-bids.component.html',
  styleUrls: ['./filter-bids.component.css']
})
export class FilterBidsComponent implements OnInit, OnChanges, AfterViewInit {
  
  
  filterBid = new Bid();
  @ViewChild(VendorFieldComponent)
  private vendor: VendorFieldComponent;
  @Input() allbids: Bid[] = [];

  indentdepts: string[] = [];
  bidtypes: string[] = [];
  bidstatuses: string[] = [];
  filteredbids: Bid[] = [];
  greaterValue: number;
  departments = departments;
  optionsformodeofProcurments = optionsformodeofProcurments;

  @Output() emitDisplayBids = new EventEmitter<Bid[]>();

  get diagnostic() { return JSON.stringify(this.filterBid); }
  constructor() { }

  sendDisplayBids() {
    this.filteredbids = this.allbids.filter(bid => {
      if (this.filterBid.Indentno ? bid.Indentno === this.filterBid.Indentno : true &&
        bid.TenderSubject.toLowerCase().includes(this.filterBid.TenderSubject.toLowerCase()) &&
        bid.IndentDepartment.toLowerCase().includes(this.filterBid.IndentDepartment.toLowerCase()) &&
        bid.BidStatus.toLowerCase().includes(this.filterBid.BidStatus.toLowerCase()) &&
        bid.BidType.toLowerCase().includes(this.filterBid.BidType.toLowerCase()) &&
        (this.vendor.inputVendor.value.id? bid.AwardedVendor.id == this.vendor.inputVendor.value.id : true) &&
        (this.greaterValue ? bid.AwardedAmount >= this.greaterValue : true)) {
        return true;
      } else {
        return false;
      }
    } );
    this.emitDisplayBids.emit(this.filteredbids);
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.allbids) {
      this.allbids.map(bid => {
        if (this.indentdepts.indexOf(bid.IndentDepartment) === -1) {
          this.indentdepts.push(bid.IndentDepartment);
        }
        if (this.bidtypes.indexOf(bid.BidType) === -1) {
          this.bidtypes.push(bid.BidType);
        }
        if (this.bidstatuses.indexOf(bid.BidStatus) === -1) {
          this.bidstatuses.push(bid.BidStatus);
        }
      });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.vendor.inputVendor.valueChanges.subscribe(selectedvendor => {
        this.sendDisplayBids()
      });
    });
  }

  formatLabel(value: number) {
    if (value >= 10000000){
      return Math.round(value / 10000000) + 'cr';
    }else if (value >= 100000) {
      return Math.round(value / 100000) + 'L';
    }else if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

}
