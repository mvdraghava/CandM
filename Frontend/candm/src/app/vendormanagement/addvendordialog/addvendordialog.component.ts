import { Component, OnInit, Inject } from '@angular/core';

import { VendorserviceService } from '../vendorservice.service';

import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-addvendordialog',
  templateUrl: './addvendordialog.component.html',
  styleUrls: ['./addvendordialog.component.css']
})
export class AddvendordialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddvendordialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}, private fb: FormBuilder,
    private vs: VendorserviceService) { }

  ngOnInit() {
  }

  addVendorForm = this.fb.group({
    products: this.fb.array([['']]),
    services: this.fb.array([['']]),
    works : this.fb.array([['']]),
    mobilenos: this.fb.array([['']]),
    emailids : this.fb.array([['']]),
    msme : ['',Validators.required],
    nsic : ['',Validators.required],
    address: this.fb.group({
      name: ['', Validators.required],
      street1 : ['',Validators.required],
      street2 : [''],
      city    : ['',Validators.required],
      state   : ['',Validators.required],
      pincode : ['',Validators.required]
    })
  });

  get products() {
    return this.addVendorForm.get('products') as FormArray;
  }

  get services() {
    return this.addVendorForm.get('services') as FormArray;
  }

  get mobilenos() {
    return this.addVendorForm.get('mobilenos') as FormArray;
  }

  get works() {
    return this.addVendorForm.get('works') as FormArray;
  }

  get emailids() {
    return this.addVendorForm.get('emailids') as FormArray;
  }

  addProduct() {
    this.products.push(new FormControl(''));
  }

  addService() {
    this.services.push(new FormControl(''));
  }

  addMobileno() {
    this.mobilenos.push(new FormControl(''));
  }

  addWork() {
    this.works.push(new FormControl(''));
  }

  addEmailid() {
    this.emailids.push(new FormControl(''));
  }

  removeProduct(remove_index: number){
    this.products.removeAt(remove_index);
  }

  removeService(remove_index: number){
    this.services.removeAt(remove_index);
  }

  removeMobileno(remove_index: number){
    this.mobilenos.removeAt(remove_index);
  }

  removeEmailid(remove_index: number){
    this.emailids.removeAt(remove_index);
  }

  removeWork(remove_index: number){
    this.works.removeAt(remove_index);
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    if (!this.addVendorForm.valid){
      this.addVendorForm.markAllAsTouched();
      window.scrollTo(0, 0);
    } else {
      //take action
      this.vs.addvendor(this.addVendorForm.value).subscribe(
        data => {
          if(data && !data['created']){
            window.alert('Some Error has occured');
          }
          else{
            this.dialogRef.close();
          }
        },
        error => {
          this.dialogRef.close();
        }
      );
    }
  }


}
