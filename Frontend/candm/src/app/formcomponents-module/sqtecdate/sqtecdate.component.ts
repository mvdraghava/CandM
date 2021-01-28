import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sqtecdate',
  templateUrl: './sqtecdate.component.html',
  styleUrls: ['./sqtecdate.component.css']
})
export class SqtecdateComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  tecDate = new FormControl('', Validators.required)
  ngOnInit(): void {
  }

}
