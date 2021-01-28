import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-genericloapo',
  templateUrl: './genericloapo.component.html',
  styleUrls: ['./genericloapo.component.css']
})
export class GenericloapoComponent implements OnInit {

  items = [
    "Details 1 :- type of award, loa number, loa approved date, loa date, loa vendor , loa amount details",
    "Details 2 :- include various annexures",
    "Details 3 :- Loa/Po conditions"
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
