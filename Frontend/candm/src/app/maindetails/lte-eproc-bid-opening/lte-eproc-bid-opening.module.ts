import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LteEprocBidOpeningRoutingModule } from './lte-eproc-bid-opening-routing.module';
import { LteEprocBidOpeningComponent } from './lte-eproc-bid-opening.component';

import { MaterialModule } from './../../material.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [LteEprocBidOpeningComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    LteEprocBidOpeningRoutingModule
  ]
})
export class LteEprocBidOpeningModule { }
