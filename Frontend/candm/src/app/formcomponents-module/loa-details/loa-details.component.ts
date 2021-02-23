import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder,
   FormGroup,
   FormControl,
   Validators,
   ReactiveFormsModule,
   FormsModule } from '@angular/forms';
import { awardtypes, cpgtypes } from './../../globalvariables';
import { VendorFieldComponent } from './../vendor-field/vendor-field.component';

@Component({
  selector: 'app-loa-details',
  templateUrl: './loa-details.component.html',
  styleUrls: ['./loa-details.component.css']
})
export class LoaDetailsComponent implements OnInit, AfterViewInit {

  @ViewChild(VendorFieldComponent)
  private vendor: VendorFieldComponent;
  awardtypes = awardtypes;
  cpgtypes = cpgtypes;
  constructor(private fb: FormBuilder) { }
  loaDetails;
  ngOnInit(): void {
    this.loaDetails = this.fb.group({
      typeofaward : ['', Validators.required],
      award_ref : ['', Validators.required],
      award_date : ['', Validators.required],
      contract_start_date : ['', Validators.required],
      contract_end_date : ['' , Validators.required],
      cpg : ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loaDetails.addControl('awardedVendor', this.vendor.inputVendor);
    });
  }

}
