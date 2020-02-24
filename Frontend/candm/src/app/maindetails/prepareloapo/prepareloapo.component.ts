import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import { Vendor } from './../vendor';
import { Employee } from './../../employee';
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
    tecdate: ['', Validators.required],
    loaapproveddate: ['',Validators.required],
    typeofaward : ['LOA',Validators.required],
    loapono : ['',Validators.required],
    awardvendor : ['',Validators.required],
    awardamount : ['',Validators.required],
    awardgstincl : ['',Validators.required],
    specialconditions : [false,Validators.required],
    ndaclause : [false,Validators.required],
    saclause : [false,Validators.required],
    cpgclause : [false,Validators.required],
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
    this.loapoform.get('gcc')['controls'].scopeofwork.setValue(this.ds.biddetails.nitgcc.scopeofwork);
    this.loapoform.get('gcc')['controls'].scopeofworkText.setValue(this.ds.biddetails.nitgcc.scopeofworkText);
    this.loapoform.get('gcc')['controls'].emd.setValue(this.ds.biddetails.nitgcc.emd);
    this.loapoform.get('gcc')['controls'].emdText.setValue(this.ds.biddetails.nitgcc.emdText);
    this.loapoform.get('gcc')['controls'].paymentterms.setValue(this.ds.biddetails.nitgcc.paymentterms);
    this.loapoform.get('gcc')['controls'].paymenttermsText.setValue(this.ds.biddetails.nitgcc.paymenttermsText);
    this.loapoform.get('gcc')['controls'].contractperiod.setValue(this.ds.biddetails.nitgcc.contractperiod);
    this.loapoform.get('gcc')['controls'].contractperiodText.setValue(this.ds.biddetails.nitgcc.contractperiodText);
    this.loapoform.get('gcc')['controls'].deliveryperiod.setValue(this.ds.biddetails.nitgcc.deliveryperiod);
    this.loapoform.get('gcc')['controls'].delivaryperiodText.setValue(this.ds.biddetails.nitgcc.delivaryperiodText);
    this.loapoform.get('gcc')['controls'].pricebasis.setValue(this.ds.biddetails.nitgcc.pricebasis);
    this.loapoform.get('gcc')['controls'].pricebasisText.setValue(this.ds.biddetails.nitgcc.pricebasisText);
    this.loapoform.get('gcc')['controls'].taxesandduties.setValue(this.ds.biddetails.nitgcc.taxesandduties);
    this.loapoform.get('gcc')['controls'].taxesanddutiestext.setValue(this.ds.biddetails.nitgcc.taxesanddutiestext);
    this.loapoform.get('gcc')['controls'].warranty.setValue(this.ds.biddetails.nitgcc.warranty);
    this.loapoform.get('gcc')['controls'].warrantyText.setValue(this.ds.biddetails.nitgcc.warrantyText);
    this.loapoform.get('gcc')['controls'].cpg.setValue(this.ds.biddetails.nitgcc.cpg);
    this.loapoform.get('gcc')['controls'].cpgText.setValue(this.ds.biddetails.nitgcc.cpgText);
    this.loapoform.get('gcc')['controls'].sd.setValue(this.ds.biddetails.nitgcc.sd);
    this.loapoform.get('gcc')['controls'].sdText.setValue(this.ds.biddetails.nitgcc.sdText);
    this.loapoform.get('gcc')['controls'].ld.setValue(this.ds.biddetails.nitgcc.ld);
    this.loapoform.get('gcc')['controls'].ldText.setValue(this.ds.biddetails.nitgcc.ldText);
    this.loapoform.get('gcc')['controls'].qv.setValue(this.ds.biddetails.nitgcc.qv);
    this.loapoform.get('gcc')['controls'].qvText.setValue(this.ds.biddetails.nitgcc.qvText);
    this.loapoform.get('gcc')['controls'].arbitration.setValue(this.ds.biddetails.nitgcc.arbitration);
    this.loapoform.get('gcc')['controls'].arbitrationText.setValue(this.ds.biddetails.nitgcc.arbitrationText);
    this.loapoform.get('gcc')['controls'].officerincharge.setValue(this.ds.biddetails.nitgcc.officerincharge);
    this.loapoform.get('gcc')['controls'].officerinchargeText.setValue(this.ds.biddetails.nitgcc.officerinchargeText);
  }

  paymentChanged(){
    if(this.loapoform.get('gcc')['controls'].scopeofwork.value) {
      this.loapoform.controls.gcc.get('scopeofworkText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('scopeofworkText').disable();
    }
    if(this.loapoform.get('gcc')['controls'].emd.value) {
      this.loapoform.controls.gcc.get('emdText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('emdText').disable();
    }
    if(this.loapoform.get('gcc')['controls'].paymentterms.value) {
      this.loapoform.controls.gcc.get('paymenttermsText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('paymenttermsText').disable();
    }
    if(this.loapoform.get('gcc')['controls'].contractperiod.value) {
      this.loapoform.controls.gcc.get('contractperiodText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('contractperiodText').disable();
    }
    if(this.loapoform.get('gcc')['controls'].deliveryperiod.value) {
      this.loapoform.controls.gcc.get('delivaryperiodText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('delivaryperiodText').disable();
    }
    if(this.loapoform.get('gcc')['controls'].pricebasis.value) {
      this.loapoform.controls.gcc.get('pricebasisText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('pricebasisText').disable();
    }
    if(this.loapoform.get('gcc')['controls'].taxesandduties.value) {
      this.loapoform.controls.gcc.get('taxesanddutiestext').enable();
    }
    else{
      this.loapoform.controls.gcc.get('taxesanddutiestext').disable();
    }
    if(this.loapoform.get('gcc')['controls'].warranty.value) {
      this.loapoform.controls.gcc.get('warrantyText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('warrantyText').disable();
    }
    if(this.loapoform.get('gcc')['controls'].cpg.value) {
      this.loapoform.controls.gcc.get('cpgText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('cpgText').disable();
    }
    if(this.loapoform.get('gcc')['controls'].sd.value) {
      this.loapoform.controls.gcc.get('sdText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('sdText').disable();
    }
    if(this.loapoform.get('gcc')['controls'].ld.value) {
      this.loapoform.controls.gcc.get('ldText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('ldText').disable();
    }
    if(this.loapoform.get('gcc')['controls'].qv.value) {
      this.loapoform.controls.gcc.get('qvText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('qvText').disable();
    }
    if(this.loapoform.get('gcc')['controls'].arbitration.value) {
      this.loapoform.controls.gcc.get('arbitrationText').enable();
    }
    else{
      this.loapoform.controls.gcc.get('arbitrationText').disable();
    }
    if(this.loapoform.get('gcc')['controls'].officerincharge.value) {
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

  getloapo() {
    this.ds.prepareloapovetting(this.loapoform.value).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
