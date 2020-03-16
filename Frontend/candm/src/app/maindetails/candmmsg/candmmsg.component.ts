import { Component, OnInit } from '@angular/core';
import { DetailsserviceService } from '../detailsservice.service';


@Component({
  selector: 'app-candmmsg',
  templateUrl: './candmmsg.component.html',
  styleUrls: ['./candmmsg.component.css']
})
export class CandmmsgComponent implements OnInit {


  constructor(private ds: DetailsserviceService) { }
  subject = "";
  ngOnInit() {
    this.subject = this.ds.biddetails.TenderSubject;
    console.log(this.subject);
  }


}
