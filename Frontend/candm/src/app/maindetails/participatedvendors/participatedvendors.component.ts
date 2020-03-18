import { Component, OnInit } from '@angular/core';
import { DetailsserviceService } from '../detailsservice.service';

@Component({
  selector: 'app-participatedvendors',
  templateUrl: './participatedvendors.component.html',
  styleUrls: ['./participatedvendors.component.css']
})
export class ParticipatedvendorsComponent implements OnInit {

  constructor(public ds: DetailsserviceService) { }
  pbvendors = [];
  ngOnInit() {
    this.ds.biddetails.participatedvendors.forEach(pbvendor => {
      this.pbvendors.push(pbvendor);
    });
  }
}
