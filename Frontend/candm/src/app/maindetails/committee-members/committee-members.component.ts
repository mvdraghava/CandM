import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-committee-members',
  templateUrl: './committee-members.component.html',
  styleUrls: ['./committee-members.component.css']
})
export class CommitteeMembersComponent implements OnInit {
  @Input() CommitteeMembers;
  @Input() typeCommittee;
  constructor() { }
  displayedColumns: string[] = ['name', 'designation', 'department'];
  dataSource;
  ngOnInit(): void {
    console.log(this.CommitteeMembers);
    this.dataSource = this.CommitteeMembers;
  }

}
