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
  selector: 'app-generic-amount',
  templateUrl: './generic-amount.component.html',
  styleUrls: ['./generic-amount.component.css']
})
export class GenericAmountComponent implements OnInit {

  @Input() heading = "Amount";
  @Input() amountPlaceholder = "Amount";
  amountDetails = this.fb.group({
    cost: ['', Validators.required],
    gstIncl: ['', Validators.required],
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
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
