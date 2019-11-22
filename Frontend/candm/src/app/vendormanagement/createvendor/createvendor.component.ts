import { Component, OnInit } from '@angular/core';

import { AddvendordialogComponent } from '../addvendordialog/addvendordialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-createvendor',
  templateUrl: './createvendor.component.html',
  styleUrls: ['./createvendor.component.css']
})
export class CreatevendorComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    const dialogRef = this.dialog.open(AddvendordialogComponent, {
      width: '1080px',
      data: {}
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddvendordialogComponent, {
      width: '1080px',
      data: {}
    });
  }

}
