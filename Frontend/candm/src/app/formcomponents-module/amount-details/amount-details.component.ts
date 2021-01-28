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
@Component({
  selector: 'app-amount-details',
  templateUrl: './amount-details.component.html',
  styleUrls: ['./amount-details.component.css']
})
export class AmountDetailsComponent implements OnInit {

  @Input() emdtender = true;

  amountDetails = this.fb.group({
    estCost: ['', Validators.required],
    gstIncl: ['', Validators.required],
    emdwaivedoff : [this.emdtender, Validators.required]
  });

  gstOptions = [
    {
      name : 'GST Inclusive',
      value: true
    },
    {
      name: 'GST Exclusive',
      value: false
    }
  ];

  emdOptions = [
    {
      name: 'Collect EMD',
      value: true
    },
    {
      name: 'Waive Off EMD',
      value: false
    }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
