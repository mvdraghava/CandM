import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-participatedvendordetails',
  templateUrl: './participatedvendordetails.component.html',
  styleUrls: ['./participatedvendordetails.component.css']
})
export class ParticipatedvendordetailsComponent implements OnInit {


  @Input() ParticipatedVendors;
//   ParticipatedVendors = [
//   {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
//   {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
//   {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
//   {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
//   {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
//   {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
//   {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
//   {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
//   {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
//   {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
// ];
  constructor() { }

  ngOnInit(): void {
    this.dataSource = this.ParticipatedVendors;
  }

  displayedColumns: string[] = ['vendorname', 'quotedvalue', 'status', 'remarks'];
  dataSource = this.ParticipatedVendors;

}
