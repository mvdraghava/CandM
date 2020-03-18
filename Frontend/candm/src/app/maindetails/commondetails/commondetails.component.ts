import { Component, OnInit } from '@angular/core';
import { DetailsserviceService } from '../detailsservice.service';

@Component({
  selector: 'app-commondetails',
  templateUrl: './commondetails.component.html',
  styleUrls: ['./commondetails.component.css']
})
export class CommondetailsComponent implements OnInit {

  constructor(public ds: DetailsserviceService) { }

  ngOnInit() {
  }

}
