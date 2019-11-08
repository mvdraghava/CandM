import { Component, OnInit, Input } from '@angular/core';

import { Bid } from '../bid-data-type';

@Component({
  selector: 'app-display-bids',
  templateUrl: './display-bids.component.html',
  styleUrls: ['./display-bids.component.css']
})
export class DisplayBidsComponent implements OnInit {

  @Input() allBids: Array<Bid>;

  arrayOne(n: number): any[] {
    return Array(n);
  }

  constructor() { }

  ngOnInit() {
  }

}
