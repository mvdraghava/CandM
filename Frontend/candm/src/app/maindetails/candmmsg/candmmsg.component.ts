import { Component, OnInit } from '@angular/core';
import { DetailsserviceService } from '../detailsservice.service';


@Component({
  selector: 'app-candmmsg',
  templateUrl: './candmmsg.component.html',
  styleUrls: ['./candmmsg.component.css']
})
export class CandmmsgComponent implements OnInit {

  stages = ['Approved Note', 'Spot Enquiry' , 'TEC Committee Reports', 'Clarrifications', 'LOA/PO',
              'fsdfajsdlfkjak 1 ',
              'fsdfajsdlfkjak 1 ',
              'fsdfajsdlfkjak 1 ',
              'fsdfajsdlfkjak 1 ',
              'fsdfajsdlfkjak 1 ',
              'fsdfajsdlfkjak 1 ',
              'fsdfajsdlfkjak 1 ',
              'fsdfajsdlfkjak 1 ',
              'fsdfajsdlfkjak 1 ',
              'fsdfajsdlfkjak 1 ',];
  mainStages = [0,5,7,9,10];
  presentStage = 10;
  constructor(private ds: DetailsserviceService) { }
  subject = "";
  ngOnInit() {
    this.subject = this.ds.biddetails.TenderSubject;
    console.log(this.subject);
  }


}
