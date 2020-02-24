import { Component, OnInit } from '@angular/core';
import { CreateTenderService } from '../../create-tender.service';
import {DetailsserviceService} from '../detailsservice.service';
@Component({
  selector: 'app-eproc-tec',
  templateUrl: './eproc-tec.component.html',
  styleUrls: ['./eproc-tec.component.css']
})
export class EprocTecComponent implements OnInit {
  pbvendors = [];
  constructor(private cts: CreateTenderService,private ds: DetailsserviceService) { }

  ngOnInit() {
  }

}
