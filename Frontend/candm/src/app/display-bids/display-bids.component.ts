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

  checkUrgent(bidstatus) {
    let re = RegExp('\\d{2}/\\d{2}/\\d{4}');
    let endDate = re.exec(bidstatus);
    if (endDate) {
      let dateData = endDate[0].split('/');
      let deadDate = new Date(Number(dateData[2]), Number(dateData[1])-1, Number(dateData[0]));
      let todayDate = new Date();
      let daysbetween = todayDate.getTime() - deadDate.getTime();
      daysbetween = daysbetween / (1000 * 3600 * 24);
      if (daysbetween < 3) {
        return 'urgent';
      }
    }
  }

}
