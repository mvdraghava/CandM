import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SqtecdateComponent } from '../../formcomponents-module/sqtecdate/sqtecdate.component';
import { DetailsserviceService } from '../detailsservice.service';

@Component({
  selector: 'app-sq-tec-date',
  templateUrl: './sq-tec-date.component.html',
  styleUrls: ['./sq-tec-date.component.css']
})
export class SqTecDateComponent implements OnInit, AfterViewInit {

  @ViewChild(SqtecdateComponent)
  private sqtecDate: SqtecdateComponent;
  constructor(private fb: FormBuilder,
              private router: Router,
              public ds: DetailsserviceService,) { }
  tecdateForm = this.fb.group({});
  ablesubmit = false;
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.tecdateForm.addControl('tecDate', this.sqtecDate.tecDate);
    });
  }

  updateTecDate() {
    console.log(this.tecdateForm);
    this.ablesubmit = true;
    this.ds.updateSqTecDate(this.tecdateForm.value).subscribe(
      data => {
        window.alert('Updated TEC Date');
      },
      error => {
        window.alert('Some Error has occured');
        this.ablesubmit = false;
      }
    );
  }

}
