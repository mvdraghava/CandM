import { Component, OnInit, Input, OnChanges} from '@angular/core';

import { Bid } from '../bid-data-type';

@Component({
  selector: 'app-display-bids',
  templateUrl: './display-bids.component.html',
  styleUrls: ['./display-bids.component.css']
})
export class DisplayBidsComponent implements OnInit, OnChanges{

  @Input() allBids: Array<Bid>;
  displaybids: Array<Bid> = [];
  bidsDisplayed = 0;


  arrayOne(n: number): any[] {
    return Array(n);
  }

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.allBids) {
      if (this.allBids.length > 10) {
        this.bidsDisplayed = 10;
      } else {
        this.bidsDisplayed = this.allBids.length;
      }
      this.displaybids = this.allBids.slice(0, this.bidsDisplayed);
    }
  }

  onScroll() {
    this.bidsDisplayed += 10;
    if (this.bidsDisplayed > this.allBids.length){
      this.bidsDisplayed = this.allBids.length;
    }
    this.displaybids = this.allBids.slice(0, this.bidsDisplayed);
  }

}
