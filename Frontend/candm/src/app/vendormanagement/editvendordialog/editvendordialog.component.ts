import { Component, OnInit, Inject } from '@angular/core';

import { VendorserviceService } from '../vendorservice.service';

import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';

import { Vendor } from '../vendor';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-editvendordialog',
  templateUrl: './editvendordialog.component.html',
  styleUrls: ['./editvendordialog.component.css']
})
export class EditvendordialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditvendordialogComponent>,
    @Inject(MAT_DIALOG_DATA) public vendor: Vendor, private fb: FormBuilder,
    private vs: VendorserviceService) { }

  ngOnInit() {
  }

  editVendorForm = this.fb.group({
    products: this.fb.array(this.vendor.products),
    services: this.fb.array(this.vendor.services),
    works : this.fb.array(this.vendor.works),
    mobilenos: this.fb.array(this.vendor.mobilenos),
    emailids : this.fb.array(this.vendor.emailids),
    msme : [this.vendor.msme,Validators.required],
    nsic : [this.vendor.nsic,Validators.required],
    blacklisted : [this.vendor.blacklisted,Validators.required],
    address: this.fb.group({
      name: [this.vendor.name, Validators.required],
      street1 : [this.vendor.street1,Validators.required],
      street2 : [this.vendor.street2],
      city    : [this.vendor.city,Validators.required],
      state   : [this.vendor.state,Validators.required],
      pincode : [this.vendor.pincode,Validators.required]
    }),
    remarks : [''],
    id : [this.vendor.id]
  });

  get products() {
    return this.editVendorForm.get('products') as FormArray;
  }

  get services() {
    return this.editVendorForm.get('services') as FormArray;
  }

  get mobilenos() {
    return this.editVendorForm.get('mobilenos') as FormArray;
  }

  get works() {
    return this.editVendorForm.get('works') as FormArray;
  }

  get emailids() {
    return this.editVendorForm.get('emailids') as FormArray;
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

  edit() {
    this.vs.editvendor(this.editVendorForm.value).subscribe(
      data => {
        if(data && !data['edited']){
          window.alert('Some Error has occured');
        }
        else{
          this.dialogRef.close();
        }
      }
    );
  }


}
