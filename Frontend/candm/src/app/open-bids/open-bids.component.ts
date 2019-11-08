import { Component, OnInit } from '@angular/core';

import { GetopenbidsService } from './getopenbids.service';

import { Bid } from '../bid-data-type';

@Component({
  selector: 'app-open-bids',
  templateUrl: './open-bids.component.html',
  styleUrls: ['./open-bids.component.css']
})
export class OpenBidsComponent implements OnInit {

  allbids: Array<Bid>;

  constructor(private openbidservice: GetopenbidsService) { }

  ngOnInit() {
    this.openbidservice.getopenbids().subscribe(
      response => {
        this.allbids = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
