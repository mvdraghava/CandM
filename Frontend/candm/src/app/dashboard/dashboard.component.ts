import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items = [
    "Running Contracts",
    "Bid Openings",
    "KPI Endings",
    "CPG Followups",
    "LOA Ackowledgment followups"
  ]
  constructor() { }

  ngOnInit() {
  }

}
