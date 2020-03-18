import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-participatedvendordetails',
  templateUrl: './participatedvendordetails.component.html',
  styleUrls: ['./participatedvendordetails.component.css']
})
export class ParticipatedvendordetailsComponent implements OnInit {



  ParticipatedVendors = [
  {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
  {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
  {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
  // {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
  // {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
  // {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
  // {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
  // {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
  // {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
  // {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
];
  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['vendorname', 'quotedvalue', 'status', 'remarks'];
  dataSource = this.ParticipatedVendors;

}
