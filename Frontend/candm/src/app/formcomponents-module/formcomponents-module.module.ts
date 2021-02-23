import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProposaldetailsComponent } from './proposaldetails/proposaldetails.component';
import { EmployeeFieldComponent } from './employee-field/employee-field.component';
import { TenderDetailsComponent } from './tender-details/tender-details.component';
import { AmountDetailsComponent } from './amount-details/amount-details.component';
import { CombineCommitteMembersComponent } from './combine-committe-members/combine-committe-members.component';
import { SqtecdateComponent } from './sqtecdate/sqtecdate.component';
import { SinglevendorComponent } from './singlevendor/singlevendor.component';
import { IndenterDetailsComponent } from './indenter-details/indenter-details.component';
import { LoaDetailsComponent } from './loa-details/loa-details.component';
import { VendorFieldComponent } from './vendor-field/vendor-field.component';
import { GenericAmountComponent } from './generic-amount/generic-amount.component';


@NgModule({
  declarations: [ProposaldetailsComponent,
                EmployeeFieldComponent,
                TenderDetailsComponent,
                AmountDetailsComponent,
                CombineCommitteMembersComponent,
                SqtecdateComponent,
                SinglevendorComponent,
                IndenterDetailsComponent,
                LoaDetailsComponent,
                VendorFieldComponent,
                GenericAmountComponent,
                ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
  ],
  exports: [
    ProposaldetailsComponent,
    TenderDetailsComponent,
    AmountDetailsComponent,
    CombineCommitteMembersComponent,
    SqtecdateComponent,
    SinglevendorComponent,
    IndenterDetailsComponent,
    LoaDetailsComponent,
    GenericAmountComponent,
    VendorFieldComponent
  ]
})
export class FormcomponentsModuleModule { }
