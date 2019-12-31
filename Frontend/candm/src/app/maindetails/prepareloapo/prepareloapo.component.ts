import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import { Vendor } from './vendor';
import { Employee } from '../employee';
import {map, startWith} from 'rxjs/operators';
import { saveAs } from 'file-saver';
import {DetailsserviceService} from '../detailsservice.service';

@Component({
  selector: 'app-prepareloapo',
  templateUrl: './prepareloapo.component.html',
  styleUrls: ['./prepareloapo.component.css']
})
export class PrepareloapoComponent implements OnInit {

  vendors: Vendor[] = [];
  loaFilteredVendors: Observable<Vendor[]>;
  indentNo = 0;
  loapoform = this.fb.group({
    indentNo: [this.indentNo],
    loaapproveddate: ['',Validators.required],
    typeofaward : ['LOA',Validators.required],
    loapono : ['',Validators.required],
    awardvendor : ['',Validators.required],
    awardamount : ['',Validators.required],
    awardgstincl : ['',Validators.required],
    specialconditions : ['',Validators.required],
    ndaclause : ['',Validators.required],
    saclause : ['',Validators.required],
    cpgclause : ['',Validators.required],
    gcc : this.fb.group({
      scopeofwork: [true,Validators.required],
      scopeofworkText: [{value:'',disabled:false},Validators.required],
      emd : [false,Validators.required],
      emdText  : [''],
      paymentterms: [true,Validators.required],
      paymenttermsText: [''],
      contractperiod: [false,Validators.required],
      contractperiodText: [''],
      deliveryperiod: [false, Validators.required],
      delivaryperiodText: [''],
      pricebasis: [true,Validators.required],
      pricebasisText: [''],
      validity: [true, Validators.required],
      validityText: [''],
      taxesandduties : [true,Validators.required],
      taxesanddutiestext: [''],
      warranty : [true,Validators.required],
      warrantyText : [''],
      cpg : [true,Validators.required],
      cpgText : [''],
      sd : [true,Validators.required],
      sdText : [''],
      ld : [true,Validators.required],
      ldText : [''],
      qv : [true,Validators.required],
      qvText : [''],
      arbitration : [true,Validators.required],
      arbitrationText : [''],
      officerincharge : [true,Validators.required],
      officerinchargeText : [''],
    })
  });

  setgeneralconditions() {
    if(this.ds.biddetails.tendertype == 'supply'){
      this.loapoform.controls.typeofaward.setValue('PO');
    }
    this.loapoform.controls.gcc.controls.scopeofwork.setValue(this.ds.biddetails.nitgcc.scopeofwork);
    this.loapoform.controls.gcc.controls.scopeofworkText.setValue(this.ds.biddetails.nitgcc.scopeofworkText);
    this.loapoform.controls.gcc.controls.emd.setValue(this.ds.biddetails.nitgcc.emd);
    this.loapoform.controls.gcc.controls.emdText.setValue(this.ds.biddetails.nitgcc.emdText);
    this.loapoform.controls.gcc.controls.paymentterms.setValue(this.ds.biddetails.nitgcc.paymentterms);
    this.loapoform.controls.gcc.controls.paymenttermsText.setValue(this.ds.biddetails.nitgcc.paymenttermsText);
    this.loapoform.controls.gcc.controls.contractperiod.setValue(this.ds.biddetails.nitgcc.contractperiod);
    this.loapoform.controls.gcc.controls.contractperiodText.setValue(this.ds.biddetails.nitgcc.contractperiodText);
    this.loapoform.controls.gcc.controls.deliveryperiod.setValue(this.ds.biddetails.nitgcc.deliveryperiod);
    this.loapoform.controls.gcc.controls.delivaryperiodText.setValue(this.ds.biddetails.nitgcc.delivaryperiodText);
    this.loapoform.controls.gcc.controls.pricebasis.setValue(this.ds.biddetails.nitgcc.pricebasis);
    this.loapoform.controls.gcc.controls.pricebasisText.setValue(this.ds.biddetails.nitgcc.pricebasisText);
    this.loapoform.controls.gcc.controls.validity.setValue(this.ds.biddetails.nitgcc.validity);
    this.loapoform.controls.gcc.controls.validityText.setValue(this.ds.biddetails.nitgcc.validityText);
    this.loapoform.controls.gcc.controls.taxesandduties.setValue(this.ds.biddetails.nitgcc.taxesandduties);
    this.loapoform.controls.gcc.controls.taxesanddutiestext.setValue(this.ds.biddetails.nitgcc.taxesanddutiestext);
    this.loapoform.controls.gcc.controls.warranty.setValue(this.ds.biddetails.nitgcc.warranty);
    this.loapoform.controls.gcc.controls.warrantyText.setValue(this.ds.biddetails.nitgcc.warrantyText);
    this.loapoform.controls.gcc.controls.cpg.setValue(this.ds.biddetails.nitgcc.cpg);
    this.loapoform.controls.gcc.controls.cpgText.setValue(this.ds.biddetails.nitgcc.cpgText);
    this.loapoform.controls.gcc.controls.sd.setValue(this.ds.biddetails.nitgcc.sd);
    this.loapoform.controls.gcc.controls.sdText.setValue(this.ds.biddetails.nitgcc.sdText);
    this.loapoform.controls.gcc.controls.ld.setValue(this.ds.biddetails.nitgcc.ld);
    this.loapoform.controls.gcc.controls.ldText.setValue(this.ds.biddetails.nitgcc.ldText);
    this.loapoform.controls.gcc.controls.qv.setValue(this.ds.biddetails.nitgcc.qvText);
    this.loapoform.controls.gcc.controls.arbitration.setValue(this.ds.biddetails.nitgcc.arbitration);
    this.loapoform.controls.gcc.controls.arbitrationText.setValue(this.ds.biddetails.nitgcc.arbitrationText);
    this.loapoform.controls.gcc.controls.officerincharge.setValue(this.ds.biddetails.nitgcc.officerincharge);
    this.loapoform.controls.gcc.controls.officerinchargeText.setValue(this.ds.biddetails.nitgcc.officerinchargeText);
  }

  paymentChanged(){
    if(this.loapoform.controls.gcc.controls.scopeofwork.value) {
      this.loapoform.controls.gcc.get('scopeofworkText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('scopeofworkText').disable();
    }
    if(this.loapoform.controls.gcc.controls.emd.value) {
      this.loapoform.controls.gcc.get('emdText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('emdText').disable();
    }
    if(this.loapoform.controls.gcc.controls.paymentterms.value) {
      this.loapoform.controls.gcc.get('paymenttermsText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('paymenttermsText').disable();
    }
    if(this.loapoform.controls.gcc.controls.contractperiod.value) {
      this.loapoform.controls.gcc.get('contractperiodText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('contractperiodText').disable();
    }
    if(this.loapoform.controls.gcc.controls.deliveryperiod.value) {
      this.loapoform.controls.gcc.get('delivaryperiodText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('delivaryperiodText').disable();
    }
    if(this.loapoform.controls.gcc.controls.pricebasis.value) {
      this.loapoform.controls.gcc.get('pricebasisText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('pricebasisText').disable();
    }
    if(this.loapoform.controls.gcc.controls.validity.value) {
      this.loapoform.controls.gcc.get('validityText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('validityText').disable();
    }
    if(this.loapoform.controls.gcc.controls.taxesandduties.value) {
      this.loapoform.controls.gcc.get('taxesanddutiestext').enable();
    }
    else{
      this.loapoform.controls.gcc.get('taxesanddutiestext').disable();
    }
    if(this.loapoform.controls.gcc.controls.warranty.value) {
      this.loapoform.controls.gcc.get('warrantyText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('warrantyText').disable();
    }
    if(this.loapoform.controls.gcc.controls.cpg.value) {
      this.loapoform.controls.gcc.get('cpgText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('cpgText').disable();
    }
    if(this.loapoform.controls.gcc.controls.sd.value) {
      this.loapoform.controls.gcc.get('sdText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('sdText').disable();
    }
    if(this.loapoform.controls.gcc.controls.ld.value) {
      this.loapoform.controls.gcc.get('ldText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('ldText').disable();
    }
    if(this.loapoform.controls.gcc.controls.qv.value) {
      this.loapoform.controls.gcc.get('qvText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('qvText').disable();
    }
    if(this.loapoform.controls.gcc.controls.arbitration.value) {
      this.loapoform.controls.gcc.get('arbitrationText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('arbitrationText').disable();
    }
    if(this.loapoform.controls.gcc.controls.officerincharge.value) {
      this.loapoform.controls.gcc.get('officerinchargeText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('officerinchargeText').disable();
    }
  }

  constructor(private fb: FormBuilder, private ds: DetailsserviceService) { }

  ngOnInit() {
    this.vendors = this.ds.biddetails.participatedvendors;
    this.loaFilteredVendors = this.loapoform.controls.awardvendor.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterVendors(name) : this.vendors.slice())
    );
    this.indentNo = this.ds.biddetails.Indentno;
    this.loapoform.controls.indentNo.setValue(this.indentNo);
    this.setgeneralconditions();
    this.paymentChanged();
  }

  displayFnvendor(vendor?: Vendor): String | undefined {
    return vendor ? vendor.name : undefined;
  }
  private _filterVendors(value: string): Vendor[] {
    const filterValue = value.toLowerCase();

    return this.vendors.filter(vendor => vendor.name.toLowerCase().includes(filterValue));
  }

}
