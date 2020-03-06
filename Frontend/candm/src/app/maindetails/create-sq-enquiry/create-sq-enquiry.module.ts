import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateSqEnquiryRoutingModule } from './create-sq-enquiry-routing.module';
import { CreateSqEnquiryComponent } from './create-sq-enquiry.component';
import { MaterialModule } from './../../material.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [CreateSqEnquiryComponent],
  imports: [
    CommonModule,
    CreateSqEnquiryRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
  ]
})
export class CreateSqEnquiryModule { }
