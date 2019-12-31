import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-tender',
  templateUrl: './create-tender.component.html',
  styleUrls: ['./create-tender.component.css']
})
export class CreateTenderComponent implements OnInit {
  tendermodes: string[] = ['LTE', 'LTE_Eprocurement', 'OpenTender', 'Ammendment', 'SpotQuotation', 'SingleTender', 'GeM', 'TreDs'];
  constructor() { }

  ngOnInit() {
  }

}
