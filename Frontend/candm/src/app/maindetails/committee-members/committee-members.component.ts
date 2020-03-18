import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-committee-members',
  templateUrl: './committee-members.component.html',
  styleUrls: ['./committee-members.component.css']
})
export class CommitteeMembersComponent implements OnInit {

  CommitteeMembers = [
  {name: 'AADDFFF', designation: 'Sr.Gm', department:'C&M'},
  {name: 'AADDFFF', designation: 'AM', department:'MO'},
  {name: 'AADDFFF', designation: 'CM', department:'SO'},
  {name: 'AADDFFF', designation: 'DM', department:'SL'},
  // {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
  // {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
  // {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
  // {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
  // {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
  // {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
  // {vendorname: 'AADDFFF', quotedvalue: 1256325, status:'L1', remarks: 'fghdfjgh fgfdghjdfs fghsdhf g'},
];
  constructor() { }
  displayedColumns: string[] = ['name', 'designation', 'department'];
  dataSource = this.CommitteeMembers;
  ngOnInit(): void {
  }

}
