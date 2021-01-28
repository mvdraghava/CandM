import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  items = [
    "DPE Report",
    "MSME Report",
    "LOA Details Report",
    "Single Tender Report",
    "CVC Quarterly Report",
    "Single Tender Quarterly Report"
  ]

  constructor() { }

  ngOnInit() {
  }

}
