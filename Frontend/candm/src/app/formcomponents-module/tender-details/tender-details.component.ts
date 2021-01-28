import {
        Component,
        OnInit,
        Input,
      } from '@angular/core';
import { FormBuilder,
         FormGroup,
         FormControl,
         Validators,
         ReactiveFormsModule,
         FormsModule } from '@angular/forms';
import { departments, tendercategories, contracttypes,
                  productcategories } from './../../globalvariables';

@Component({
  selector: 'app-tender-details',
  templateUrl: './tender-details.component.html',
  styleUrls: ['./tender-details.component.css']
})
export class TenderDetailsComponent implements OnInit {
  departments = departments;
  productcategories = productcategories;
  tendercategories = tendercategories;
  contracttypes = contracttypes;
  constructor(private fb: FormBuilder) { }
  tenderDetails;
  times = ['Days', 'Months', 'Years'];
  @Input() eproc = true;
  ngOnInit(): void {
    this.tenderDetails = this.fb.group({
      indent_no : ['', Validators.required],
      subject: ['', Validators.required],
      eproc_no: [this.eproc, Validators.required],
      tendertype : ['', Validators.required],
      contracttype : ['', Validators.required],
      productcategory : ['', Validators.required],
      completionperiod: ['', Validators.required],
      durationmeasured: ['', Validators.required],
    });
  }

  contractdelivery() {
    if (this.tenderDetails.controls.tendertype.value === 'Goods') {
      return 'Delivery';
    } else {
      return 'Contract';
    }
  }

}
