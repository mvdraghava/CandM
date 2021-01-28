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
import { AddvendordialogComponent } from './../../vendormanagement/addvendordialog/addvendordialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-singlevendor',
  templateUrl: './singlevendor.component.html',
  styleUrls: ['./singlevendor.component.css']
})
export class SinglevendorComponent implements OnInit {

  vendors: Vendor[] = [];
  FilteredVendors: Observable<Vendor[]>;

  @Input() vendorLabel: string;

  public vendor = new FormControl('', {
    validators: [this.validateVendor, Validators.required]
  });
  constructor(private cts: CreateTenderService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetVendors();
  }

  GetVendors() {
    this.cts.getvendors().subscribe(
      data => {
        this.vendors = data;
        this.FilteredVendors = this.vendor.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filterVendors(name) : this.vendors.slice())
        );
      }
    );
  }

  displayFnvendor(vendor?: Vendor): String | undefined {
    return vendor ? vendor.name : undefined;
  }

  private _filterVendors(value: string): Vendor[] {
    const filterValue = value.toLowerCase();
    return this.vendors.filter(vendor => vendor.name.toLowerCase().includes(filterValue));
  }

  validateVendor(c: FormControl) {
    return c.value.id ? null : {
      validateVendor: {
        valid: false
      }
    };
  }

  AddDialog(): void {
    const dialogRef = this.dialog.open(AddvendordialogComponent, {
      width: '1080px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.GetVendors();
        }
      }
    );
  }

}
