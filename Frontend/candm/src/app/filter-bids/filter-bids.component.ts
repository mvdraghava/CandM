import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { Bid } from '../bid-data-type';
import { SinglevendorComponent } from './../formcomponents-module/singlevendor/singlevendor.component';

@Component({
  selector: 'app-filter-bids',
  templateUrl: './filter-bids.component.html',
  styleUrls: ['./filter-bids.component.css']
})
export class FilterBidsComponent implements OnInit, OnChanges {
  filterBid = new Bid();

  @Input() allbids: Bid[] = [];

  indentdepts: string[] = [];
  bidtypes: string[] = [];
  bidstatuses: string[] = [];
  filteredbids: Bid[] = [];

  @Output() emitDisplayBids = new EventEmitter<Bid[]>();

  get diagnostic() { return JSON.stringify(this.filterBid); }
  constructor() { }

  sendDisplayBids() {
    this.filteredbids = this.allbids.filter(bid => {
      if (this.filterBid.Indentno ? bid.Indentno === this.filterBid.Indentno : true &&
        bid.TenderSubject.toLowerCase().includes(this.filterBid.TenderSubject.toLowerCase()) &&
        bid.IndentDepartment.toLowerCase().includes(this.filterBid.IndentDepartment.toLowerCase()) &&
        bid.BidStatus.toLowerCase().includes(this.filterBid.BidStatus.toLowerCase()) &&
        bid.BidType.toLowerCase().includes(this.filterBid.BidType.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    } );
    this.emitDisplayBids.emit(this.filteredbids);
    console.log('sent bids');
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

}
