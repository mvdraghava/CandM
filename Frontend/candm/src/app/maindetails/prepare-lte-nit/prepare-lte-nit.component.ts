import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import { CreateTenderService } from '../../create-tender.service';
import { Employee } from '../../employee';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { saveAs } from 'file-saver';

import {DetailsserviceService} from '../detailsservice.service';
@Component({
  selector: 'app-prepare-lte-nit',
  templateUrl: './prepare-lte-nit.component.html',
  styleUrls: ['./prepare-lte-nit.component.css']
})
export class PrepareLteNitComponent implements OnInit {
  candmBodFilteredEmployees: Observable<Employee[]>;
  indentBodFilteredEmployees: Observable<Employee[]>;
  fandaBodFilteredEmployees: Observable<Employee[]>;
  candmTecFilteredEmployees: Observable<Employee[]>;
  indentTecFilteredEmployees: Observable<Employee[]>;
  fandaTecFilteredEmployees: Observable<Employee[]>;
  employees:Employee[] = [];
  indentNo = 0;
  nitForm = this.fb.group({
    indentNo: [this.indentNo],
    candmBodMem: ['',[Validators.required, this.validateEmployee]],
    indentBodMem: ['',[Validators.required, this.validateEmployee]],
    fandaBodMem: ['',[Validators.required, this.validateEmployee]],
    candmTecMem: ['',[Validators.required, this.validateEmployee]],
    indentTecMem: ['',[Validators.required, this.validateEmployee]],
    fandaTecMem: ['',[Validators.required, this.validateEmployee]],
    proposalapprovedDate : ['',Validators.required],
    bodDate: ['',Validators.required],
    specialconditions: [false,Validators.required],
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
  });

  constructor(private cts: CreateTenderService, private fb: FormBuilder,public ds: DetailsserviceService) { }


  paymentChanged(){
    if(this.nitForm.controls.scopeofwork.value) {
      this.nitForm.get('scopeofworkText').enable();
    }
    else{
      this.nitForm.get('scopeofworkText').disable();
    }
    if(this.nitForm.controls.emd.value) {
      this.nitForm.get('emdText').enable();
    }
    else{
      this.nitForm.get('emdText').disable();
    }
    if(this.nitForm.controls.paymentterms.value) {
      this.nitForm.get('paymenttermsText').enable();
    }
    else{
      this.nitForm.get('paymenttermsText').disable();
    }
    if(this.nitForm.controls.contractperiod.value) {
      this.nitForm.get('contractperiodText').enable();
    }
    else{
      this.nitForm.get('contractperiodText').disable();
    }
    if(this.nitForm.controls.deliveryperiod.value) {
      this.nitForm.get('delivaryperiodText').enable();
    }
    else{
      this.nitForm.get('delivaryperiodText').disable();
    }
    if(this.nitForm.controls.pricebasis.value) {
      this.nitForm.get('pricebasisText').enable();
    }
    else{
      this.nitForm.get('pricebasisText').disable();
    }
    if(this.nitForm.controls.validity.value) {
      this.nitForm.get('validityText').enable();
    }
    else{
      this.nitForm.get('validityText').disable();
    }
    if(this.nitForm.controls.taxesandduties.value) {
      this.nitForm.get('taxesanddutiestext').enable();
    }
    else{
      this.nitForm.get('taxesanddutiestext').disable();
    }
    if(this.nitForm.controls.warranty.value) {
      this.nitForm.get('warrantyText').enable();
    }
    else{
      this.nitForm.get('warrantyText').disable();
    }
    if(this.nitForm.controls.cpg.value) {
      this.nitForm.get('cpgText').enable();
    }
    else{
      this.nitForm.get('cpgText').disable();
    }
    if(this.nitForm.controls.sd.value) {
      this.nitForm.get('sdText').enable();
    }
    else{
      this.nitForm.get('sdText').disable();
    }
    if(this.nitForm.controls.ld.value) {
      this.nitForm.get('ldText').enable();
    }
    else{
      this.nitForm.get('ldText').disable();
    }
    if(this.nitForm.controls.qv.value) {
      this.nitForm.get('qvText').enable();
    }
    else{
      this.nitForm.get('qvText').disable();
    }
    if(this.nitForm.controls.arbitration.value) {
      this.nitForm.get('arbitrationText').enable();
    }
    else{
      this.nitForm.get('arbitrationText').disable();
    }
    if(this.nitForm.controls.officerincharge.value) {
      this.nitForm.get('officerinchargeText').enable();
    }
    else{
      this.nitForm.get('officerinchargeText').disable();
    }
  }

  filter_for_employees() {
    this.candmBodFilteredEmployees = this.nitForm.controls.candmBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.indentBodFilteredEmployees = this.nitForm.controls.indentBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.fandaBodFilteredEmployees = this.nitForm.controls.fandaBodMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.candmTecFilteredEmployees = this.nitForm.controls.candmTecMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.indentTecFilteredEmployees = this.nitForm.controls.indentTecMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
    this.fandaTecFilteredEmployees = this.nitForm.controls.fandaTecMem.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEmployees(name) : this.employees.slice())
    );
  }

  setconditions() {
    let scopecond = "The scope of work includes " + this.ds.biddetails.TenderSubject + ", as per BOQ in Annexure-II and as per terms & conditions of the contract ";
    this.nitForm.controls.scopeofworkText.setValue(scopecond);
    let paymentcond = "Payment shall be made after completion of supply, Installation & acceptance by Engineer-in-charge";
    this.nitForm.controls.paymenttermsText.setValue(paymentcond);
    let pricebasiscond = "The Prices quoted shall be on FIRM Basis throughout the contract period.";
    this.nitForm.controls.pricebasisText.setValue(pricebasiscond);
    let validitycond = "The prices quoted shall be firm and remain valid for a period of 90 (ninety) days from the date of opening of Tender.  Tender received with validity of less than 90 (ninety) days are liable to be rejected";
    this.nitForm.controls.validityText.setValue(validitycond);
    let taxcond = "GST as applicable shall be paid as per the direction of appropriate State / Central Government. Deductions shall be made at source for Income tax /statutory duties as per rules & regulations in vogue";
    this.nitForm.controls.taxesanddutiestext.setValue(taxcond);
    let cpgcond = "The successful bidder on receipt of LOA have to submit Contract Performance Guarantee (CPG) in the form of Bank Guarantee from any Nationalized Bank for 10% of order value valid till AMC Contract period plus three months or on request of contractor Security deposit of 10% of amount shall be deducted from the Quarterly running bill as per POWER SYSTEM OPERATION CORPORATION LIMITED General conditions of contract and the amount deducted as security deposit will be released after three months after completion of Contract period and on certification of Engineer-in-charge. Income tax and other statutory levies if any shall be deducted as applicable";
    this.nitForm.controls.cpgText.setValue(cpgcond);
    let qvcond = "During the execution of the contract, the Owner reserves the right to increase or   decrease the quantities of items under the contract but without any change in unit price or other terms and conditions.  Such variation shall not be subjected to any limitations for the individual items but the total variation in all such items under the contract shall be limited to +/- 20 % of the Total Contract Price.";
    let arbitrationcond = "In case of any dispute, the matter shall be referred to the Head of the Region   SRLDC, POSOCO, Bangalore whose decision shall be final and binding on both the parties. The Courts situated in Bangalore have exclusive jurisdiction to entertain and try all matters arising out of this contract";
    let ldcond = "If the Contractor fails to perform the work within the specified period given in the Letter of Award or any extension thereof, with respect to successful completion of supplies, the Contractor shall pay to the Owner as Liquidated Damages and not a penalty, a sum of half percent [0.5%] of the contract price for the delayed portion for each calendar week of delay or part thereof in completion of works and handing over to the Owner. However, the amount of Liquidated Damages for the contract shall be limited to a maximum of Five Percent [5%] of the Total Contract Price.";
    let sdcond = "Security deposit of 10% of the bill amount shall be deducted from the bill as per POWER SYSTEM OPERATION CORPORATION LIMITED General conditions of contract and the amount deducted as security deposit will be released after completion of the Warranty Period and on certification by Engineer-in-charge";
    this.nitForm.controls.arbitrationText.setValue(arbitrationcond);
    this.nitForm.controls.qvText.setValue(qvcond);
    this.nitForm.controls.ldText.setValue(ldcond);
    this.nitForm.controls.sdText.setValue(sdcond);
    if(this.ds.biddetails && !this.ds.biddetails.emdwaivedoff){
      let emdcond = "Rs." + this.ds.biddetails.emd.toString() + "/- (Rupees " + this.ds.biddetails.emdwords + " Only). The original payment instruments like Demand Draft, Banker Cheque, Bank Guarantee etc. has to be sent along with the quote sheet before the Bid Opening Date and Time. \nEMD can be paid through NEFT and details are  Bank A/c No.6576187807 IFS Code IDIB000M010 ";
      emdcond = emdcond + "\nMicro and Small Enterprises (MSEs) registered with National Small Industries Corporation (NSIC) or with any other designated Authority of GOI under the Public Procurement Policy for MSEs are exempted from submission of EMD and tender Fee as per the Provisions of the Public Procurement Policy for Micro and Small Enterprises (MSEs) order 2012. This shall be subject to production of documentary evidence with regard to registration with authorities mentioned above."
      this.nitForm.controls.emd.setValue(true);
      this.nitForm.controls.emdText.setValue(emdcond)
    }
  }

  ngOnInit() {
    this.cts.getemployees().subscribe(
      data => {
        this.employees = data;
        this.filter_for_employees();
      }
    );
    this.setconditions();
    this.indentNo = this.ds.biddetails.Indentno;
    this.nitForm.controls.indentNo.setValue(this.indentNo);
  }

  private _filterEmployees(value: string): Employee[] {
    const filterValue = value.toLowerCase();

    return this.employees.filter(emp => emp.name.toLowerCase().includes(filterValue));
  }

  displayFn(emp?: Employee): String | undefined {
    return emp ? emp.name : undefined;
  }

  validateEmployee(c: FormControl) {
    return c.value.id ? null : {
      validateEmployee: {
        valid: false
      }
    };
  }

  getLTENIT() {
    if(this.nitForm.valid){
      this.ds.getltemNIT(this.nitForm.value).subscribe(
        data => {
          saveAs(data, 'I_'+this.indentNo.toString()+'_NIT.docx' );
        },
        error => {
            window.alert('Some Error has occured');
        }
      );
    }
    else{
      console.log(this.nitForm.value);
      console.log(this.ds.biddetails);
    }
  }

}
