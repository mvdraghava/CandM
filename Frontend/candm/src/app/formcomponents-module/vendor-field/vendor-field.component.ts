import { Component, OnInit, Input } from '@angular/core';
import { FormsModule,
          ReactiveFormsModule,
          FormGroup,
          FormBuilder,
          FormControl,
          FormArray,
          Validators
} from '@angular/forms';
import { Vendor } from '../../vendor';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { CreateTenderService } from './../../create-tender.service';
@Component({
  selector: 'app-vendor-field',
  templateUrl: './vendor-field.component.html',
  styleUrls: ['./vendor-field.component.css']
})
export class VendorFieldComponent implements OnInit {
  vendors: Vendor[] = [];
  FilteredVendors: Observable<Vendor[]>;
  @Input() vnLabel: string;
  public inputVendor = new FormControl('', {
    validators: [this.validateVendor]
  });

  constructor(private cts: CreateTenderService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cts.getvendors().subscribe(
      data => {
        this.vendors = data;
        this.FilteredVendors = this.inputVendor.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filterVendors(name) : this.vendors.slice())
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  private _filterVendors(value: string): Vendor[] {
    const filterValue = value.toLowerCase();

    return this.vendors.filter(vendor => vendor.name.toLowerCase().includes(filterValue));
  }

  displayFnvendor(vendor?: Vendor): String | undefined {
    return vendor ? vendor.name : undefined;
  }

  validateVendor(c: FormControl) {
    return c.value.id ? null : {
      validateVendor: {
        valid: false
      }
    };
  }

}
