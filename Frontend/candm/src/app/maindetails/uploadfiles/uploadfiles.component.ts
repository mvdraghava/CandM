import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-uploadfiles',
  templateUrl: './uploadfiles.component.html',
  styleUrls: ['./uploadfiles.component.css']
})
export class UploadfilesComponent implements OnInit {

  constructor(private router: Router,
  private route: ActivatedRoute) { }

  ngOnInit() {
  }

  gotoshowfiles() {
    console.log(this.route.parent);
    this.router.navigate(['showfiles'], {relativeTo: this.route.parent});
  }

}
