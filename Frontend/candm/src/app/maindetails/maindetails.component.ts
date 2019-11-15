import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-maindetails',
  templateUrl: './maindetails.component.html',
  styleUrls: ['./maindetails.component.css']
})
export class MaindetailsComponent implements OnInit {

  indentNo: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.indentNo = params.get('indentno');
    })
  }

}
