import { Component, OnInit, HostListener } from '@angular/core';

import { GetopenbidsService } from './getopenbids.service';

import { Bid } from '../bid-data-type';

@Component({
  selector: 'app-open-bids',
  templateUrl: './open-bids.component.html',
  styleUrls: ['./open-bids.component.css']
})
export class OpenBidsComponent implements OnInit {

  constructor(private openbidservice: GetopenbidsService) { }

  loaded = false;
  allbids: Array<Bid>;
  displaybids: Bid[] = [];
  ngOnInit() {
    this.loaded = false;
    this.openbidservice.getopenbids().subscribe(
      response => {
        this.allbids = response;
        this.displaybids = this.allbids;
        this.loaded = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  changeDisplayBids(bids: Array<Bid>) {
    this.displaybids = bids;
  }

}
